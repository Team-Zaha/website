"use client";

import { useEffect, useRef } from "react";

/**
 * Hook de monitoring des performances au scroll.
 *
 * Désactivé par défaut : il maintient un requestAnimationFrame permanent, ce
 * qui empêche le navigateur de passer en veille et fait chauffer la machine
 * pendant le développement. Pour l'activer le temps d'une mesure, poser
 * `NEXT_PUBLIC_PERF_MONITOR=1` dans .env.local puis relancer le serveur.
 *
 * Ouvrir la console pour voir les logs.
 *
 * Mesure :
 * - FPS moyen et drops en dessous de 30fps
 * - Durée des Long Tasks (>50ms)
 * - Nombre de repaints/reflows (layout shifts)
 * - Temps passé dans les scroll handlers
 * - Coût des backdrop-filter et animations actives
 */
export function useScrollPerfMonitor() {
  const isActive = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (process.env.NEXT_PUBLIC_PERF_MONITOR !== "1") return;
    if (isActive.current) return;
    isActive.current = true;

    console.log(
      "%c[PERF MONITOR] 🔍 Scroll performance monitoring activé",
      "color: #E87A3A; font-weight: bold; font-size: 14px"
    );

    // ─── 1. FPS Monitor ───
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let minFps = Infinity;
    let fpsDrops: { fps: number; time: number }[] = [];
    let rafId: number;

    function measureFps(now: number) {
      frameCount++;
      const delta = now - lastFpsTime;
      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta);
        if (fps < minFps) minFps = fps;
        if (fps < 30) {
          fpsDrops.push({ fps, time: now });
          console.warn(
            `%c[PERF] ⚠️ FPS DROP: ${fps} fps`,
            "color: #ff4444; font-weight: bold"
          );
        } else if (fps < 50) {
          console.log(
            `%c[PERF] FPS: ${fps}`,
            "color: #ffaa00; font-weight: bold"
          );
        }
        frameCount = 0;
        lastFpsTime = now;
      }
      rafId = requestAnimationFrame(measureFps);
    }
    rafId = requestAnimationFrame(measureFps);

    // ─── 2. Long Tasks Observer ───
    let longTasks: { duration: number; name: string }[] = [];
    let longTaskObserver: PerformanceObserver | null = null;

    if (typeof PerformanceObserver !== "undefined") {
      try {
        longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            longTasks.push({
              duration: entry.duration,
              name: entry.name,
            });
            if (entry.duration > 100) {
              console.warn(
                `%c[PERF] 🐌 Long Task: ${entry.duration.toFixed(1)}ms`,
                "color: #ff4444; font-weight: bold"
              );
            } else {
              console.log(
                `%c[PERF] Long Task: ${entry.duration.toFixed(1)}ms`,
                "color: #ffaa00"
              );
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });
      } catch {
        console.log("[PERF] PerformanceObserver longtask non supporté");
      }
    }

    // ─── 3. Layout Shift Monitor ───
    let totalCLS = 0;
    let clsObserver: PerformanceObserver | null = null;

    if (typeof PerformanceObserver !== "undefined") {
      try {
        clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShift = entry as PerformanceEntry & {
              hadRecentInput: boolean;
              value: number;
            };
            if (!layoutShift.hadRecentInput) {
              totalCLS += layoutShift.value;
              if (layoutShift.value > 0.01) {
                console.warn(
                  `%c[PERF] 📐 Layout Shift: ${layoutShift.value.toFixed(4)}`,
                  "color: #ff8800"
                );
              }
            }
          }
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch {
        // pas supporté
      }
    }

    // ─── 4. Scroll Handler Timing ───
    let scrollCallCount = 0;
    let scrollTotalTime = 0;
    let scrollMaxTime = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    function onScroll() {
      const start = performance.now();
      scrollCallCount++;

      if (!isScrolling) {
        isScrolling = true;
        console.log(
          "%c[PERF] 📜 Scroll start",
          "color: #4488ff"
        );
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        console.log(
          `%c[PERF] 📜 Scroll end — ${scrollCallCount} events, avg: ${(scrollTotalTime / scrollCallCount).toFixed(2)}ms, max: ${scrollMaxTime.toFixed(2)}ms`,
          "color: #4488ff; font-weight: bold"
        );
        scrollCallCount = 0;
        scrollTotalTime = 0;
        scrollMaxTime = 0;
      }, 200);

      // Mesurer le temps après le handler natif
      requestAnimationFrame(() => {
        const elapsed = performance.now() - start;
        scrollTotalTime += elapsed;
        if (elapsed > scrollMaxTime) scrollMaxTime = elapsed;
        if (elapsed > 16) {
          console.warn(
            `%c[PERF] 📜 Scroll frame lent: ${elapsed.toFixed(1)}ms (budget: 16ms)`,
            "color: #ff4444"
          );
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // ─── 5. Audit DOM au démarrage ───
    setTimeout(() => {
      auditDOM();
      auditAnimations();
    }, 2000);

    function auditDOM() {
      console.group(
        "%c[PERF] 🏗️ Audit DOM",
        "color: #E87A3A; font-weight: bold"
      );

      // Compter les éléments total
      const allElements = document.querySelectorAll("*");
      console.log(`Total éléments DOM: ${allElements.length}`);

      // Backdrop filters
      const backdropElements: Element[] = [];
      allElements.forEach((el) => {
        const style = getComputedStyle(el);
        if (
          style.backdropFilter !== "none" &&
          style.backdropFilter !== ""
        ) {
          backdropElements.push(el);
        }
      });
      if (backdropElements.length > 0) {
        console.warn(
          `%c⚠️ ${backdropElements.length} éléments avec backdrop-filter (très coûteux sur Safari):`,
          "color: #ff4444; font-weight: bold"
        );
        backdropElements.forEach((el) => {
          const style = getComputedStyle(el);
          console.log(
            "  →",
            el.tagName,
            (el.getAttribute("class") ?? "").slice(0, 80),
            `| backdrop-filter: ${style.backdropFilter}`
          );
        });
      }

      // Position fixed/sticky (repaints au scroll)
      const fixedElements: Element[] = [];
      allElements.forEach((el) => {
        const pos = getComputedStyle(el).position;
        if (pos === "fixed" || pos === "sticky") {
          fixedElements.push(el);
        }
      });
      console.log(
        `Éléments fixed/sticky (repaint au scroll): ${fixedElements.length}`
      );
      fixedElements.forEach((el) => {
        const style = getComputedStyle(el);
        console.log(
          "  →",
          el.tagName,
          (el.getAttribute("class") ?? "").slice(0, 80),
          `| position: ${style.position}`
        );
      });

      // will-change
      const willChangeElements: Element[] = [];
      allElements.forEach((el) => {
        const wc = getComputedStyle(el).willChange;
        if (wc !== "auto" && wc !== "") {
          willChangeElements.push(el);
        }
      });
      if (willChangeElements.length > 0) {
        console.log(
          `Éléments avec will-change (couches GPU): ${willChangeElements.length}`
        );
        willChangeElements.forEach((el) => {
          console.log(
            "  →",
            el.tagName,
            (el.getAttribute("class") ?? "").slice(0, 80),
            `| will-change: ${getComputedStyle(el).willChange}`
          );
        });
      }

      // preserve-3d
      const preserve3dElements: Element[] = [];
      allElements.forEach((el) => {
        if (getComputedStyle(el).transformStyle === "preserve-3d") {
          preserve3dElements.push(el);
        }
      });
      if (preserve3dElements.length > 0) {
        console.warn(
          `%c⚠️ ${preserve3dElements.length} éléments avec preserve-3d (couches GPU coûteuses):`,
          "color: #ff8800"
        );
      }

      console.groupEnd();
    }

    function auditAnimations() {
      console.group(
        "%c[PERF] 🎬 Audit Animations",
        "color: #E87A3A; font-weight: bold"
      );

      const allElements = document.querySelectorAll("*");
      let cssAnimCount = 0;
      let infiniteAnimCount = 0;
      const animatedElements: {
        el: Element;
        name: string;
        duration: string;
        infinite: boolean;
      }[] = [];

      allElements.forEach((el) => {
        const style = getComputedStyle(el);
        if (style.animationName && style.animationName !== "none") {
          cssAnimCount++;
          const infinite =
            style.animationIterationCount === "infinite";
          if (infinite) infiniteAnimCount++;
          animatedElements.push({
            el,
            name: style.animationName,
            duration: style.animationDuration,
            infinite,
          });
        }
      });

      console.log(`Animations CSS actives: ${cssAnimCount}`);
      if (infiniteAnimCount > 0) {
        console.warn(
          `%c⚠️ ${infiniteAnimCount} animations infinies (consomment GPU en permanence):`,
          "color: #ff4444; font-weight: bold"
        );
      }
      animatedElements.forEach(({ el, name, duration, infinite }) => {
        const prefix = infinite ? "♾️ " : "  ";
        console.log(
          `${prefix}→`,
          el.tagName,
          (el.getAttribute("class") ?? "").slice(0, 60),
          `| ${name} (${duration})${infinite ? " INFINITE" : ""}`
        );
      });

      // Web Animations API
      let wapiCount = 0;
      allElements.forEach((el) => {
        const anims = el.getAnimations?.();
        if (anims && anims.length > 0) {
          wapiCount += anims.length;
        }
      });
      console.log(
        `Animations Web API / Framer Motion actives: ${wapiCount}`
      );

      // Framer motion elements (data-framer-*)
      const framerElements = document.querySelectorAll(
        "[style*='transform'], [style*='opacity']"
      );
      console.log(
        `Éléments avec inline transform/opacity (Framer Motion): ${framerElements.length}`
      );

      console.groupEnd();
    }

    // ─── 6. Rapport périodique ───
    const reportInterval = setInterval(() => {
      if (fpsDrops.length > 0 || longTasks.length > 0) {
        console.group(
          "%c[PERF] 📊 Rapport (30s)",
          "color: #E87A3A; font-weight: bold; font-size: 12px"
        );
        console.log(`FPS min: ${minFps === Infinity ? "N/A" : minFps}`);
        console.log(`Drops < 30fps: ${fpsDrops.length}`);
        console.log(`Long Tasks: ${longTasks.length}`);
        if (longTasks.length > 0) {
          const avgLongTask =
            longTasks.reduce((s, t) => s + t.duration, 0) /
            longTasks.length;
          console.log(`  Durée moyenne: ${avgLongTask.toFixed(1)}ms`);
          console.log(
            `  Durée max: ${Math.max(...longTasks.map((t) => t.duration)).toFixed(1)}ms`
          );
        }
        console.log(`CLS cumulé: ${totalCLS.toFixed(4)}`);
        console.groupEnd();

        // Reset
        fpsDrops = [];
        longTasks = [];
        minFps = Infinity;
      }
    }, 30000);

    // ─── 7. Lenis RAF Monitor ───
    const origRAF = window.requestAnimationFrame;
    let rafCallCount = 0;
    let lastRafReport = performance.now();

    window.requestAnimationFrame = function (cb: FrameRequestCallback) {
      rafCallCount++;
      const now = performance.now();
      if (now - lastRafReport > 5000) {
        console.log(
          `%c[PERF] 🔄 requestAnimationFrame calls (5s): ${rafCallCount} (${(rafCallCount / 5).toFixed(0)}/s)`,
          "color: #8888ff"
        );
        rafCallCount = 0;
        lastRafReport = now;
      }
      return origRAF.call(window, cb);
    };

    // ─── Cleanup ───
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      longTaskObserver?.disconnect();
      clsObserver?.disconnect();
      clearInterval(reportInterval);
      clearTimeout(scrollTimeout);
      window.requestAnimationFrame = origRAF;
      isActive.current = false;
    };
  }, []);
}

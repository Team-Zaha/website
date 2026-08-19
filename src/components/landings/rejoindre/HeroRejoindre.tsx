"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticButton } from "@/components/shared/MagneticButton";

/* ─── Backdrop : globe filaire incliné, frontières qui le débordent ─── */

const R = 420;

/* ─── Icosphère : icosaèdre subdivisé une fois, 80 facettes ─── */

type V3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;

function unit([x, y, z]: V3): V3 {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
}

const ICO_VERTS: V3[] = (
  [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ] as V3[]
).map(unit);

const ICO_FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

/** Une passe de subdivision : chaque triangle donne quatre facettes. */
function subdivide(verts: V3[], faces: [number, number, number][]) {
  const out: [number, number, number][] = [];
  const cache = new Map<string, number>();

  const midpoint = (a: number, b: number) => {
    const key = a < b ? `${a}_${b}` : `${b}_${a}`;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;
    const [ax, ay, az] = verts[a];
    const [bx, by, bz] = verts[b];
    verts.push(unit([(ax + bx) / 2, (ay + by) / 2, (az + bz) / 2]));
    const i = verts.length - 1;
    cache.set(key, i);
    return i;
  };

  for (const [a, b, c] of faces) {
    const ab = midpoint(a, b);
    const bc = midpoint(b, c);
    const ca = midpoint(c, a);
    out.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  }
  return out;
}

/* ─── Quaternions : l'orientation du device, sans blocage de cardan ─── */

/** (x, y, z, w). */
type Quat = [number, number, number, number];

const QUAT_ID: Quat = [0, 0, 0, 1];

function qMul(a: Quat, b: Quat): Quat {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return [
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ];
}

const qConj = ([x, y, z, w]: Quat): Quat => [-x, -y, -z, w];

/** Rotation d'un vecteur : v + 2w(q×v) + 2q×(q×v). */
function qApply([x, y, z, w]: Quat, [vx, vy, vz]: V3): V3 {
  const tx = 2 * (y * vz - z * vy);
  const ty = 2 * (z * vx - x * vz);
  const tz = 2 * (x * vy - y * vx);
  return [
    vx + w * tx + y * tz - z * ty,
    vy + w * ty + z * tx - x * tz,
    vz + w * tz + x * ty - y * tx,
  ];
}

/**
 * Orientation : rotation propre autour de l'axe, inclinaison de l'axe, puis
 * la pose du device. Les deux premières donnent la silhouette de repos, la
 * troisième est le tour que la caméra a fait autour de la sphère.
 */
function orient([x, y, z]: V3, spin: number, view: Quat | null): V3 {
  const yaw = 0.38 + spin;
  const pitch = -0.46;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const posed: V3 = [x1, y * cp - z1 * sp, y * sp + z1 * cp];
  return view ? qApply(view, posed) : posed;
}

const LIGHT: V3 = unit([-0.45, -0.72, 0.55]);

/** Sommets et facettes, calculés une seule fois. */
const MESH = (() => {
  const verts = ICO_VERTS.map((v) => [...v] as V3);
  const faces = subdivide(verts, ICO_FACES);
  return { verts, faces };
})();

/** Un tour de rotation complet du hero, en radians. */
const SPIN = Math.PI * 0.55;

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Les facettes sont opaques : c'est la teinte, et non l'alpha, qui rend la
 * lumière. Vert adouci côté ombre pour compenser l'absence de transparence.
 */
const FACET_LIT: V3 = [250, 250, 245];
const FACET_SHADE: V3 = [147, 170, 152];

function facetColor(light: number) {
  const t = 1 - light;
  const c = FACET_LIT.map((v, i) => Math.round(v + (FACET_SHADE[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/**
 * Enveloppe convexe des sommets projetés : la silhouette exacte de la sphère,
 * qu'on remplit d'un aplat opaque pour qu'elle masque ce qui passe derrière.
 */
function hullPath(points: [number, number][]) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (
    o: [number, number],
    a: [number, number],
    b: [number, number]
  ) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

  const build = (source: [number, number][]) => {
    const chain: [number, number][] = [];
    for (const pt of source) {
      while (
        chain.length >= 2 &&
        cross(chain[chain.length - 2], chain[chain.length - 1], pt) <= 0
      ) {
        chain.pop();
      }
      chain.push(pt);
    }
    chain.pop();
    return chain;
  };

  const hull = [...build(pts), ...build([...pts].reverse())];

  // Légère dilatation : évite un liseré clair entre la silhouette et les facettes.
  return (
    hull
      .map(([x, y], i) => `${i ? "L" : "M"} ${r1(x * 1.006)} ${r1(y * 1.006)}`)
      .join(" ") + " Z"
  );
}

/**
 * Géométrie projetée pour une rotation donnée. Les facettes tournées vers
 * l'arrière sont conservées mais transparentes : le nombre de nœuds SVG reste
 * constant, on ne fait que réécrire des attributs au scroll.
 */
function frameAt(spin: number, view: Quat | null = null) {
  const placed = MESH.verts.map((v) => orient(v, spin, view));

  const faces = MESH.faces.map(([a, b, c]) => {
    const p = [placed[a], placed[b], placed[c]];
    const normal = unit([
      (p[0][0] + p[1][0] + p[2][0]) / 3,
      (p[0][1] + p[1][1] + p[2][1]) / 3,
      (p[0][2] + p[1][2] + p[2][2]) / 3,
    ]);
    const d =
      p
        .map(([x, y], i) => `${i ? "L" : "M"} ${r1(x * R)} ${r1(y * R)}`)
        .join(" ") + " Z";

    if (normal[2] <= 0) return { d, color: "none" };

    // Beaucoup de nuances : sans arêtes, ce sont les écarts de teinte qui
    // dessinent les facettes.
    const raw =
      normal[0] * LIGHT[0] + normal[1] * LIGHT[1] + normal[2] * LIGHT[2];
    const light = Math.round(Math.max(0, raw) * 40) / 40;
    return { d, color: facetColor(light) };
  });

  return { faces, silhouette: hullPath(placed.map(([x, y]) => [x * R, y * R])) };
}

/** État initial : identique au rendu serveur, donc pas de saut à l'hydratation. */
const REST_FRAME = frameAt(0);

/** Mobile et tablette : la sphère se manipule au doigt ou au gyroscope. */
const HANDHELD_QUERY = "(max-width: 1023px)";

const DEG = Math.PI / 180;

/** Redresse la caméra : elle regarde par le dos de l'appareil, pas par le haut. */
const Q_SCREEN: Quat = [-Math.SQRT1_2, 0, 0, Math.SQRT1_2];

/**
 * Pose absolue de l'appareil, telle que la spécifie le W3C : `alpha`, `beta` et
 * `gamma` sont des angles de Tait-Bryan intrinsèques Z-X'-Y''. Passer par un
 * quaternion — la méthode de `DeviceOrientationControls` — évite le blocage de
 * cardan des axes lus séparément et laisse la pose parcourir la sphère entière.
 */
function deviceQuat(alpha: number, beta: number, gamma: number, screen: number): Quat {
  // Euler YXZ = (beta, alpha, -gamma), développé en quaternion.
  const x = beta * DEG;
  const y = alpha * DEG;
  const z = -gamma * DEG;
  const c1 = Math.cos(x / 2);
  const s1 = Math.sin(x / 2);
  const c2 = Math.cos(y / 2);
  const s2 = Math.sin(y / 2);
  const c3 = Math.cos(z / 2);
  const s3 = Math.sin(z / 2);

  const q: Quat = [
    s1 * c2 * c3 + c1 * s2 * s3,
    c1 * s2 * c3 - s1 * c2 * s3,
    c1 * c2 * s3 - s1 * s2 * c3,
    c1 * c2 * c3 + s1 * s2 * s3,
  ];

  // Puis l'orientation de l'écran : paysage ou portrait retourné.
  const half = (-screen * DEG) / 2;
  return qMul(qMul(q, Q_SCREEN), [0, 0, Math.sin(half), Math.cos(half)]);
}

/** Angle de l'écran, en degrés. `window.orientation` couvre les vieux iOS. */
function screenAngle() {
  if (typeof screen !== "undefined" && screen.orientation) {
    return screen.orientation.angle;
  }
  return (window as Window & { orientation?: number }).orientation ?? 0;
}

/**
 * iOS n'expose l'orientation qu'après autorisation explicite, demandable
 * uniquement depuis un geste utilisateur et en contexte sécurisé (HTTPS).
 * Android n'impose rien : `requestPermission` y est absent.
 */
type OrientationPermission = {
  requestPermission?: () => Promise<PermissionState | "granted" | "denied">;
};

type GyroState = "idle" | "granted" | "denied" | "unavailable";

const LABELS: Record<GyroState, string> = {
  idle: "Faire tourner la sphère avec le gyroscope",
  granted: "Gyroscope actif",
  denied: "Gyroscope refusé",
  unavailable: "Gyroscope indisponible",
};

/** Affiché sous le bouton quand le capteur ne peut pas être utilisé. */
const HINTS: Record<GyroState, string> = {
  idle: "",
  granted: "",
  denied: "Accès au mouvement refusé. À réactiver dans Réglages, Safari.",
  unavailable: "Le gyroscope demande une connexion sécurisée (https).",
};

function GyroToggle({
  state,
  onEnable,
}: {
  state: GyroState;
  onEnable: () => void;
}) {
  const active = state === "granted";
  const blocked = state === "denied" || state === "unavailable";

  return (
    <button
      type="button"
      onClick={onEnable}
      disabled={active || blocked}
      aria-pressed={active}
      aria-label={LABELS[state]}
      title={LABELS[state]}
      className={`flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border transition-colors ${
        active
          ? "border-zaha-green bg-zaha-green text-white"
          : "border-zaha-green/30 text-zaha-green active:bg-zaha-green/10"
      } ${blocked ? "opacity-40" : ""}`}
    >
      {/* Sphère inclinée sur son axe : l'objet qu'on met en rotation */}
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <circle cx="12" cy="12" r="8.5" />
        <ellipse cx="12" cy="12" rx="3.2" ry="8.5" transform="rotate(-20 12 12)" />
        <ellipse cx="12" cy="12" rx="8.5" ry="3.2" transform="rotate(-20 12 12)" />
      </svg>
    </button>
  );
}

/**
 * Fraction de la largeur d'écran à parcourir pour un tour complet. Le geste
 * n'est lu qu'en horizontal, donc il n'entre jamais en conflit avec le scroll.
 */
const DRAG_SPAN = 0.9;

/** Un ressort donne son inertie au scroll et au glissement du doigt. */
const SPRING = {
  stiffness: 55,
  damping: 22,
  mass: 0.7,
  restDelta: 0.0005,
} as const;

/**
 * Lissage du capteur, par frame. Le gyroscope est bruité et échantillonne par
 * paliers : la pose rendue rattrape la pose mesurée au lieu de la copier.
 */
const GYRO_EASE = 0.18;

/** En deçà, la pose lissée est arrivée : inutile de redessiner. */
const GYRO_REST = 1e-4;

/** Interpolation d'une pose vers une autre, par le plus court des deux chemins. */
function nlerp(from: Quat, to: Quat, t: number): Quat {
  const dot =
    from[0] * to[0] + from[1] * to[1] + from[2] * to[2] + from[3] * to[3];
  // q et -q décrivent la même pose : le signe évite de partir par le grand tour.
  const dir = dot < 0 ? -1 : 1;
  const [x, y, z, w] = from.map((v, i) => v + (to[i] * dir - v) * t) as Quat;
  const l = Math.hypot(x, y, z, w) || 1;
  return [x / l, y / l, z / l, w / l];
}

function Sphere({
  progress,
  gyro,
}: {
  progress: MotionValue<number>;
  gyro: boolean;
}) {
  const groupRef = useRef<SVGGElement>(null);
  const silhouetteRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();
  const handheld = useMediaQuery(HANDHELD_QUERY);

  // Scroll et glissement du doigt : un seul axe, amorti par un ressort.
  const target = useMotionValue(0);
  const spin = useSpring(target, SPRING);

  // Gyroscope : une pose complète, qui ne se réduit pas à un scalaire et vit
  // donc hors du ressort. `goal` est ce que mesure le capteur, `view` ce qui
  // est effectivement rendu, à un lissage près.
  const goal = useRef<Quat | null>(null);
  const view = useRef<Quat | null>(null);

  useEffect(() => {
    if (reduced) return;

    if (!handheld) {
      target.set(progress.get());
      return progress.on("change", (v) => target.set(v));
    }

    // Gyroscope autorisé : la pose entière de l'appareil pilote la sphère, donc
    // les trois axes du capteur, sans plage ni butée. Faire un tour sur soi-même
    // fait bien le tour de la sphère.
    if (gyro) {
      // La première lecture fixe le neutre : la façon de tenir l'appareil ne
      // doit pas décaler la sphère à l'instant où le capteur prend la main.
      let rest: Quat | null = null;

      const onOrient = (event: DeviceOrientationEvent) => {
        const { alpha, beta, gamma } = event;
        if (alpha === null || beta === null || gamma === null) return;

        const pose = deviceQuat(alpha, beta, gamma, screenAngle());
        rest ??= pose;

        // L'écart depuis le neutre, puis son inverse : la sphère reste immobile
        // et c'est la caméra qui l'orbite. L'axe y est retourné au passage, le
        // capteur le comptant vers le haut et le SVG vers le bas.
        const [x, y, z, w] = qConj(qMul(qConj(rest), pose));
        goal.current = [-x, y, -z, w];
      };

      window.addEventListener("deviceorientation", onOrient);
      return () => {
        window.removeEventListener("deviceorientation", onOrient);
        goal.current = null;
        view.current = null;
      };
    }

    // Sinon, le glissement horizontal fait tourner la sphère. Aucun preventDefault :
    // un geste vertical continue de scroller la page normalement.
    let startX = 0;
    let base = 0;
    let dragging = false;

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      dragging = true;
      startX = event.touches[0].clientX;
      base = target.get();
    };

    const onMove = (event: TouchEvent) => {
      if (!dragging || event.touches.length !== 1) return;
      const span = window.innerWidth * DRAG_SPAN;
      target.set(base + ((event.touches[0].clientX - startX) / span) * 2);
    };

    const onEnd = () => {
      dragging = false;
    };

    const opts = { passive: true } as const;
    window.addEventListener("touchstart", onStart, opts);
    window.addEventListener("touchmove", onMove, opts);
    window.addEventListener("touchend", onEnd, opts);
    window.addEventListener("touchcancel", onEnd, opts);

    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [gyro, handheld, progress, reduced, target]);

  useEffect(() => {
    if (reduced) return;
    const group = groupRef.current;
    if (!group) return;
    const paths = Array.from(group.children) as SVGPathElement[];

    const draw = () => {
      const { faces, silhouette } = frameAt(spin.get() * SPIN, view.current);
      silhouetteRef.current?.setAttribute("d", silhouette);
      for (let i = 0; i < paths.length; i++) {
        paths[i].setAttribute("d", faces[i].d);
        paths[i].setAttribute("fill", faces[i].color);
      }
    };

    // Sans gyroscope, la seule source est le ressort : on suit ses changements.
    if (!gyro) {
      draw();
      return spin.on("change", draw);
    }

    // Avec le gyroscope, la pose rendue rattrape la pose mesurée frame par
    // frame. Rien n'est redessiné tant qu'elle ne bouge pas : appareil posé,
    // la boucle ne coûte qu'une comparaison.
    let frame = requestAnimationFrame(function step() {
      frame = requestAnimationFrame(step);
      if (!goal.current) return;

      const from = view.current ?? QUAT_ID;
      const next = nlerp(from, goal.current, GYRO_EASE);
      const moved =
        Math.abs(next[0] - from[0]) +
        Math.abs(next[1] - from[1]) +
        Math.abs(next[2] - from[2]) +
        Math.abs(next[3] - from[3]);

      if (moved < GYRO_REST) return;
      view.current = next;
      draw();
    });

    draw();
    return () => cancelAnimationFrame(frame);
  }, [spin, reduced, gyro]);

  return (
    <svg viewBox="-500 -500 1000 1000" className="h-full w-full" aria-hidden>
      <defs>
        {/* Reprend le lavis du fond : la silhouette masque sans se détacher */}
        <linearGradient id="zaha-sphere-body" x1="0" y1="0" x2="0.18" y2="1">
          <stop offset="0%" stopColor="#FBFAF7" />
          <stop offset="48%" stopColor="#F6F5EF" />
          <stop offset="100%" stopColor="#E9F0E8" />
        </linearGradient>
      </defs>

      {/* Silhouette opaque : ce qui passe derrière la sphère est occulté */}
      <path
        ref={silhouetteRef}
        d={REST_FRAME.silhouette}
        fill="url(#zaha-sphere-body)"
      />

      {/* Facettes : remplissage modulé par la lumière, aucune arête */}
      <g ref={groupRef} stroke="none">
        {REST_FRAME.faces.map(({ d, color }, i) => (
          <path key={i} d={d} fill={color} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Trois tracés de frontière. Celui du milieu passe derrière la sphère, qui
 * l'occulte : c'est ce croisement qui donne sa profondeur à la scène.
 */
const BORDER_BEHIND = [
  "M -60 468 C 150 514, 268 418, 420 454 S 662 566, 812 500 S 1088 418, 1260 476",
];

const BORDER_FRONT = [
  "M -60 268 C 180 218, 300 322, 452 296 S 706 190, 862 252 S 1120 292, 1260 244",
  "M -60 680 C 210 642, 356 706, 540 668 S 830 568, 1004 610 S 1190 648, 1260 624",
];

function Borders({ paths, reverse }: { paths: string[]; reverse?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <g
        fill="none"
        stroke="var(--zaha-orange)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 11"
        vectorEffect="non-scaling-stroke"
        opacity="0.85"
        className={reverse ? "border-drift-reverse" : "border-drift"}
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

function HeroBackdrop({
  progress,
  gyro,
}: {
  progress: MotionValue<number>;
  gyro: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Lavis de base, asymétrique */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(85% 60% at 8% -5%, rgba(245,230,211,0.9) 0%, transparent 60%)",
            "radial-gradient(70% 65% at 100% 100%, rgba(45,90,61,0.16) 0%, transparent 62%)",
            "linear-gradient(168deg, #FBFAF7 0%, #F6F5EF 48%, #E9F0E8 100%)",
          ].join(", "),
        }}
      />

      {/* Frontière du milieu : sous la sphère */}
      <div className="hero-dissolve border-layer absolute inset-0">
        <Borders paths={BORDER_BEHIND} reverse />
      </div>

      {/* Globe */}
      <div
        className="absolute top-1/2 left-1/2 aspect-square w-[212vw] -translate-x-1/2 -translate-y-1/2 md:w-[min(118vh,132vw)]"
      >
        <Sphere progress={progress} gyro={gyro} />
      </div>

      {/* Frontières devant la sphère */}
      <div className="hero-dissolve border-layer absolute inset-0">
        <Borders paths={BORDER_FRONT} />
      </div>

      {/* Clairière : le titre respire */}
      <div className="hero-clearing absolute inset-0" />

      {/* Ancrage bas */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#E4ECE3]/60 to-transparent" />
    </div>
  );
}

export function HeroRejoindre() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handheld = useMediaQuery(HANDHELD_QUERY);
  const [gyro, setGyro] = useState<GyroState>("idle");
  const [onscreen, setOnscreen] = useState(true);

  // Le hero occupe un écran sur une page longue : inutile de laisser tourner
  // la dérive des frontières pendant tout le reste du défilement.
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnscreen(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const enableGyro = useCallback(async () => {
    const api = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & OrientationPermission)
      | undefined;

    // Hors contexte sécurisé, WebKit n'expose pas l'interface du tout.
    if (typeof api === "undefined") {
      setGyro("unavailable");
      return;
    }

    // Android n'a pas de garde-fou : l'absence de `requestPermission` vaut accord.
    if (typeof api.requestPermission !== "function") {
      setGyro("granted");
      return;
    }

    try {
      setGyro((await api.requestPermission()) === "granted" ? "granted" : "denied");
    } catch {
      // Hors contexte sécurisé ou hors geste utilisateur : NotAllowedError.
      setGyro("denied");
    }
  }, []);

  return (
    <section
      ref={ref}
      className={`relative flex min-h-svh items-center justify-center overflow-hidden ${
        onscreen ? "" : "hero-idle"
      }`}
    >
      <HeroBackdrop progress={scrollYProgress} gyro={gyro === "granted"} />

      {/* Portal opening animation */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-8"
        >
          <span className="inline-block rounded-full bg-zaha-green/10 px-4 py-1.5 text-sm font-medium text-zaha-green">
            Collectif de freelances
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 60, opacity: 0, filter: "blur(20px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="text-hero max-w-4xl font-bold tracking-tight text-zaha-black"
        >
          Ton talent n&apos;a pas
          <br />
          <span className="text-zaha-green">de frontières.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-zaha-black/70 md:text-xl"
        >
          Des missions de qualité, un cadre humain, zéro paperasse.
          Rejoins un collectif qui prend soin de ses freelances.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              className="rounded-full bg-zaha-green px-8 py-4 text-base font-semibold text-white transition-all hover:bg-zaha-green-light md:text-lg"
            >
              Rejoins le collectif
            </MagneticButton>

            {handheld && <GyroToggle state={gyro} onEnable={enableGyro} />}
          </div>

          {handheld && HINTS[gyro] && (
            <p className="max-w-[19rem] text-center text-xs leading-snug text-zaha-black/50">
              {HINTS[gyro]}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest text-zaha-black/40 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-zaha-black/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { TiltCard } from "@/components/shared/TiltCard";

const services = [
  {
    title: "UX / UI Design",
    description:
      "Conception d'interfaces utilisateur centrees sur l'experience, le design system et la conversion.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4h-4a4 4 0 000 8h4V4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 4h4a4 4 0 010 8h-4V4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 12h-4a4 4 0 000 8h4v-8z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 24a4 4 0 014-4h4v4a4 4 0 01-4 4 4 4 0 01-4-4z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    color: "text-zaha-orange",
  },
  {
    title: "Developpement React / TypeScript",
    description:
      "Applications web performantes, maintenables et scalables avec React et TypeScript.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 16 16)" />
      </svg>
    ),
    color: "text-zaha-green",
  },
  {
    title: "Developpement Next.js",
    description:
      "Sites et applications Next.js optimises : SSR, SSG, ISR, App Router, performances et SEO.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <defs>
          <clipPath id="nextjs-clip">
            <circle cx="16" cy="16" r="14" />
          </clipPath>
        </defs>
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
        <g clipPath="url(#nextjs-clip)">
          <path d="M12 22V10l14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 10v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    ),
    color: "text-zaha-black",
  },
  {
    title: "Developpement backend Node.js",
    description:
      "APIs robustes, microservices, architectures scalables avec Node.js et l'ecosysteme JavaScript.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-zaha-green",
  },
  {
    title: "Developpement React Native",
    description:
      "Applications mobiles cross-platform iOS et Android avec une codebase unique.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="7" y="2" width="18" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        <ellipse cx="16" cy="14" rx="7.5" ry="3" stroke="currentColor" strokeWidth="0.8" />
        <ellipse cx="16" cy="14" rx="7.5" ry="3" stroke="currentColor" strokeWidth="0.8" transform="rotate(60 16 14)" />
        <ellipse cx="16" cy="14" rx="7.5" ry="3" stroke="currentColor" strokeWidth="0.8" transform="rotate(120 16 14)" />
        <line x1="13" y1="25" x2="19" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "text-zaha-orange",
  },
  {
    title: "Developpement d'applications Shopify",
    description:
      "Applications custom, extensions et storefronts headless sur mesure pour l'ecosysteme Shopify.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" />
      </svg>
    ),
    color: "text-zaha-green-light",
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper id="services" className="bg-zaha-beige/20">
      <div className="mb-16 md:mb-24">
        <RevealOnScroll>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
            Services
          </p>
        </RevealOnScroll>
        <SplitText
          text="Notre expertise a votre service"
          tag="h2"
          className="text-section-title font-bold tracking-tight text-zaha-black"
        />
        <RevealOnScroll delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zaha-black/60">
            Du frontend au backend, du web au mobile, nous couvrons l&apos;ensemble
            du spectre du developpement moderne.
          </p>
        </RevealOnScroll>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <RevealOnScroll key={service.title} delay={index * 0.1} direction="up">
            <TiltCard className="h-full rounded-2xl border border-zaha-black/5 bg-white p-8 transition-all duration-300 hover:border-zaha-green/20 hover:shadow-lg">
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zaha-beige/60 ${service.color}`}
              >
                {service.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-zaha-black">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-zaha-black/60">
                {service.description}
              </p>
            </TiltCard>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}

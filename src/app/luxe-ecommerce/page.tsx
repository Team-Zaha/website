import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LuxeLanding } from "@/components/landings/luxe/LuxeLanding";

export const metadata: Metadata = pageMetadata({
  title: "Luxe & e-commerce",
  description:
    "L’exigence du luxe mérite une ingénierie d’exception. Découvrez comment Zaha accompagne les marques premium dans leur transformation digitale.",
  path: "/luxe-ecommerce",
});

export default function LuxeEcommercePage() {
  return <LuxeLanding />;
}

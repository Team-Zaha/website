import type { Metadata } from "next";
import { LuxeLanding } from "@/components/landings/luxe/LuxeLanding";

export const metadata: Metadata = {
  title: "Luxe & E-commerce | Zaha",
  description:
    "L\u2019exigence du luxe mérite une ingénierie d\u2019exception. Découvrez comment Zaha accompagne les marques premium dans leur transformation digitale.",
};

export default function LuxeEcommercePage() {
  return <LuxeLanding />;
}

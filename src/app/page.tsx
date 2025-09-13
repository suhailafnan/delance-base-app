// src/app/page.tsx
import { Hero } from "~/components/landing/Hero";
import { Features } from "~/components/landing/Features";
import { HowItWorks } from "~/components/landing/HowItWorks";

export default function LandingPage() {
  return (
    <div className="space-y-20">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}

import { ContactSection } from "@/components/contact/ContactSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { Differentiators } from "@/components/sections/Differentiators";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { ServicesCatalog } from "@/components/sections/ServicesCatalog";
import { Solutions } from "@/components/sections/Solutions";
import { Trust } from "@/components/sections/Trust";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Testimonials } from "@/components/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ServicesCatalog />
      <Solutions />
      <Differentiators />
      <Process />
      <Portfolio />
      <Testimonials />
      <Trust />
      <CallToAction />
      <ContactSection />
    </>
  );
}

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Destinations } from "@/components/destinations";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <Testimonials />
      <Footer />
    </main>
  );
}

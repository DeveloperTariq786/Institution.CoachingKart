import Header from "@/components/layout/Header";
import Hero from "@/features/landing/components/Hero";
import Partners from "@/features/landing/components/Partners";
import Features from "@/features/landing/components/Features";
import Testimonials from "@/features/landing/components/Testimonials";
import Pricing from "@/features/landing/components/Pricing";
import CTABanner from "@/features/landing/components/CTABanner";
import FAQ from "@/features/landing/components/FAQ";
import Footer from "@/components/layout/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Partners />
      <Pricing />
      {/* <CTABanner /> */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import MusicSection from "@/components/music-section";
import EventsSection from "@/components/events-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero-parallax') as HTMLElement;
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <EventsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}

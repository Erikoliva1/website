import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Gemini_Generated_Image_usmx9pusmx9pusmx-removebg-preview_1757692023026.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "music", label: "Music" },
    { href: "events", label: "Events" },
    { href: "gallery", label: "Gallery" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
        isScrolled ? 'nav-blur' : ''
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          className="cursor-pointer"
          onClick={() => scrollToSection('home')}
          data-testid="logo"
        >
          <img 
            src={logoImage} 
            alt="Prabhat Yadav Logo" 
            className="h-12 w-12 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-foreground hover:text-accent transition-colors duration-300"
              data-testid={`nav-link-${link.href}`}
            >
              {link.label}
            </button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground"
          data-testid="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background bg-opacity-95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block text-foreground hover:text-accent transition-colors duration-300 w-full text-left"
                data-testid={`mobile-nav-link-${link.href}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const socialLinks = [
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTiktok, href: "#", label: "TikTok" },
  ];

  return (
    <footer className="py-12 border-t border-border" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-gradient">Prabhat Yadav</h3>
            <p className="text-muted-foreground">
              Bringing the soul of music through Hindi, Bhojpuri, and Nepali melodies.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className="block text-muted-foreground hover:text-accent transition-colors duration-300"
                data-testid="footer-link-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('music')}
                className="block text-muted-foreground hover:text-accent transition-colors duration-300"
                data-testid="footer-link-music"
              >
                Music
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="block text-muted-foreground hover:text-accent transition-colors duration-300"
                data-testid="footer-link-events"
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block text-muted-foreground hover:text-accent transition-colors duration-300"
                data-testid="footer-link-gallery"
              >
                Gallery
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">Follow me on social media for latest updates and performances.</p>
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 text-xl"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 Prabhat Yadav. All rights reserved. Made with ❤️ and music.
          </p>
        </div>
      </div>
    </footer>
  );
}

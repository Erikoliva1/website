import { Play, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToMusic = () => {
    const element = document.getElementById('music');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="hero-parallax min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
      }}
      data-testid="hero-section"
    >
      <div className="text-center z-10 animate-fadeIn">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 text-gradient leading-tight">
          Prabhat Yadav
        </h1>
        <p className="text-xl md:text-2xl mb-8 hero-subtitle font-light">
          Singer | Performer | Music Lover
        </p>
        <button 
          onClick={scrollToMusic}
          className="btn-gold px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300"
          data-testid="listen-now-button"
        >
          <Play className="inline w-5 h-5 mr-2" />
          Listen Now
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-accent text-2xl w-8 h-8" />
      </div>
    </section>
  );
}

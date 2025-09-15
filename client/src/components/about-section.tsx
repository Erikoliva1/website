import { Music, Languages, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background relative z-10" data-testid="about-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slideUp">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the journey of music, passion, and cultural heritage
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slideUp">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
              alt="Prabhat Yadav - Professional Portrait" 
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto card-3d"
              data-testid="profile-image"
            />
          </div>
          
          <div className="space-y-6 animate-slideUp">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-display text-2xl font-semibold mb-4 text-accent">My Musical Journey</h3>
              <p className="text-muted-foreground mb-4">
                Born and raised in the heart of Nepal, my journey with music began at an early age. 
                Growing up surrounded by the rich cultural tapestry of Hindi, Bhojpuri, and Nepali traditions, 
                I discovered my passion for bringing stories to life through song.
              </p>
              <p className="text-muted-foreground mb-4">
                With years of dedicated practice and performances across various venues, I've had the 
                privilege of connecting with audiences through the universal language of music. My repertoire 
                spans traditional folk melodies to contemporary compositions, each carrying the essence of 
                our beautiful cultural heritage.
              </p>
              <p className="text-muted-foreground">
                Every performance is an opportunity to share emotions, stories, and the timeless beauty 
                of music that transcends boundaries and touches hearts.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="glass-effect p-4 rounded-lg" data-testid="stat-performances">
                <Music className="text-accent text-2xl mb-2 mx-auto w-8 h-8" />
                <p className="font-semibold">50+</p>
                <p className="text-sm text-muted-foreground">Performances</p>
              </div>
              <div className="glass-effect p-4 rounded-lg" data-testid="stat-languages">
                <Languages className="text-accent text-2xl mb-2 mx-auto w-8 h-8" />
                <p className="font-semibold">3</p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
              <div className="glass-effect p-4 rounded-lg" data-testid="stat-passion">
                <Heart className="text-accent text-2xl mb-2 mx-auto w-8 h-8" />
                <p className="font-semibold">∞</p>
                <p className="text-sm text-muted-foreground">Passion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

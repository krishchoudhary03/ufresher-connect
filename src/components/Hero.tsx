import { ArrowRight, Users, MessageCircle, Shield, Sparkles } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CosmicCard, CosmicCardContent, CosmicCardHeader, CosmicCardTitle, CosmicCardDescription } from "@/components/ui/cosmic-card";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Mentors",
      description: "Find experienced mentors in your field and build meaningful connections."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Join Communities",
      description: "Participate in clubs, communities, and collaborative learning spaces."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Environment",
      description: "AI-powered moderation ensures a respectful and supportive community."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Growth Focused",
      description: "Track your learning journey and celebrate achievements together."
    }
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 pb-16 relative"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-cosmic bg-clip-text text-transparent animate-glow">
                U-fresher ❤
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              A cosmic community where freshers connect with mentors, join collaborative clubs, 
              and grow together in a safe, moderated environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CosmicButton 
                variant="hero" 
                size="xl"
                onClick={onGetStarted}
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </CosmicButton>
              
              <CosmicButton variant="outline" size="xl">
                Learn More
              </CosmicButton>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <CosmicCard 
              key={feature.title}
              className="text-center group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CosmicCardHeader>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-cosmic flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CosmicCardTitle className="text-lg">{feature.title}</CosmicCardTitle>
              </CosmicCardHeader>
              <CosmicCardContent>
                <CosmicCardDescription className="text-base">
                  {feature.description}
                </CosmicCardDescription>
              </CosmicCardContent>
            </CosmicCard>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="animate-slide-in">
              <div className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-muted-foreground">Communities</p>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
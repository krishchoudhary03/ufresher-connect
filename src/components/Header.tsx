import { useState } from "react";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";
import logo from "@/assets/logo.png";

interface HeaderProps {
  user?: {
    name: string;
    role: 'admin' | 'mentor' | 'junior';
    profilePic: string;
  };
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Communities", href: "#communities" },
    { label: "Clubs", href: "#clubs" },
    { label: "Chat Rooms", href: "#chat" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="U-fresher Logo" 
              className="w-10 h-10 animate-float"
            />
            <h1 className="text-2xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              U-fresher ❤
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-cosmic transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* User Menu or Auth Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2">
                  <img 
                    src={user.profilePic} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-primary/50"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                <CosmicButton
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                </CosmicButton>
              </div>
            ) : (
              <CosmicButton variant="hero" className="hidden md:flex">
                Get Started
              </CosmicButton>
            )}

            {/* Mobile Menu Button */}
            <CosmicButton
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </CosmicButton>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {!user && (
                <CosmicButton variant="hero" className="mt-4">
                  Get Started
                </CosmicButton>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
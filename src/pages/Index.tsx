import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import AuthModal from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ufresher_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('ufresher_user', JSON.stringify(userData));
    toast({
      title: "Welcome to U-fresher ❤",
      description: `Successfully signed in as ${userData.role}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ufresher_user');
    toast({
      title: "Signed out",
      description: "Come back soon!",
    });
  };

  const handleGetStarted = () => {
    if (user) {
      // If user is logged in, scroll to dashboard
      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not logged in, show auth modal
      setShowAuth(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header user={user} onLogout={handleLogout} />
      
      {!user ? (
        <Hero onGetStarted={handleGetStarted} />
      ) : (
        <div id="dashboard">
          <Dashboard user={user} />
        </div>
      )}

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;

import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CatLogo } from "@/components/CatLogo";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar - desktop always visible, mobile conditionally visible */}
      <Sidebar isVisible={isMobileMenuOpen} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
        {/* Mobile Header with ThemeToggle */}
        <div className="md:hidden bg-card p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="text-primary p-1 rounded-lg">
              <CatLogo width={36} height={36} />
            </div>
            <h1 className="font-bold text-xl font-[Orbitron]">Cat<span className="text-primary">Driven</span></h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-muted-foreground hover:text-foreground ml-2"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Desktop Header with ThemeToggle - visible only on desktop */}
        <div className="hidden md:flex justify-end items-center p-4 bg-card/50 backdrop-blur-sm space-x-4">
          {isAuthenticated && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span> Authenticated
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-xs"
              >
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
        
        {/* Page Content */}
        {children}
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

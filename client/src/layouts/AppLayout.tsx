import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/ui/Footer";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - desktop always visible, mobile conditionally visible */}
      <Sidebar isVisible={isMobileMenuOpen} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
        {/* Mobile Header */}
        <div className="md:hidden bg-card p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="cat-gradient text-white p-2 rounded-lg">
              <i className="fas fa-cat text-xl"></i>
            </div>
            <h1 className="font-bold text-xl text-white">Catz<span className="text-secondary">3</span></h1>
          </div>
          <button 
            className="text-muted-foreground hover:text-foreground"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Page Content */}
        {children}
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

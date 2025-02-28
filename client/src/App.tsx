import { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Ordinals from './pages/Ordinals';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import NotFound from './pages/NotFound';
import OrdinalGenerator from './pages/admin/OrdinalGenerator';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { useLocation } from 'wouter';
import { Toaster } from './components/ui/sonner';

function App() {
  const [location] = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentBg, setCurrentBg] = useState<number>(0);

  // Background animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % 3);
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="catdao-theme">
      <div className="relative min-h-screen flex flex-col">
        {/* Ambient background */}
        <div className="ambient-bg"></div>

        <div className={`fixed z-50 top-4 right-4 ${!showSidebar ? 'left-4' : 'left-[280px]'} h-12 transition-all duration-300 flex items-center justify-between bg-background/80 backdrop-blur-md rounded-lg px-4 shadow-md border border-border/50`}>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground"
          >
            {showSidebar ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            )}
          </button>

          <div className="flex-1 mx-4">
            <div className="text-sm font-medium">
              {location === '/' && 'Home'}
              {location === '/ordinals' && 'Ordinals Explorer'}
              {location === '/dashboard' && 'Dashboard'}
              {location === '/marketplace' && 'Marketplace'}
              {location === '/admin/generator' && 'Ordinal Generator'}
            </div>
          </div>

          <ModeToggle />
        </div>

        <div className="flex-1 flex">
          <Sidebar visible={showSidebar} />

          <main className={`flex-1 pt-16 transition-all duration-300 ${showSidebar ? 'pl-[280px]' : 'pl-0'}`}>
            <div className="container py-6 mx-auto relative min-h-[calc(100vh-4rem)]">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/ordinals" component={Ordinals} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/marketplace" component={Marketplace} />
                <Route path="/admin/generator" component={OrdinalGenerator} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </main>
        </div>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import Home from './pages/Home';
import Ordinals from './pages/Ordinals';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Portfolio from './pages/Portfolio';
import Governance from './pages/Governance';
import LostPets from './pages/LostPets';
import Staking from './pages/Staking';
import Wallet from './pages/Wallet';
import Presentation from './pages/Presentation';
import NotFound from './pages/NotFound';
import OrdinalGenerator from './pages/admin/OrdinalGenerator';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { useLocation } from 'wouter';

// Protected route component for password-based authentication
function ProtectedRoute({ component: Component, ...rest }: { 
  component: React.ComponentType<any>, 
  path?: string 
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPrompting, setIsPrompting] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      const password = window.prompt("Enter password to access this page:");
      if (password === "catdao2025") {
        setIsAuthenticated(true);
        setIsPrompting(false);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setIsAuthenticated(false);
        setIsPrompting(false);
        alert("Incorrect password");
        window.location.href = "/";
      }
    };
    
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setIsPrompting(false);
    } else {
      checkAuth();
    }
  }, []);
  
  if (isPrompting) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg mb-2">Authenticating...</p>
        <p className="text-sm text-muted-foreground">Please enter the password</p>
      </div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg mb-2">Authentication Required</p>
        <p className="text-sm text-muted-foreground">You need to be authenticated to view this page</p>
      </div>
    </div>;
  }
  
  return <Route {...rest} component={Component} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="catdao-theme">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/ordinals" component={Ordinals} />
            <ProtectedRoute path="/marketplace" component={Marketplace} />
            <ProtectedRoute path="/portfolio" component={Portfolio} />
            <ProtectedRoute path="/governance" component={Governance} />
            <ProtectedRoute path="/lost-pets" component={LostPets} />
            <ProtectedRoute path="/staking" component={Staking} />
            <ProtectedRoute path="/wallet" component={Wallet} />
            <ProtectedRoute path="/presentation" component={Presentation} />
            <ProtectedRoute path="/admin/generator" component={OrdinalGenerator} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
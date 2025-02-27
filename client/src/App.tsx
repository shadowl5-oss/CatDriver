import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "./layouts/AppLayout";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

// Import pages
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import Marketplace from "@/pages/Marketplace";
import Governance from "@/pages/Governance";
import Staking from "@/pages/Staking";
import Presentation from "@/pages/Presentation";
import LostPets from "@/pages/LostPets";
import Explorer from "@/pages/Explorer";
import Ordinals from "@/pages/Ordinals";
import Wallet from "@/pages/Wallet";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "./hooks/use-auth";

// Protected route component
function ProtectedRoute({ 
  component: Component 
}: { 
  component: React.ComponentType 
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, navigate] = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save the current path to localStorage so we can redirect back after login
    const currentPath = window.location.pathname;
    localStorage.setItem("lastProtectedRoute", currentPath);
    navigate("/auth");
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    }>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/explorer" component={Explorer} />
        <Route path="/governance" component={Governance} />
        <Route path="/staking" component={Staking} />
        
        {/* Protected Routes */}
        <Route path="/portfolio">
          <ProtectedRoute component={Portfolio} />
        </Route>
        <Route path="/marketplace">
          <ProtectedRoute component={Marketplace} />
        </Route>
        <Route path="/presentation">
          <ProtectedRoute component={Presentation} />
        </Route>
        <Route path="/lost-pets">
          <ProtectedRoute component={LostPets} />
        </Route>
        <Route path="/ordinals">
          <ProtectedRoute component={Ordinals} />
        </Route>
        <Route path="/wallet">
          <ProtectedRoute component={Wallet} />
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppLayout>
          <Router />
        </AppLayout>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

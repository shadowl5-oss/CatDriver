import { Route, Switch } from 'wouter';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
//import AppLayout from "./layouts/AppLayout"; // Removed as per edited code
//import { Suspense } from "react"; // Removed as per edited code
//import { Loader2 } from "lucide-react"; // Removed as per edited code
//import { useAuth } from "@/hooks/use-auth"; // Removed as per edited code
//import { useLocation } from "wouter"; // Removed as per edited code

// Import pages
// Many imports removed as per edited code.  Only keeping those used in the edited code.
import Home from '@/pages/Home';
import Dashboard from "@/pages/Dashboard";
import Ordinals from "@/pages/Ordinals";
import NotFound from "@/pages/NotFound";
// Removed other page imports


// Removed ProtectedRoute component as it's not used in the edited code.


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Removed AuthProvider as per edited code */}
      {/* Removed AppLayout as per edited code */}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ordinals" component={Ordinals} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
      {/* Removed other components from the original code  */}
    </QueryClientProvider>
  );
}

export default App;
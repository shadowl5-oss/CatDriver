import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import Marketplace from "@/pages/Marketplace";
import Governance from "@/pages/Governance";
import Staking from "@/pages/Staking";
import Presentation from "@/pages/Presentation";
import LostPets from "@/pages/LostPets";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/governance" component={Governance} />
      <Route path="/staking" component={Staking} />
      <Route path="/presentation" component={Presentation} />
      <Route path="/lost-pets" component={LostPets} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Router />
      </AppLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

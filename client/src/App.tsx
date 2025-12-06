import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/lib/store";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PCsPage from "@/pages/pcs";
import NPCsPage from "@/pages/npcs";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/pcs" component={PCsPage}/>
      <Route path="/npcs" component={NPCsPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <TooltipProvider>
          <Router base={import.meta.env.BASE_URL}>
            <Toaster />
            <Routes />
          </Router>
        </TooltipProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
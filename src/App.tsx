import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardAI from "./pages/DashboardAI";
import DashboardItinerary from "./pages/DashboardItinerary";
import DashboardItineraryResult from "./pages/DashboardItineraryResult";
import DashboardFlights from "./pages/DashboardFlights";
import DashboardHotels from "./pages/DashboardHotels";
import DashboardPro from "./pages/DashboardPro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardAI />} />
              <Route path="itinerary" element={<DashboardItinerary />} />
              <Route path="itinerary/result" element={<DashboardItineraryResult />} />
              <Route path="flights" element={<DashboardFlights />} />
              <Route path="hotels" element={<DashboardHotels />} />
              <Route path="pro" element={<DashboardPro />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

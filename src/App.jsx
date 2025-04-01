import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatPreferencesProvider } from "@/context/ChatPreferencesContext";
import LandingPage from "./components/LandingPage";
import OnboardingForm from "./components/OnboardingForm";
import ChatPage from "./pages/ChatPage";
import PreferencesPage from "./pages/PreferencesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ChatPreferencesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/onboarding" element={<OnboardingForm />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ChatPreferencesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

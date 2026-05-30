import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

// Import your page views
import LandingPage from "@/components/pages/LandingPage";
import AuthPage from "@/components/pages/Auth";
import Dashboard from "@/components/pages/Dashboard";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="finance-app-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

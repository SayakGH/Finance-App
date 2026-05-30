import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WalletCards, LineChart, ShieldCheck } from "lucide-react"; // Assuming you have lucide-react from shadcn

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <WalletCards className="h-6 w-6 text-primary" />
          <span>FinTrack</span>
        </div>
        <div className="flex gap-4">
          <Link to="/auth">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/auth">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
          Take control of your <span className="text-primary">finances</span>.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Track your spending, manage multiple wallets, and achieve your
          financial goals with our secure and intuitive dashboard.
        </p>
        <div className="flex gap-4">
          <Link to="/auth">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="px-8">
              View Demo
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid sm:grid-cols-3 gap-8 mt-24 max-w-4xl w-full text-left">
          <div className="flex flex-col gap-2">
            <WalletCards className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-lg">Multi-Wallet Sync</h3>
            <p className="text-muted-foreground">
              Keep track of your bank accounts, crypto, and cash in one unified
              place.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <LineChart className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-lg">Smart Analytics</h3>
            <p className="text-muted-foreground">
              Visualize your spending habits with real-time charts and insights.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-lg">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your financial data is encrypted and stored securely.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

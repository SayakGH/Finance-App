import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  WalletCards,
  LineChart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Lock,
  Clock3,
} from "lucide-react";

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
      <main className="flex-1">
        <section className="px-6 py-24 text-center ">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary animate-pulse">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Version 2 is live
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Take control of your <span className="text-primary">finances</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Track your spending, manage multiple wallets, and achieve your
            financial goals with our secure and intuitive dashboard.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
        </section>

        {/* <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Active Users", value: "25K+" },
              { label: "Tracked Monthly", value: "₹30Cr+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Avg. Save Boost", value: "18%" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border bg-card p-4 text-center"
              >
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
              Built for everyday money decisions
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 text-left">
              <div className="rounded-2xl border p-6 bg-card">
                <WalletCards className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg">Multi-Wallet Sync</h3>
                <p className="text-muted-foreground mt-2">
                  Keep track of your bank accounts, cash, and cards in one
                  place.
                </p>
              </div>
              <div className="rounded-2xl border p-6 bg-card">
                <LineChart className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg">Smart Analytics</h3>
                <p className="text-muted-foreground mt-2">
                  Understand your habits with clean insights, trends, and
                  breakdowns.
                </p>
              </div>
              <div className="rounded-2xl border p-6 bg-card">
                <ShieldCheck className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg">Secure & Private</h3>
                <p className="text-muted-foreground mt-2">
                  Your data stays encrypted and protected with secure auth
                  flows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 bg-secondary/30 border-y">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
              How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Add Wallets",
                  desc: "Create wallets for each account and set opening balances.",
                  icon: WalletCards,
                },
                {
                  title: "2. Track Transactions",
                  desc: "Log income and expenses with categories and descriptions.",
                  icon: TrendingUp,
                },
                {
                  title: "3. Stay in Control",
                  desc: "Review history, search fast, and improve monthly outcomes.",
                  icon: CheckCircle2,
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl bg-background border p-6"
                >
                  <step.icon className="h-7 w-7 text-primary mb-3" />
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border p-6 bg-card">
              <h3 className="text-xl font-bold mb-4">
                Why teams and individuals choose FinTrack
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Secure token-based
                  access
                </li>
                <li className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" /> Fast transaction
                  entry workflow
                </li>
                <li className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-primary" /> Practical
                  insights, not noisy charts
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border p-6 bg-card">
              <h3 className="text-xl font-bold mb-4">FAQ</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Can I track multiple wallets?</p>
                  <p className="text-muted-foreground">
                    Yes, create as many as you need and manage them separately.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    Does deleting a transaction update balance?
                  </p>
                  <p className="text-muted-foreground">
                    Yes, balance is adjusted automatically when a transaction is
                    removed.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    Can I search old transactions?
                  </p>
                  <p className="text-muted-foreground">
                    Yes, use description search with pagination in each wallet
                    view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl rounded-3xl border bg-primary/10 p-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Start tracking smarter today
            </h2>
            <p className="text-muted-foreground mt-3 mb-6">
              Set up your first wallet in less than two minutes.
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-8 gap-2">
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} FinTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign up
            </Link>
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

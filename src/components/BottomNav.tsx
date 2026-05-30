import {
  Wallet,
  ArrowRightLeft,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import type { Tab } from "../types";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onAddTransaction: () => void;
}

export function BottomNav({
  activeTab,
  setActiveTab,
  onAddTransaction,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-background border-t pb-safe border-border/40 backdrop-blur-lg z-40">
      {/* Floating Action Button Container */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50">
        <Button
          onClick={onAddTransaction}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 flex items-center justify-center transition-transform active:scale-95"
        >
          <Plus className="h-7 w-7 text-black" />
        </Button>
      </div>

      <div className="flex items-center justify-between p-2 w-full">
        {/* Left Nav Items */}
        <div className="flex flex-1 justify-around">
          <Button
            variant="ghost"
            className={`flex-col h-14 w-full max-w-[70px] gap-1 px-0 ${activeTab === "wallets" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("wallets")}
          >
            <Wallet className="h-5 w-5" />
            <span className="text-[10px] font-medium">Wallets</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex-col h-14 w-full max-w-[70px] gap-1 px-0 ${activeTab === "transactions" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("transactions")}
          >
            <ArrowRightLeft className="h-5 w-5" />
            <span className="text-[10px] font-medium">Activity</span>
          </Button>
        </div>

        {/* Spacer for Center Floating Button */}
        <div className="w-16 shrink-0 pointer-events-none" />

        {/* Right Nav Items */}
        <div className="flex flex-1 justify-around">
          <Button
            variant="ghost"
            className={`flex-col h-14 w-full max-w-[70px] gap-1 px-0 ${activeTab === "analytics" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-[10px] font-medium">Analytics</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex-col h-14 w-full max-w-[70px] gap-1 px-0 ${activeTab === "settings" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-5 w-5" />
            <span className="text-[10px] font-medium">Settings</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

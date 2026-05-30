import { useState } from "react";
import { ArrowLeft, Tag, Delete, ArrowRight } from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuickAddViewProps {
  onBack: () => void;
}

export function QuickAddView({ onBack }: QuickAddViewProps) {
  const [amount, setAmount] = useState("0");

  const handleNumpad = (val: string) => {
    if (val === "back") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (val === ".") {
      if (!amount.includes(".")) setAmount((prev) => prev + ".");
    } else {
      setAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute left-0 -ml-2 rounded-full hover:bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold w-full text-center">
          Add Expense
        </h2>
      </div>

      {/* Main Content Wrapper (flex-1 pushes numpad to bottom) */}
      <div className="flex-1 flex flex-col justify-between pb-6">
        <div>
          {/* Amount Display */}
          <div className="text-center space-y-1 mb-10">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Amount Spent
            </p>
            <div className="flex items-center justify-center gap-1 text-5xl font-bold tracking-tight">
              <span className="text-2xl text-muted-foreground mt-2">$</span>
              <span>{amount || "0"}</span>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                <Tag className="h-5 w-5" />
              </div>
              <Input
                className="pl-10 h-14 bg-secondary/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary rounded-2xl text-base"
                placeholder="What was it for? (e.g. Uber)"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-2xl">
              <div>
                <p className="text-sm font-medium">Recurring Expense?</p>
                <p className="text-xs text-muted-foreground">
                  Auto-add next month
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Numpad & Action Button fixed to bottom area */}
        <div className="mt-auto pt-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {keys.map((key) => (
              <Button
                key={key}
                variant="ghost"
                className="h-16 text-2xl font-medium bg-secondary/50 hover:bg-secondary rounded-2xl active:scale-95 transition-transform"
                onClick={() => handleNumpad(key)}
              >
                {key === "back" ? <Delete className="h-6 w-6" /> : key}
              </Button>
            ))}
          </div>

          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            onClick={onBack}
          >
            Add Transaction <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { ArrowLeft, Delete, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { walletService } from "@/services/wallet";
import { createTransaction } from "@/api/transactions";
import type { AppWallet } from "@/types";

interface QuickAddViewProps {
  onBack: () => void;
  defaultWalletId?: string;
  defaultMode?: "expense" | "income";
  onTransactionCreated?: () => void;
}

export function QuickAddView({
  onBack,
  defaultWalletId,
  defaultMode,
  onTransactionCreated,
}: QuickAddViewProps) {
  const [amount, setAmount] = useState("0");
  const [wallets, setWallets] = useState<AppWallet[]>([]);
  const [selectedWalletId, setSelectedWalletId] = useState(
    defaultWalletId ?? "",
  );
  const [mode, setMode] = useState<"expense" | "income">(
    defaultMode ?? "expense",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  // Tags State
  const [tags] = useState([
    "Food",
    "Groceries",
    "Shopping",
    "Clothes",
    "Transport",
    "Utilities",
    "Outings",
    "Subscriptions",
    "Health",
    "Education",
    "Others",
  ]);
  const [selectedTag, setSelectedTag] = useState("Food");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await walletService.getWallets();
        setWallets(data.wallets);

        if (defaultWalletId) {
          setSelectedWalletId(defaultWalletId);
        } else if (data.wallets.length > 0) {
          setSelectedWalletId(data.wallets[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch wallets for quick add:", error);
      }
    };

    fetchWallets();
  }, [defaultWalletId]);

  useEffect(() => {
    if (defaultMode) {
      setMode(defaultMode);
    }
  }, [defaultMode]);

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
      <div className="flex items-center justify-between mb-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute left-0 -ml-2 rounded-full hover:bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold w-full text-center">Quick Add</h2>
      </div>

      {/* Main Content Wrapper - Removed justify-between */}
      <div className="flex-1 flex flex-col pb-2">
        <div>
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-secondary/60 rounded-2xl">
            <Button
              type="button"
              variant={mode === "expense" ? "default" : "ghost"}
              className="rounded-xl h-10"
              onClick={() => setMode("expense")}
            >
              Add Expense
            </Button>
            <Button
              type="button"
              variant={mode === "income" ? "default" : "ghost"}
              className="rounded-xl h-10"
              onClick={() => setMode("income")}
            >
              Add Money
            </Button>
          </div>

          {/* Amount Display */}
          <div className="text-center space-y-1 mb-8">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              {mode === "expense" ? "Amount Spent" : "Amount Added"}
            </p>
            <div className="flex items-center justify-center gap-1 text-5xl font-bold tracking-tight">
              <span className="text-2xl text-muted-foreground mt-2">₹</span>
              <span>{amount || "0"}</span>
            </div>
          </div>

          {/* Category Tags Section */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
              Wallet
            </p>
            <Select
              value={selectedWalletId}
              onValueChange={setSelectedWalletId}
            >
              <SelectTrigger className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {mode === "expense" && (
              <>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                  Category
                </p>
                <div className="flex items-center gap-3">
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-full h-14 bg-secondary/50 border-transparent focus:ring-1 focus:ring-primary rounded-2xl text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-border/50">
                      {tags.map((tag) => (
                        <SelectItem
                          key={tag}
                          value={tag}
                          className="rounded-xl cursor-pointer"
                        >
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
              Description (optional)
            </p>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note"
              className="h-10 rounded-md"
              maxLength={100}
            />
          </div>
        </div>

        {/* Numpad & Action Button - Removed mt-auto, added specific top margin (mt-8) */}
        <div className="mt-8">
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
            disabled={isSubmitting}
            onClick={async () => {
              const parsedAmount = Number.parseFloat(amount);
              if (
                !selectedWalletId ||
                Number.isNaN(parsedAmount) ||
                parsedAmount <= 0
              ) {
                return;
              }

              try {
                setIsSubmitting(true);
                await createTransaction(
                  selectedWalletId,
                  parsedAmount,
                  mode,
                  mode === "income" ? "" : selectedTag,
                  description.trim() || undefined,
                );
                onTransactionCreated?.();
                onBack();
              } catch (error) {
                console.error("Failed to create transaction:", error);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {mode === "expense" ? "Add Expense" : "Add Money"}{" "}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Building,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { deleteTransaction, getTransactions } from "@/api/transactions";
import type { AppWallet, Transaction } from "../../types";

interface WalletDetailViewProps {
  wallet: AppWallet;
  onBack: () => void;
  onAddTransaction: (type: "income" | "expense") => void;
  refreshSignal?: number;
}

const formatIndianDateTime = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function WalletDetailView({
  wallet,
  onBack,
  onAddTransaction,
  refreshSignal = 0,
}: WalletDetailViewProps) {
  const [walletTransactions, setWalletTransactions] = useState<Transaction[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchWalletTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await getTransactions(wallet.id);
        setWalletTransactions(response.transactions ?? []);
      } catch (error) {
        console.error("Failed to fetch wallet transactions:", error);
        setWalletTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletTransactions();
  }, [wallet.id, refreshSignal]);

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      setDeletingTransactionId(transactionId);
      await deleteTransaction(transactionId);
      setWalletTransactions((prev) => prev.filter((tx) => tx.id !== transactionId));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    } finally {
      setDeletingTransactionId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full -ml-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Building className="h-5 w-5 text-muted-foreground" />

            {wallet.name}
          </h2>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-primary text-primary-foreground border-none shadow-lg">
        <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium opacity-80 mb-2">
            Available Balance
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight">
            ₹
            {wallet.balance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h1>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-16 flex flex-col gap-1 rounded-2xl bg-card border-border hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/30 transition-colors"
          onClick={() => onAddTransaction("income")}
        >
          <ArrowDownToLine className="h-5 w-5" />
          <span className="text-xs font-semibold">Add Money</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex flex-col gap-1 rounded-2xl bg-card border-border hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 transition-colors"
          onClick={() => onAddTransaction("expense")}
        >
          <ArrowUpFromLine className="h-5 w-5" />
          <span className="text-xs font-semibold">Add Expense</span>
        </Button>
      </div>

      {/* Past Expenses/Transactions */}
      <div>
        <h3 className="text-lg font-semibold tracking-tight mb-4">
          Past Transactions
        </h3>
        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground text-sm">
            Loading transactions...
          </div>
        ) : walletTransactions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No transactions found for this wallet.
          </div>
        ) : (
          <div className="space-y-3">
            {walletTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-2xl border bg-card text-card-foreground shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}
                  >
                    {tx.type === "income" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {tx.category || (tx.type === "income" ? "Income" : "Uncategorized")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatIndianDateTime(tx.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`font-bold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={() => handleDeleteTransaction(tx.id)}
                    disabled={deletingTransactionId === tx.id}
                    aria-label="Delete transaction"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

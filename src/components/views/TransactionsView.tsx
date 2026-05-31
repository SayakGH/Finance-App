import { useEffect, useState } from "react";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { deleteTransaction, recentActivity } from "@/api/transactions";
import { Button } from "../ui/button";
import type { Transaction } from "../../types";

export function TransactionsView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setIsLoading(true);
        const response = await recentActivity();
        setTransactions(response.transactions ?? []);
      } catch (error) {
        console.error("Failed to fetch recent activity:", error);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      setDeletingTransactionId(transactionId);
      await deleteTransaction(transactionId);
      setTransactions((prev) => prev.filter((tx) => tx.id !== transactionId));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    } finally {
      setDeletingTransactionId(null);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold tracking-tight">Recent Activity</h3>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-10 text-sm">
          Loading recent activity...
        </p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-muted-foreground py-10 text-sm">
          No recent activity found.
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === "income" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/20 text-rose-600 dark:text-rose-400"}`}
                >
                  {tx.type === "income" ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {tx.category || (tx.type === "income" ? "Income" : "Uncategorized")}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p
                  className={`font-semibold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteTransaction(tx.id)}
                  disabled={deletingTransactionId === tx.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

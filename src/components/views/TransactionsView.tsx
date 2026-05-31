import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { recentActivity } from "@/api/transactions";
import type { Transaction } from "../../types";

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

export function TransactionsView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                  <p className="text-xs text-muted-foreground">
                    {formatIndianDateTime(tx.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p
                  className={`font-semibold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

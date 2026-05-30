import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Building,
  CreditCard,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import type { AppWallet, Transaction } from "../../types";

interface WalletDetailViewProps {
  wallet: AppWallet;
  transactions: Transaction[];
  onBack: () => void;
}

export function WalletDetailView({
  wallet,
  transactions,
  onBack,
}: WalletDetailViewProps) {
  const walletTransactions = transactions.filter(
    (tx) => tx.walletId === wallet.id,
  );

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
            {wallet.type === "bank" ? (
              <Building className="h-5 w-5 text-muted-foreground" />
            ) : (
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            )}
            {wallet.name}
          </h2>
          <p className="text-xs text-muted-foreground capitalize">
            {wallet.type} Account
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-primary text-primary-foreground border-none shadow-lg">
        <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium opacity-80 mb-2">
            Available Balance
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight">
            $
            {wallet.balance.toLocaleString("en-US", {
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
        >
          <ArrowDownToLine className="h-5 w-5" />
          <span className="text-xs font-semibold">Add Money</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex flex-col gap-1 rounded-2xl bg-card border-border hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 transition-colors"
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
        {walletTransactions.length === 0 ? (
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
                    <p className="font-semibold text-sm">{tx.category}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <p
                  className={`font-bold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

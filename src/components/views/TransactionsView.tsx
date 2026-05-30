import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { Transaction } from "../../types";

interface TransactionsViewProps {
  transactions: Transaction[];
}

export function TransactionsView({ transactions }: TransactionsViewProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold tracking-tight">
          Recent Activity
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-full">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input type="number" placeholder="Amount" />
              <Input placeholder="Category (e.g. Groceries)" />
              <Button className="w-full">Save Transaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                <p className="font-medium text-sm">{tx.category}</p>
                <p className="text-xs text-muted-foreground">{tx.createdAt}</p>
              </div>
            </div>
            <p
              className={`font-semibold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
            >
              {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

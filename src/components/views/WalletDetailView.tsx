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
import { Input } from "../ui/input";
import {
  deleteTransaction,
  getTransactions,
  searchTransactions,
} from "@/api/transactions";
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
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchWalletTransactions = async () => {
      try {
        setIsLoading(true);
        const normalizedSearch = searchText.trim();
        const response = normalizedSearch
          ? await searchTransactions(wallet.id, normalizedSearch, page, limit)
          : await getTransactions(wallet.id, page, limit);
        const fetchedTransactions = response.transactions ?? [];
        setWalletTransactions(fetchedTransactions);
        setTotalPages(
          response.totalPages && response.totalPages > 0
            ? response.totalPages
            : fetchedTransactions.length === limit
              ? page + 1
              : page,
        );
      } catch (error) {
        console.error("Failed to fetch wallet transactions:", error);
        setWalletTransactions([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletTransactions();
  }, [wallet.id, refreshSignal, page, searchText]);

  useEffect(() => {
    setPage(1);
    setSearchInput("");
    setSearchText("");
  }, [wallet.id]);

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
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 pb-3">
      <div className="flex items-center gap-3 mb-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full -ml-2 hover:bg-secondary/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Building className="h-4 w-4" />
            </div>
            {wallet.name}
          </h2>
        </div>
      </div>

      <Card className="border-none bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/20">
        <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-85 mb-2">
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

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-16 flex flex-col gap-1 rounded-2xl bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/40 transition-colors"
          onClick={() => onAddTransaction("income")}
        >
          <ArrowDownToLine className="h-5 w-5" />
          <span className="text-xs font-semibold">Add Money</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex flex-col gap-1 rounded-2xl bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/40 transition-colors"
          onClick={() => onAddTransaction("expense")}
        >
          <ArrowUpFromLine className="h-5 w-5" />
          <span className="text-xs font-semibold">Add Expense</span>
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold tracking-tight mb-4">
          Past Transactions
        </h3>
        <div className="mb-4 flex items-center gap-2">
          <Input
            placeholder="Search by description"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              setPage(1);
              setSearchText(searchInput.trim());
            }}
          >
            Search
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setPage(1);
              setSearchInput("");
              setSearchText("");
            }}
          >
            Clear All
          </Button>
        </div>
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
                className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-card/75 backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}
                  >
                    {tx.type === "income" ? (
                      <TrendingUp className="h-4.5 w-4.5" />
                    ) : (
                      <TrendingDown className="h-4.5 w-4.5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm tracking-tight">
                      {tx.category || (tx.type === "income" ? "Income" : "Uncategorized")}
                    </p>
                    {tx.description && (
                      <p className="text-xs text-muted-foreground">{tx.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formatIndianDateTime(tx.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`font-bold text-[15px] ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
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
        <div className="flex items-center justify-between gap-3 pt-3">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={isLoading || page === 1}
          >
            Previous
          </Button>
          <p className="text-sm text-muted-foreground">Page {page}</p>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isLoading || page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Building, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { walletService } from "../../services/wallet";
import type { AppWallet } from "@/types";

interface WalletsViewProps {
  onSelectWallet: (wallet: AppWallet) => void;
}

export function WalletsView({ onSelectWallet }: WalletsViewProps) {
  const [wallets, setWallets] = useState<AppWallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [walletToDelete, setWalletToDelete] = useState<AppWallet | null>(null);
  const [newWalletName, setNewWalletName] = useState("");
  const [newWalletBalance, setNewWalletBalance] = useState("");

  const fetchWallets = async () => {
    try {
      const data = await walletService.getWallets();
      setWallets(data.wallets);
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleCreateWallet = async () => {
    if (!newWalletName.trim()) return;

    try {
      const initialBalance = newWalletBalance ? parseFloat(newWalletBalance) : 0;
      const response = await walletService.createWallet({
        name: newWalletName,
        initialBalance,
      });

      setWallets((prev) => [...prev, response.wallet]);
      setNewWalletName("");
      setNewWalletBalance("");
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Failed to create wallet:", error);
    }
  };

  const handleDeleteWallet = async (walletId: string) => {
    try {
      await walletService.deleteWallet(walletId);
      setWallets((prev) => prev.filter((wallet) => wallet.id !== walletId));
      setWalletToDelete(null);
    } catch (error) {
      console.error("Failed to delete wallet:", error);
    }
  };

  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="border-none bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/20">
        <CardContent className="pt-6 pb-7">
          <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-80 mb-2">
            Total Balance
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight">
            ₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h2>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-6 mb-1">
        <h3 className="text-lg font-semibold tracking-tight">Your Wallets</h3>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-secondary/70 backdrop-blur-sm hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Wallet Name"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Initial Balance"
                value={newWalletBalance}
                onChange={(e) => setNewWalletBalance(e.target.value)}
              />
              <Button className="w-full" onClick={handleCreateWallet}>
                Create Wallet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-4">Loading wallets...</p>
      ) : (
        <div className="grid gap-3">
          {wallets.map((wallet) => (
            <Card
              key={wallet.id}
              className="cursor-pointer border-border/60 bg-card/70 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/10 active:scale-[0.99]"
              onClick={() => onSelectWallet(wallet)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[15px] tracking-tight">{wallet.name}</p>
                    <p className="text-xs text-muted-foreground">Personal Wallet</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[15px]">
                    ₹{wallet.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      setWalletToDelete(wallet);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {wallets.length === 0 && !isLoading && (
        <p className="text-center text-muted-foreground py-4">
          No wallets yet. Click the + button to create one.
        </p>
      )}

      <Dialog
        open={Boolean(walletToDelete)}
        onOpenChange={(open) => {
          if (!open) setWalletToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Wallet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{walletToDelete?.name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWalletToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                walletToDelete && handleDeleteWallet(walletToDelete.id)
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

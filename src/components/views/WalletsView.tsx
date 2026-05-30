import { Building, CreditCard, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { AppWallet } from "../../types";

interface WalletsViewProps {
  wallets: AppWallet[];
  onSelectWallet: (walletId: string) => void;
}

export function WalletsView({ wallets, onSelectWallet }: WalletsViewProps) {
  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="bg-primary text-primary-foreground border-none">
        <CardContent className="pt-6">
          <p className="text-sm font-medium opacity-80 mb-1">Total Balance</p>
          <h2 className="text-4xl font-bold tracking-tight">
            ${totalBalance.toLocaleString()}
          </h2>
        </CardContent>
      </Card>

      {/* Add New Wallet Header Section */}
      <div className="flex items-center justify-between mt-6 mb-2">
        <h3 className="text-lg font-semibold tracking-tight">Your Wallets</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-secondary/50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input placeholder="Wallet Name" />
              <Input type="number" placeholder="Initial Balance" />
              <Button className="w-full">Create Wallet</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {wallets.map((wallet) => (
          <Card
            key={wallet.id}
            className="active:scale-[0.98] transition-transform cursor-pointer hover:bg-accent/50"
            onClick={() => onSelectWallet(wallet.id)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                  {wallet.type === "bank" ? (
                    <Building className="h-5 w-5" />
                  ) : (
                    <CreditCard className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{wallet.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {wallet.type}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                ${wallet.balance.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

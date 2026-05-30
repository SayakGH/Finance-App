import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { WalletsView } from "@/components/views/WalletsView";
import { TransactionsView } from "@/components/views/TransactionsView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { WalletDetailView } from "@/components/views/WalletDetailView";
import { SettingsView } from "@/components/views/SettingsView";
import { QuickAddView } from "@/components/views/QuickAddView";
import type { Tab, AppWallet, Transaction } from "@/types";

// Dummy Data
const initialWallets: AppWallet[] = [
  { id: "1", name: "Main Checking", balance: 4250.0, type: "bank" },
  { id: "2", name: "Hardware Wallet", balance: 12450.5, type: "crypto" },
];

const initialTransactions: Transaction[] = [
  {
    id: "1",
    walletId: "1",
    amount: 150.0,
    type: "expense",
    category: "Groceries",
    date: "2026-05-29",
  },
  {
    id: "2",
    walletId: "1",
    amount: 3200.0,
    type: "income",
    category: "Freelance",
    date: "2026-05-28",
  },
  {
    id: "3",
    walletId: "2",
    amount: 45.0,
    type: "expense",
    category: "Gas",
    date: "2026-05-27",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("wallets");
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const [wallets] = useState<AppWallet[]>(initialWallets);
  const [transactions] = useState<Transaction[]>(initialTransactions);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== "wallets") setSelectedWalletId(null);
  };

  const selectedWallet = wallets.find((w) => w.id === selectedWalletId);

  return (
    <div className="min-h-screen bg-secondary/30 flex justify-center">
      <div className="w-full max-w-md bg-background min-h-screen shadow-xl relative border-x overflow-x-hidden flex flex-col">
        {isAddingTransaction ? (
          <main className="px-6 pt-12 pb-4 flex-1">
            <QuickAddView onBack={() => setIsAddingTransaction(false)} />
          </main>
        ) : (
          <>
            {activeTab !== "settings" && <Header />}

            <main
              className={`px-6 pb-24 ${activeTab === "settings" ? "py-8" : "py-4"} flex-1`}
            >
              {selectedWalletId && selectedWallet ? (
                <WalletDetailView
                  wallet={selectedWallet}
                  transactions={transactions}
                  onBack={() => setSelectedWalletId(null)}
                />
              ) : (
                <>
                  {activeTab === "wallets" && (
                    <WalletsView
                      wallets={wallets}
                      onSelectWallet={setSelectedWalletId}
                    />
                  )}
                  {activeTab === "transactions" && (
                    <TransactionsView transactions={transactions} />
                  )}
                  {activeTab === "analytics" && <AnalyticsView />}
                  {activeTab === "settings" && <SettingsView />}
                </>
              )}
            </main>

            <BottomNav
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onAddTransaction={() => setIsAddingTransaction(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}

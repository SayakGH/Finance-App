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

const initialTransactions: Transaction[] = [
  {
    id: "1",
    walletId: "1",
    amount: 150.0,
    type: "expense",
    category: "Groceries",
    createdAt: "2026-05-29",
    updatedAt: "2026-05-29",
  },
  {
    id: "2",
    walletId: "1",
    amount: 3200.0,
    type: "income",
    category: "Freelance",
    createdAt: "2026-05-28",
    updatedAt: "2026-05-28",
  },
  {
    id: "3",
    walletId: "2",
    amount: 45.0,
    type: "expense",
    category: "Gas",
    createdAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("wallets");
  const [selectedWallet, setSelectedWallet] = useState<AppWallet | null>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const [transactions] = useState<Transaction[]>(initialTransactions);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== "wallets") setSelectedWallet(null);
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex justify-center">
      <div className="w-full max-w-md bg-background min-h-screen shadow-xl relative border-x overflow-x-hidden flex flex-col">
        {isAddingTransaction ? (
          <main className="px-6 pt-12 pb-4 flex-1">
            <QuickAddView
              onBack={() => setIsAddingTransaction(false)}
              defaultWalletId={selectedWallet?.id}
            />
          </main>
        ) : (
          <>
            {activeTab !== "settings" && <Header />}

            <main
              className={`px-6 pb-24 ${activeTab === "settings" ? "py-8" : "py-4"} flex-1`}
            >
              {selectedWallet ? (
                <WalletDetailView
                  wallet={selectedWallet}
                  transactions={transactions}
                  onBack={() => setSelectedWallet(null)}
                />
              ) : (
                <>
                  {activeTab === "wallets" && (
                    <WalletsView onSelectWallet={setSelectedWallet} />
                  )}
                  {activeTab === "transactions" && (
                    <TransactionsView transactions={transactions} />
                  )}
                  {activeTab === "analytics" && <AnalyticsView />}
                  {activeTab === "settings" && <SettingsView />}
                </>
              )}
            </main>

            {!selectedWallet && (
              <BottomNav
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onAddTransaction={() => setIsAddingTransaction(true)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

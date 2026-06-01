import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { WalletsView } from "@/components/views/WalletsView";
import { TransactionsView } from "@/components/views/TransactionsView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { WalletDetailView } from "@/components/views/WalletDetailView";
import { SettingsView } from "@/components/views/SettingsView";
import { QuickAddView } from "@/components/views/QuickAddView";
import type { Tab, AppWallet } from "@/types";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("wallets");
  const [selectedWallet, setSelectedWallet] = useState<AppWallet | null>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [quickAddMode, setQuickAddMode] = useState<"expense" | "income">(
    "expense",
  );
  const [walletDetailRefreshSignal, setWalletDetailRefreshSignal] = useState(0);

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
              defaultMode={quickAddMode}
              onTransactionCreated={(newWalletBalance) => {
                setWalletDetailRefreshSignal((prev) => prev + 1);
                if (selectedWallet && typeof newWalletBalance === "number") {
                  setSelectedWallet({
                    ...selectedWallet,
                    balance: newWalletBalance,
                  });
                }
              }}
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
                  onWalletBalanceChange={(newBalance) => {
                    setSelectedWallet((prev) =>
                      prev ? { ...prev, balance: newBalance } : prev,
                    );
                  }}
                  onBack={() => setSelectedWallet(null)}
                  onAddTransaction={(type) => {
                    setQuickAddMode(type);
                    setIsAddingTransaction(true);
                  }}
                  refreshSignal={walletDetailRefreshSignal}
                />
              ) : (
                <>
                  {activeTab === "wallets" && (
                    <WalletsView onSelectWallet={setSelectedWallet} />
                  )}
                  {activeTab === "transactions" && <TransactionsView />}
                  {activeTab === "analytics" && <AnalyticsView />}
                  {activeTab === "settings" && <SettingsView />}
                </>
              )}
            </main>

            {!selectedWallet && (
              <BottomNav
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onAddTransaction={() => {
                  setQuickAddMode("expense");
                  setIsAddingTransaction(true);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

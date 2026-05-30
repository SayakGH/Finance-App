export type Tab = "wallets" | "transactions" | "analytics" | "settings";

export interface AppWallet {
  id: string;
  name: string;
  balance: number;
  type: "bank" | "crypto" | "cash";
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

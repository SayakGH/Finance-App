export type Tab = "wallets" | "transactions" | "analytics" | "settings";

export interface AppWallet {
  id: string;
  name: string;
  balance: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  createdAt: string;
  updatedAt?: string;
  userId: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: "user" | "admin";
}

export interface IAuthResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IValidateTokenResponse {
  success: boolean;
}

export interface ILogoutResponse {
  success?: boolean;
  message?: string;
}

export interface IUpdateUserResponse {
  message?: string;
  user: IUser;
}

export interface IUser {
  name: string;
  _id: string;
  email: string;
}

export interface IGetAllUsersResponse {
  success: boolean;
  count: number;
  users: IUser[];
}

export interface IDeleteUserResponse {
  success: boolean;
  message: string;
}

export interface ICreateWalletResponse {
  message: string;
  wallet: AppWallet;
}

export interface IGetWalletsResponse {
  wallets: AppWallet[];
}

export interface IDeleteWalletResponse {
  message: string;
  wallet: AppWallet;
}

export interface ICreateTransactionResponse {
  message: string;
  transaction: Transaction;
}

export interface IGetTransactionsResponse {
  transactions: Transaction[];
}

export interface IDeleteTransactionResponse {
  message: string;
  transaction: Transaction;
}

// --- Analytics Types ---

export interface IMonthlyBreakdown {
  month: string;
  income: number;
  expense: number;
  count: number;
}

export interface IGetMonthlyBreakdownResponse {
  year: number;
  monthlyBreakdown: IMonthlyBreakdown[];
}

export interface ICategoryBreakdown {
  month: string;
  categories: Record<string, number>; // Flexible object for dynamic category names
  totalExpense: number;
}

export interface IGetCategoryBreakdownResponse {
  year: number;
  monthlyCategoryBreakdown: ICategoryBreakdown[];
}

export interface ISummaryDetails {
  totalIncome: number;
  totalExpense: number;
  savings: number;
  incomeCount: number;
  expenseCount: number;
  savingsRate: number;
}

export interface IGetAnalyticsSummaryResponse {
  year: number;
  summary: ISummaryDetails;
}

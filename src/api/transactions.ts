import api from "./axios";
import type {
  ICreateTransactionResponse,
  IDeleteTransactionResponse,
  IGetTransactionsResponse,
} from "@/types";

// Helper function to get the token
const getToken = () => localStorage.getItem("authToken");

export const createTransaction = async (
  walletId: string,
  amount: number,
  type: "income" | "expense",
  category: string,
  description?: string,
) => {
  const res = await api.post<ICreateTransactionResponse>(
    "/transactions",
    { walletId, category, amount, type, description },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const getTransactions = async (
  walletId: string,
  page = 1,
  limit = 10,
) => {
  const res = await api.get<IGetTransactionsResponse>(
    `/transactions/${walletId}`,
    {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const searchTransactions = async (
  walletId: string,
  search: string,
  page = 1,
  limit = 10,
) => {
  const res = await api.get<IGetTransactionsResponse>(`/transactions/search`, {
    params: { walletId, search, page, limit },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const deleteTransaction = async (transactionId: string) => {
  const res = await api.delete<IDeleteTransactionResponse>(
    `/transactions/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const recentActivity = async () => {
  const res = await api.get<IGetTransactionsResponse>(`/transactions/recent`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

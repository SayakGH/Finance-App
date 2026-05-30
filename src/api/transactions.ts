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
) => {
  const res = await api.post<ICreateTransactionResponse>(
    "/transactions",
    { walletId, category, amount, type },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const getTransactions = async () => {
  const res = await api.get<IGetTransactionsResponse>("/transactions", {
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

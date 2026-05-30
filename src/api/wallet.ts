import api from "./axios";
import type {
  ICreateWalletResponse,
  IDeleteWalletResponse,
  IGetWalletsResponse,
} from "@/types";

// Helper function to get the token
const getToken = () => localStorage.getItem("authToken");

export const createWallet = async (name: string, balance: number) => {
  const res = await api.post<ICreateWalletResponse>(
    "/wallets",
    { name, balance },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const getWallets = async () => {
  const res = await api.get<IGetWalletsResponse>("/wallets", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const deleteWallet = async (walletId: string) => {
  const res = await api.delete<IDeleteWalletResponse>(`/wallets/${walletId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

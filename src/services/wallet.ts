import {
  createWallet,
  deleteWallet as deleteWalletApi,
  getWallets,
} from "@/api/wallet";
import type { AppWallet } from "@/types";

export interface CreateWalletRequest {
  name: string;
  initialBalance?: number;
}

export interface CreateWalletResponse {
  message: string;
  wallet: AppWallet;
}

export interface DeleteWalletResponse {
  message: string;
}

export const walletService = {
  getWallets: async (): Promise<{ wallets: AppWallet[] }> => {
    const response = await getWallets();
    const wallets =
      (response as { wallets?: AppWallet[]; data?: { wallets?: AppWallet[] } })
        .wallets ??
      (response as { wallets?: AppWallet[]; data?: { wallets?: AppWallet[] } })
        .data?.wallets ??
      [];

    return { wallets };
  },

  createWallet: async (
    data: CreateWalletRequest
  ): Promise<CreateWalletResponse> => {
    return createWallet(data.name, data.initialBalance ?? 0);
  },

  deleteWallet: async (walletId: string): Promise<DeleteWalletResponse> => {
    const response = await deleteWalletApi(walletId);
    return { message: response.message };
  },
};

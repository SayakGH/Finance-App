import api from "./axios";
import type {
  IAuthResponse,
  ILogoutResponse,
  IUpdatePasswordResponse,
  IUpdateUserResponse,
  IValidateTokenResponse,
} from "@/types";

const getToken = () => localStorage.getItem("authToken");

export const loginUser = async (email: string, password: string) => {
  const res = await api.post<IAuthResponse>("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await api.post<IAuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const validateToken = async () => {
  const token = getToken();
  if (!token) return { success: false } as IValidateTokenResponse;

  const res = await api.get<IValidateTokenResponse>("/auth/validate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const logoutUser = async () => {
  const token = getToken();
  const res = await api.post<ILogoutResponse>(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const updateUserName = async (name: string) => {
  const token = getToken();
  const res = await api.patch<IUpdateUserResponse>(
    "/auth/update",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const token = getToken();
  const res = await api.patch<IUpdatePasswordResponse>(
    "/auth/update-password",
    { currentPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

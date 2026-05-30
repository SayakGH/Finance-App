import api from "./axios";
import type { IAuthResponse } from "@/types";

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

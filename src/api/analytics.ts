import api from "./axios";
import type {
  IGetMonthlyBreakdownResponse,
  IGetCategoryBreakdownResponse,
  IGetAnalyticsSummaryResponse,
} from "@/types";

// Helper function to get the token
const getToken = () => localStorage.getItem("authToken");

export const getMonthlyBreakdown = async (year?: number) => {
  const res = await api.get<IGetMonthlyBreakdownResponse>(
    "/analytics/monthly-breakdown",
    {
      params: { year },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const getCategoryBreakdown = async (year?: number) => {
  const res = await api.get<IGetCategoryBreakdownResponse>(
    "/analytics/category-breakdown",
    {
      params: { year },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

export const getAnalyticsSummary = async (year?: number) => {
  const res = await api.get<IGetAnalyticsSummaryResponse>(
    "/analytics/summary",
    {
      params: { year },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  return res.data;
};

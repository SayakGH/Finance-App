import { useEffect, useMemo, useState } from "react";
import { getAnalyticsSummary, getCategoryBreakdown, getMonthlyBreakdown } from "@/api/analytics";
import type {
  ICategoryBreakdown,
  IMonthlyBreakdown,
  ISummaryDetails,
} from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tags = [
  "Food",
  "Groceries",
  "Shopping",
  "Clothes",
  "Transport",
  "Utilities",
  "Outings",
  "Subscriptions",
  "Health",
  "Education",
  "Others",
];

const COLORS = [
  "#2563eb",
  "#0ea5e9",
  "#06b6d4",
  "#14b8a6",
  "#10b981",
  "#22c55e",
  "#84cc16",
  "#eab308",
  "#f59e0b",
  "#f97316",
  "#ef4444",
];

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, idx) => currentYear - idx);
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function AnalyticsView() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [monthly, setMonthly] = useState<IMonthlyBreakdown[]>([]);
  const [category, setCategory] = useState<ICategoryBreakdown[]>([]);
  const [summary, setSummary] = useState<ISummaryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const [monthlyRes, categoryRes, summaryRes] = await Promise.all([
          getMonthlyBreakdown(selectedYear),
          getCategoryBreakdown(selectedYear),
          getAnalyticsSummary(selectedYear),
        ]);

        if (!isMounted) return;
        setMonthly(monthlyRes.monthlyBreakdown ?? []);
        setCategory(categoryRes.monthlyCategoryBreakdown ?? []);
        setSummary(summaryRes.summary ?? null);
      } catch (err) {
        console.error("Failed to load analytics:", err);
        if (!isMounted) return;
        setError("Could not load analytics right now. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  const stackedCategoryData = useMemo(
    () =>
      category.map((row) => {
        const base: Record<string, number | string> = { month: row.month };
        for (const tag of tags) {
          base[tag] = row.categories?.[tag] ?? 0;
        }
        return base;
      }),
    [category],
  );

  const monthFilteredMonthly = useMemo(() => {
    if (selectedMonth === "all") return monthly;
    return monthly.filter((row) => row.month === selectedMonth);
  }, [monthly, selectedMonth]);

  const monthFilteredCategory = useMemo(() => {
    if (selectedMonth === "all") return stackedCategoryData;
    return stackedCategoryData.filter((row) => row.month === selectedMonth);
  }, [stackedCategoryData, selectedMonth]);

  const displayedSummary = useMemo(() => {
    if (selectedMonth === "all") {
      return {
        totalIncome: summary?.totalIncome ?? 0,
        totalExpense: summary?.totalExpense ?? 0,
      };
    }

    const selectedRow = monthly.find((row) => row.month === selectedMonth);
    return {
      totalIncome: selectedRow?.income ?? 0,
      totalExpense: selectedRow?.expense ?? 0,
    };
  }, [summary, monthly, selectedMonth]);

  const categoryTotals = useMemo(() => {
    const totals = tags.reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = 0;
      return acc;
    }, {});

    for (const row of category) {
      if (selectedMonth !== "all" && row.month !== selectedMonth) continue;
      for (const tag of tags) {
        totals[tag] += row.categories?.[tag] ?? 0;
      }
    }

    return tags
      .map((tag, index) => ({
        name: tag,
        value: totals[tag],
        color: COLORS[index % COLORS.length],
      }))
      .filter((item) => item.value > 0);
  }, [category, selectedMonth]);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">Analytics</h3>
        <div className="flex items-center gap-2">
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {monthLabels.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(selectedYear)}
            onValueChange={(value) => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getYears().map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <Card>
          <CardContent className="p-5 text-sm text-muted-foreground">Loading analytics...</CardContent>
        </Card>
      )}

      {!loading && error && (
        <Card>
          <CardContent className="p-5 text-sm text-rose-600">{error}</CardContent>
        </Card>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Income</p>
                <p className="text-lg font-semibold text-emerald-600">{formatCurrency(displayedSummary.totalIncome)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Expense</p>
                <p className="text-lg font-semibold text-rose-600">{formatCurrency(displayedSummary.totalExpense)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-72 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthFilteredMonthly} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Category-Wise Breakdown (Monthly)</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthFilteredCategory} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    {tags.map((tag, index) => (
                      <Bar
                        key={tag}
                        dataKey={tag}
                        stackId="category"
                        fill={COLORS[index % COLORS.length]}
                        radius={index === tags.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                {tags.map((tag, index) => (
                  <div key={tag} className="flex items-center gap-1.5 text-muted-foreground">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Category Share (Year)</CardTitle>
            </CardHeader>
            <CardContent className="h-72 pt-2">
              {categoryTotals.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  No category spending data available.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryTotals}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {categoryTotals.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

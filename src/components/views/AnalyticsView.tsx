import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function AnalyticsView() {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h3 className="text-lg font-semibold tracking-tight mb-4">
        Monthly Overview
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Income</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              +₹3,200
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Expenses</p>
            <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
              -₹195
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Groceries</span>
              <span className="font-medium">₹150.00</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Gas</span>
              <span className="font-medium">₹45.00</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[25%]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

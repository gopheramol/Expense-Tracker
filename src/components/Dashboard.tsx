import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define types inline instead of importing from @/types
type Category = 
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'shopping'
  | 'other';

interface Expense {
  date: string;
  amount: number;
  category: Category;
}

interface Income {
  date: string;
  amount: number;
}

interface MonthlyStats {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  expensesByCategory: Record<Category, number>;
}

interface DashboardProps {
  expenses: Expense[];
  incomes: Income[];
}

export function Dashboard({ expenses, incomes }: DashboardProps) {
  const [stats, setStats] = useState<MonthlyStats>({
    totalExpenses: 0,
    totalIncome: 0,
    balance: 0,
    expensesByCategory: {
      food: 0,
      transportation: 0,
      housing: 0,
      utilities: 0,
      entertainment: 0,
      healthcare: 0,
      shopping: 0,
      other: 0,
    },
  });

  // Format date without date-fns
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const monthlyIncomes = incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      return (
        incomeDate.getMonth() === currentMonth &&
        incomeDate.getFullYear() === currentYear
      );
    });

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = monthlyIncomes.reduce((sum, income) => sum + income.amount, 0);

    const expensesByCategory = monthlyExpenses.reduce(
      (acc, expense) => {
        acc[expense.category] += expense.amount;
        return acc;
      },
      {
        food: 0,
        transportation: 0,
        housing: 0,
        utilities: 0,
        entertainment: 0,
        healthcare: 0,
        shopping: 0,
        other: 0,
      } as Record<Category, number>
    );

    setStats({
      totalExpenses,
      totalIncome,
      balance: totalIncome - totalExpenses,
      expensesByCategory,
    });
  }, [expenses, incomes]);

  const chartData = Object.entries(stats.expensesByCategory)
    .filter(([, amount]) => amount > 0)
    .map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount,
    }));

  // Function to format numbers in Indian format with Rupee symbol
  const formatIndianCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="stats-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Total Income</h3>
          <div className="text-2xl font-bold">{formatIndianCurrency(stats.totalIncome)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatMonthYear(new Date())}
          </p>
        </div>
        
        <div className="stats-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Total Expenses</h3>
          <div className="text-2xl font-bold">{formatIndianCurrency(stats.totalExpenses)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatMonthYear(new Date())}
          </p>
        </div>
        
        <div className="stats-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Balance</h3>
          <div className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatIndianCurrency(stats.balance)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatMonthYear(new Date())}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatIndianCurrency(value)}
                />
                <Tooltip
                  formatter={(value) => [formatIndianCurrency(Number(value)), 'Amount']}
                  labelStyle={{ fontSize: 12 }}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
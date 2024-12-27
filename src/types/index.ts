export type Category =
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'shopping'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
}

export interface MonthlyStats {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  expensesByCategory: Record<Category, number>;
}
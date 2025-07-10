export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface ExpenseSummary {
  monthlyTotal: number;
  yearlyTotal: number;
  currentMonth: string;
  currentYear: string;
}

export interface MonthlyExpense {
  month: string;
  monthNumber: number;
  year: number;
  total: number;
  expenses: Expense[];
}

export interface YearlyExpenseData {
  year: number;
  total: number;
  months: MonthlyExpense[];
}

export interface Loan {
  id: string;
  name: string;
  date: string;
  amount: number;
  returned: boolean;
  createdAt: string;
  modifiedDates: string[];
}
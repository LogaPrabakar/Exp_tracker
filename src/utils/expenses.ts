import { Expense, ExpenseSummary, MonthlyExpense, YearlyExpenseData, Loan } from '../types';

export const saveExpensesToStorage = (expenses: Expense[]): void => {
  localStorage.setItem('expenseTrackerData', JSON.stringify(expenses));
};

export const getExpensesFromStorage = (): Expense[] => {
  const stored = localStorage.getItem('expenseTrackerData');
  return stored ? JSON.parse(stored) : [];
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyTotal = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const yearlyTotal = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  return {
    monthlyTotal,
    yearlyTotal,
    currentMonth: now.toLocaleString('default', { month: 'long' }),
    currentYear: currentYear.toString()
  };
};

export const getYearlyExpenseData = (expenses: Expense[], year?: number): YearlyExpenseData => {
  const targetYear = year || new Date().getFullYear();
  const yearExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === targetYear;
  });

  const months: MonthlyExpense[] = [];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  for (let month = 0; month < 12; month++) {
    const monthExpenses = yearExpenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === month;
    });

    const monthTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    months.push({
      month: monthNames[month],
      monthNumber: month,
      year: targetYear,
      total: monthTotal,
      expenses: monthExpenses
    });
  }

  const yearlyTotal = months.reduce((sum, month) => sum + month.total, 0);

  return {
    year: targetYear,
    total: yearlyTotal,
    months
  };
};

export const getAvailableYears = (expenses: Expense[]): number[] => {
  const years = new Set<number>();
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    years.add(expenseDate.getFullYear());
  });
  return Array.from(years).sort((a, b) => b - a);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const saveLoansToStorage = (loans: Loan[]): void => {
  localStorage.setItem('expenseTrackerLoans', JSON.stringify(loans));
};

export const getLoansFromStorage = (): Loan[] => {
  const stored = localStorage.getItem('expenseTrackerLoans');
  return stored ? JSON.parse(stored) : [];
};

export const generateLoanId = (): string => {
  return 'loan-' + Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
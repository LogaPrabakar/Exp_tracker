import React, { useState, useEffect } from 'react';
import { Plus, LogOut, Wallet, TrendingUp, Calendar, Trash2, Edit3, BarChart3, Menu } from 'lucide-react';
import { Expense, ExpenseSummary, YearlyExpenseData } from '../types';
import { calculateExpenseSummary, formatCurrency, formatDate, getYearlyExpenseData, getAvailableYears } from '../utils/expenses';
import AddExpenseModal from './AddExpenseModal';
import YearlyExpenseView from './YearlyExpenseView';

interface DashboardProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
  onEditExpense: (expense: Expense) => void;
  onLogout: () => void;
  username: string;
  onOpenMenu: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  expenses,
  onAddExpense,
  onDeleteExpense,
  onEditExpense,
  onLogout,
  username,
  onOpenMenu
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYearlyViewOpen, setIsYearlyViewOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [yearlyData, setYearlyData] = useState<YearlyExpenseData | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({
    monthlyTotal: 0,
    yearlyTotal: 0,
    currentMonth: '',
    currentYear: ''
  });

  useEffect(() => {
    setSummary(calculateExpenseSummary(expenses));
    setAvailableYears(getAvailableYears(expenses));
    setYearlyData(getYearlyExpenseData(expenses, selectedYear));
  }, [expenses, selectedYear]);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Other'
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Bills & Utilities': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
      'Education': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="glass shadow-md border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 order-2 ml-auto">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-primary-800 tracking-tight">Expense Tracker</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4 order-1 mr-auto">
              <button
                onClick={onOpenMenu}
                className="p-2 rounded-lg hover:bg-primary-50 text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 mr-2"
                title="Open Menu"
              >
                <Menu className="w-7 h-7" />
              </button>
              <span className="text-sm text-primary-700">Welcome, {username}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 border border-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">This Month</p>
                <p className="text-2xl font-bold text-primary-900">{formatCurrency(summary.monthlyTotal)}</p>
                <p className="text-xs text-primary-400 mt-1">{summary.currentMonth}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-accent-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent-600">This Year</p>
                <p className="text-2xl font-bold text-accent-900">{formatCurrency(summary.yearlyTotal)}</p>
                <p className="text-xs text-accent-400 mt-1">{summary.currentYear}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>

          {/* Yearly View Card */}
          <div 
            onClick={() => setIsYearlyViewOpen(true)}
            className="glass bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl shadow-md p-6 cursor-pointer hover:from-primary-500 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 border border-primary-200"
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-medium opacity-90">View</p>
                <p className="text-xl font-bold">Yearly</p>
                <p className="text-xs opacity-75 mt-1">Track by year</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Add New Expense Card */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="glass bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl shadow-md p-6 cursor-pointer hover:from-accent-500 hover:to-accent-700 transition-all duration-200 transform hover:scale-105 border border-accent-200"
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-medium opacity-90">Add New</p>
                <p className="text-xl font-bold">Expense</p>
                <p className="text-xs opacity-75 mt-1">Click to add</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Expenses List */}
        <div className="glass rounded-xl border border-primary-100">
          <div className="px-6 py-4 border-b border-primary-100 bg-primary-50 rounded-t-xl">
            <h2 className="text-lg font-bold text-primary-900">Recent Expenses</h2>
          </div>
          
          {expenses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
              <p className="text-gray-500 mb-4">Start tracking your expenses by adding your first entry.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Expense</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{expense.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                          {expense.category}
                        </span>
                        <span className="ml-2 text-base font-bold text-primary-700">{formatCurrency(expense.amount)}</span>
                      </div>
                      {expense.description && (
                        <p className="text-sm text-gray-600 mb-2">{expense.description}</p>
                      )}
                      <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onEditExpense(expense)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit Expense"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteExpense(expense.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Expense"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddExpense}
        categories={categories}
      />

      {/* Yearly Expense View Modal */}
      {isYearlyViewOpen && yearlyData && (
        <YearlyExpenseView
          yearlyData={yearlyData}
          onClose={() => setIsYearlyViewOpen(false)}
          onYearChange={handleYearChange}
          availableYears={availableYears}
          onDeleteExpense={onDeleteExpense}
        />
      )}
    </div>
  );
};

export default Dashboard;
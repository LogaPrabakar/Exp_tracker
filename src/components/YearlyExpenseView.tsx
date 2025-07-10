import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X, Wallet } from 'lucide-react';
import { Expense, MonthlyExpense, YearlyExpenseData } from '../types';
import { formatCurrency, formatDate } from '../utils/expenses';

interface YearlyExpenseViewProps {
  yearlyData: YearlyExpenseData;
  onClose: () => void;
  onYearChange: (year: number) => void;
  availableYears: number[];
  onDeleteExpense: (id: string) => void;
}

const YearlyExpenseView: React.FC<YearlyExpenseViewProps> = ({
  yearlyData,
  onClose,
  onYearChange,
  availableYears,
  onDeleteExpense
}) => {
  const [selectedMonth, setSelectedMonth] = useState<MonthlyExpense | null>(null);

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

  const handleMonthClick = (month: MonthlyExpense) => {
    if (month.expenses.length > 0) {
      setSelectedMonth(month);
    }
  };

  const closeMonthView = () => {
    setSelectedMonth(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-900">Yearly Expense Overview</h2>
              <p className="text-sm text-primary-600">Track your expenses by year and month</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Year Selector */}
        <div className="px-6 py-4 bg-primary-50 border-b border-primary-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const currentIndex = availableYears.indexOf(yearlyData.year);
                if (currentIndex < availableYears.length - 1) {
                  onYearChange(availableYears[currentIndex + 1]);
                }
              }}
              disabled={availableYears.indexOf(yearlyData.year) >= availableYears.length - 1}
              className="p-2 text-primary-400 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-900">{yearlyData.year}</h3>
              <p className="text-sm text-primary-600">Total: {formatCurrency(yearlyData.total)}</p>
            </div>

            <button
              onClick={() => {
                const currentIndex = availableYears.indexOf(yearlyData.year);
                if (currentIndex > 0) {
                  onYearChange(availableYears[currentIndex - 1]);
                }
              }}
              disabled={availableYears.indexOf(yearlyData.year) <= 0}
              className="p-2 text-primary-400 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Month Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearlyData.months.map((month) => (
              <div
                key={month.month}
                onClick={() => handleMonthClick(month)}
                className={`glass p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  month.expenses.length > 0
                    ? 'border-primary-200 hover:border-primary-300 bg-primary-50 hover:bg-primary-100'
                    : 'border-primary-50 bg-primary-50 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-primary-900">{month.month}</h4>
                  <span className="text-xs text-primary-400">{month.expenses.length} expenses</span>
                </div>
                <p className="text-lg font-bold text-primary-900">{formatCurrency(month.total)}</p>
                {month.expenses.length === 0 && (
                  <p className="text-xs text-primary-400 mt-1">No expenses</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Month Detail Modal */}
        {selectedMonth && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="glass rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              {/* Month Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedMonth.month} {selectedMonth.year}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Total: {formatCurrency(selectedMonth.total)} • {selectedMonth.expenses.length} expenses
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeMonthView}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Expenses List */}
              <div className="overflow-y-auto max-h-[60vh]">
                {selectedMonth.expenses.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses in {selectedMonth.month}</h3>
                    <p className="text-gray-500">No expenses were recorded for this month.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {selectedMonth.expenses.map((expense) => (
                      <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">{expense.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                                {expense.category}
                              </span>
                            </div>
                            {expense.description && (
                              <p className="text-sm text-gray-600 mb-2">{expense.description}</p>
                            )}
                            <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
                            </div>
                            <button
                              onClick={() => onDeleteExpense(expense.id)}
                              className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearlyExpenseView; 
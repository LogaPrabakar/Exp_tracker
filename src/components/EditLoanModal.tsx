import React, { useState, useEffect } from 'react';
import { X, Edit3, Calendar, User, IndianRupee } from 'lucide-react';
import { Loan } from '../types';

interface EditLoanModalProps {
  loan: Loan | null;
  onClose: () => void;
  onSubmit: (loan: Loan) => void;
}

const EditLoanModal: React.FC<EditLoanModalProps> = ({ loan, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    amount: '',
    returned: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loan) {
      setFormData({
        name: loan.name,
        date: loan.date,
        amount: loan.amount.toString(),
        returned: loan.returned,
      });
    }
  }, [loan]);

  if (!loan) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onSubmit({
        ...loan,
        name: formData.name,
        date: formData.date,
        amount: parseFloat(formData.amount),
        returned: formData.returned,
      });
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="glass max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-accent-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center shadow-md">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-accent-800">Edit Loan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-accent-400" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-accent-700 mb-2">
              Name of Person
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-300" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-accent-200 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-colors bg-accent-50 placeholder-accent-300"
                placeholder="e.g., Cristiano Ronaldo"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-accent-700 mb-2">
              Date of Loan Provided
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-300" />
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-accent-200 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-colors bg-accent-50"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-accent-700 mb-2">
              Amount (₹)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-300" />
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-accent-200 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-colors bg-accent-50 placeholder-accent-300"
                placeholder="0"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="returned"
              name="returned"
              type="checkbox"
              checked={formData.returned}
              onChange={handleChange}
              className="h-5 w-5 text-accent-600 border-accent-300 rounded focus:ring-accent-400"
            />
            <label htmlFor="returned" className="text-sm text-accent-700 font-medium">
              Money Returned
            </label>
          </div>
          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-accent-100 hover:bg-accent-200 text-accent-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Edit3 className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLoanModal; 
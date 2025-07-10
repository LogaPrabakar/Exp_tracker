import React from 'react';
import { X, Calculator, StickyNote, LogOut, MoreHorizontal } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: () => void;
  onOpenNotes: () => void;
  onLogout: () => void;
  onOpenLoan: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose, onOpenCalculator, onOpenNotes, onLogout, onOpenLoan }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-start">
      <div className="w-72 bg-white h-full shadow-xl flex flex-col p-6 relative border-r border-primary-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-primary-50 text-primary-700"
          title="Close Menu"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-primary-900 mb-8 mt-2">Menu</h2>
        <button
          onClick={onOpenLoan}
          className="flex items-center space-x-3 w-full px-4 py-3 mb-4 bg-accent-700 hover:bg-accent-800 text-white rounded-lg font-semibold text-lg transition-colors"
        >
          <MoreHorizontal className="w-6 h-6" />
          <span>Loan</span>
        </button>
        <button
          onClick={onOpenCalculator}
          className="flex items-center space-x-3 w-full px-4 py-3 mb-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-colors"
        >
          <Calculator className="w-6 h-6" />
          <span>Calculator</span>
        </button>
        <button
          onClick={onOpenNotes}
          className="flex items-center space-x-3 w-full px-4 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold text-lg transition-colors"
        >
          <StickyNote className="w-6 h-6" />
          <span>Notes</span>
        </button>
        <div className="mt-auto pt-8 text-xs text-primary-400 text-center border-t border-primary-100">
          <button
            onClick={onLogout}
            className="w-full mb-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
          >
            Log Out
          </button>
          Powered by StoneWave<br/>
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer; 
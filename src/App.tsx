import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Expense, User, Loan } from './types';
import { authenticateUser, getUserFromStorage, saveUserToStorage, clearUserFromStorage, registerUser } from './utils/auth';
import { saveExpensesToStorage, getExpensesFromStorage, generateId, saveLoansToStorage, getLoansFromStorage, generateLoanId } from './utils/expenses';
import LoanList from './components/LoanList';
import AddLoanModal from './components/AddLoanModal';
import EditExpenseModal from './components/EditExpenseModal';
import EditLoanModal from './components/EditLoanModal';
import MenuDrawer from './components/MenuDrawer';
import CalculatorModal from './components/CalculatorModal';
import NotesModal from './components/NotesModal';

export interface Note {
  title: string;
  content: string;
  date: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'expenses' | 'loan'>('expenses');
  const [loginError, setLoginError] = useState<string>('');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem('expenseTrackerNotes');
    return stored ? JSON.parse(stored) : [];
  });
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  useEffect(() => {
    // Check for saved user session
    const savedUser = getUserFromStorage();
    if (savedUser && savedUser.isAuthenticated) {
      setUser(savedUser);
    }

    // Load expenses from storage
    const savedExpenses = getExpensesFromStorage();
    setExpenses(savedExpenses);

    // Load loans from storage
    const savedLoans = getLoansFromStorage();
    // Patch old loans to have createdAt/modifiedDates
    const patchedLoans = savedLoans.map(loan => ({
      ...loan,
      createdAt: loan.createdAt || loan.date || new Date().toISOString(),
      modifiedDates: loan.modifiedDates || [],
    }));
    setLoans(patchedLoans);
    if (patchedLoans.length !== savedLoans.length || patchedLoans.some((l, i) => l.createdAt !== savedLoans[i].createdAt || !savedLoans[i].modifiedDates)) {
      saveLoansToStorage(patchedLoans);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (authenticateUser(username, password)) {
      const authenticatedUser = { username, isAuthenticated: true };
      setUser(authenticatedUser);
      saveUserToStorage(authenticatedUser);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleRegister = (username: string, password: string) => {
    if (!registerUser(username, password)) {
      setLoginError('Username already exists. Please choose another.');
      return;
    }
    const authenticatedUser = { username, isAuthenticated: true };
    setUser(authenticatedUser);
    saveUserToStorage(authenticatedUser);
    setLoginError('');
  };

  const handleLogout = () => {
    setUser(null);
    clearUserFromStorage();
  };

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId()
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    saveExpensesToStorage(updatedExpenses);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpensesToStorage(updatedExpenses);
  };

  const handleEditExpense = (expense: Expense) => setEditingExpense(expense);
  const handleUpdateExpense = (updated: Expense) => {
    const updatedExpenses = expenses.map(e => e.id === updated.id ? updated : e);
    setExpenses(updatedExpenses);
    saveExpensesToStorage(updatedExpenses);
    setEditingExpense(null);
  };

  const handleAddLoan = (loanData: Omit<Loan, 'id' | 'createdAt' | 'modifiedDates'>) => {
    const now = new Date().toISOString();
    const newLoan: Loan = {
      ...loanData,
      id: generateLoanId(),
      createdAt: now,
      modifiedDates: [],
    };
    const updatedLoans = [newLoan, ...loans];
    setLoans(updatedLoans);
    saveLoansToStorage(updatedLoans);
  };

  const handleUpdateLoan = (id: string, returned: boolean) => {
    const updatedLoans = loans.map(loan => loan.id === id ? { ...loan, returned } : loan);
    setLoans(updatedLoans);
    saveLoansToStorage(updatedLoans);
  };

  const handleDeleteLoan = (id: string) => {
    const updatedLoans = loans.filter(loan => loan.id !== id);
    setLoans(updatedLoans);
    saveLoansToStorage(updatedLoans);
  };

  const handleEditLoan = (loan: Loan) => setEditingLoan(loan);
  const handleUpdateLoanDetails = (updated: Loan) => {
    const now = new Date().toISOString();
    const updatedLoans = loans.map(l =>
      l.id === updated.id
        ? { ...updated, modifiedDates: [...(updated.modifiedDates || []), now] }
        : l
    );
    setLoans(updatedLoans);
    saveLoansToStorage(updatedLoans);
    setEditingLoan(null);
  };

  const handleSaveNotes = (title: string, content: string) => {
    const newNote: Note = { title, content, date: new Date().toISOString() };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('expenseTrackerNotes', JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (noteToDelete: Note) => {
    const updatedNotes = notes.filter(note => !(note.title === noteToDelete.title && note.date === noteToDelete.date));
    setNotes(updatedNotes);
    localStorage.setItem('expenseTrackerNotes', JSON.stringify(updatedNotes));
  };

  if (!user || !user.isAuthenticated) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} error={loginError} />;
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'expenses' ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}
          onClick={() => setActiveTab('expenses')}
        >
          Expenses
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === 'expenses' ? (
        <Dashboard
          expenses={expenses}
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
          onLogout={handleLogout}
          username={user.username}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      ) : (
        <LoanList
          loans={loans}
          onAddLoan={() => setIsLoanModalOpen(true)}
          onUpdateLoan={handleUpdateLoan}
          onDeleteLoan={handleDeleteLoan}
          onEditLoan={handleEditLoan}
        />
      )}
      {/* Menu Drawer/Modal */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenCalculator={() => { setIsCalculatorOpen(true); setIsMenuOpen(false); }}
        onOpenNotes={() => { setIsNotesOpen(true); setIsMenuOpen(false); }}
        onLogout={handleLogout}
        onOpenLoan={() => { setActiveTab('loan'); setIsMenuOpen(false); }}
      />
      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <NotesModal
        isOpen={isNotesOpen}
        onClose={() => { setIsNotesOpen(false); setViewingNote(null); }}
        notes={notes}
        onSave={handleSaveNotes}
        viewingNote={viewingNote}
        onViewNote={setViewingNote}
        onDeleteNote={handleDeleteNote}
      />
      <AddLoanModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        onSubmit={handleAddLoan}
      />
      <EditExpenseModal
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        onSubmit={handleUpdateExpense}
      />
      <EditLoanModal
        loan={editingLoan}
        onClose={() => setEditingLoan(null)}
        onSubmit={handleUpdateLoanDetails}
      />
    </div>
  );
}

export default App;
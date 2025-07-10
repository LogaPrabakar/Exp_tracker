import React from 'react';
import { CheckCircle, Circle, Plus, Trash2, Edit3, MoreHorizontal } from 'lucide-react';
import { Loan } from '../types';

interface LoanListProps {
  loans: Loan[];
  onAddLoan: () => void;
  onUpdateLoan: (id: string, returned: boolean) => void;
  onDeleteLoan: (id: string) => void;
  onEditLoan: (loan: Loan) => void;
}

const formatDateNoSeconds = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const LoanList: React.FC<LoanListProps> = ({ loans, onAddLoan, onUpdateLoan, onDeleteLoan, onEditLoan }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  return (
    <div className="max-w-2xl mx-auto mt-8 px-2 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-900">Loans</h2>
        <button
          onClick={onAddLoan}
          className="flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Loan</span>
        </button>
      </div>
      {loans.length === 0 ? (
        <div className="text-center py-12 text-primary-400">No loans recorded yet.</div>
      ) : (
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="glass flex flex-col p-4 rounded-xl border border-primary-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg text-primary-800">{loan.name}</div>
                  <div className="text-sm text-primary-500">{new Date(loan.date).toLocaleDateString()}</div>
                  <div className="text-sm text-primary-700 font-bold mt-1">₹ {loan.amount}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateLoan(loan.id, !loan.returned)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${loan.returned ? 'bg-green-100 text-green-700' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}
                    title={loan.returned ? 'Mark as not returned' : 'Mark as returned'}
                  >
                    {loan.returned ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    <span className="ml-2 text-sm font-medium">{loan.returned ? 'Returned' : 'Not Returned'}</span>
                  </button>
                  <button
                    onClick={() => onEditLoan(loan)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit Loan"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteLoan(loan.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
                    title="Delete Loan"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === loan.id ? null : loan.id)}
                    className="p-2 text-primary-700 hover:bg-primary-100 rounded-lg transition-colors ml-2"
                    title="More"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {expandedId === loan.id && (
                <div className="mt-3 bg-primary-50 rounded-lg p-3 text-sm text-primary-800">
                  <div><span className="font-semibold">Added date:</span> {formatDateNoSeconds(loan.createdAt)}</div>
                  {loan.modifiedDates.length > 0 && (
                    <div className="mt-2">
                      <div className="font-semibold mb-1">Modified dates:</div>
                      <ul className="list-disc ml-5">
                        {loan.modifiedDates.map((d, i) => (
                          <li key={i}>{formatDateNoSeconds(d)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanList; 
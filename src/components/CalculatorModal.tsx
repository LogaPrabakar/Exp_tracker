import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  if (!isOpen) return null;

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch {
        setResult('Error');
      }
    } else {
      setInput((prev) => prev + value);
      setResult('');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass max-w-lg w-full rounded-xl shadow-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-primary-50 text-primary-700"
          title="Close Calculator"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-primary-900 mb-4">Calculator</h2>
        <div className="bg-primary-50 rounded-lg p-5 mb-6 text-right text-2xl font-mono text-primary-800 min-h-[3.5rem]">
          {result || input || '0'}
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(btn)}
              className="bg-primary-100 hover:bg-primary-200 text-primary-900 font-bold py-4 rounded-lg text-xl focus:outline-none"
            >
              {btn}
            </button>
          ))}
        </div>
        <button
          onClick={handleClear}
          className="w-full mt-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-lg text-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CalculatorModal; 
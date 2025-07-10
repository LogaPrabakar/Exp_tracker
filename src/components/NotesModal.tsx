import React, { useState, useEffect } from 'react';
import { X, StickyNote, Eye, Trash2 } from 'lucide-react';
import { Note } from '../App';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  onSave: (title: string, content: string) => void;
  viewingNote: Note | null;
  onViewNote: (note: Note | null) => void;
  onDeleteNote: (note: Note) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, notes, onSave, viewingNote, onViewNote, onDeleteNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setContent('');
      onViewNote(null);
    }
  }, [isOpen, onViewNote]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onSave(title.trim(), content.trim());
    setTitle('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass max-w-2xl w-full rounded-xl shadow-xl p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent-50 text-accent-700"
          title="Close Notes"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-3 mb-6">
          <StickyNote className="w-9 h-9 text-accent-600" />
          <h2 className="text-2xl font-bold text-accent-900">Notes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Note */}
          <div>
            <h3 className="font-semibold text-accent-800 mb-2">Add New Note</h3>
            <input
              className="w-full mb-3 rounded-lg border border-accent-200 bg-accent-50 p-3 text-accent-800 focus:ring-2 focus:ring-accent-400 focus:border-transparent text-lg"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Topic / Title"
              maxLength={50}
            />
            <textarea
              className="w-full min-h-[140px] rounded-lg border border-accent-200 bg-accent-50 p-3 text-accent-800 focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-none mb-3 text-lg"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your notes here..."
            />
            <button
              onClick={handleSave}
              className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2 rounded-lg transition-colors"
              disabled={!title.trim() || !content.trim()}
            >
              Save Note
            </button>
          </div>
          {/* Past Notes */}
          <div>
            <h3 className="font-semibold text-accent-800 mb-2">Past Notes</h3>
            {notes.length === 0 ? (
              <div className="text-accent-400">No notes saved yet.</div>
            ) : (
              <ul className="space-y-2 max-h-56 overflow-y-auto">
                {notes.map((note, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-accent-50 rounded-lg px-3 py-2">
                    <button
                      className="text-left flex-1 font-medium text-accent-700 hover:underline"
                      onClick={() => onViewNote(note)}
                    >
                      {note.title}
                    </button>
                    <span className="ml-2 text-xs text-accent-400">{new Date(note.date).toLocaleString()}</span>
                    <button
                      className="ml-2 p-1 text-accent-600 hover:bg-accent-100 rounded"
                      onClick={() => onViewNote(note)}
                      title="View Note"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="ml-2 p-1 text-red-600 hover:bg-red-100 rounded"
                      onClick={() => onDeleteNote(note)}
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {viewingNote && (
              <div className="mt-4 p-3 bg-accent-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-accent-800">{viewingNote.title}</div>
                  <button className="text-xs text-accent-500 hover:underline" onClick={() => onViewNote(null)}>
                    Close
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-accent-700 text-sm max-h-48 overflow-y-auto break-words">
                  {viewingNote.content}
                </div>
                <div className="text-xs text-accent-400 mt-2">{new Date(viewingNote.date).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesModal; 
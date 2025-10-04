
import React from 'react';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full animate-bounce-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">
          If you quit now, your current game will end.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Yes, Quit
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition-colors"
          >
            No, Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

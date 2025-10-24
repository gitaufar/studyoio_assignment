import React from 'react';

interface BookingsHeaderProps {
  onAddBooking: () => void;
}

export const BookingsHeader: React.FC<BookingsHeaderProps> = ({ onAddBooking }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Booking</h1>
      <button 
        onClick={onAddBooking}
        className="bg-secondary text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Tambah Booking</span>
      </button>
    </div>
  );
};

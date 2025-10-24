import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

interface BookingsHeaderProps {
  onAddBooking: () => void;
}

export const BookingsHeader: React.FC<BookingsHeaderProps> = ({ onAddBooking }) => {
  const [searchParams] = useSearchParams();
  const rangeFilter = searchParams.get('range');

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {rangeFilter === 'next3d' ? 'Upcoming Sessions' : 'Bookings List'}
          </h1>
          {rangeFilter === 'next3d' && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing scheduled sessions for the next 3 days •{' '}
              <Link to="/bookings" className="text-primary hover:text-green-700 font-medium">
                View all bookings
              </Link>
            </p>
          )}
        </div>
        <button 
          onClick={onAddBooking}
          className="bg-secondary text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Booking</span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

interface BookingsHeaderProps {
  onAddBooking: () => void;
}

export const BookingsHeader: React.FC<BookingsHeaderProps> = ({ onAddBooking }) => {
  const [searchParams] = useSearchParams();
  const rangeFilter = searchParams.get('range');

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
            {rangeFilter === 'next3d' ? (
              <>
                <span className="hidden sm:inline">Upcoming Sessions</span>
                <span className="sm:hidden">Upcoming</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Bookings List</span>
                <span className="sm:hidden">Bookings</span>
              </>
            )}
          </h1>
          {rangeFilter === 'next3d' && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span className="hidden sm:inline">Showing scheduled sessions for the next 3 days • </span>
              <Link to="/bookings" className="text-primary hover:text-green-700 font-medium">
                View all
              </Link>
            </p>
          )}
        </div>
        <button 
          onClick={onAddBooking}
          className="bg-secondary text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base shrink-0"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden xs:inline">Add Booking</span>
          <span className="xs:hidden">Add</span>
        </button>
      </div>
    </div>
  );
};

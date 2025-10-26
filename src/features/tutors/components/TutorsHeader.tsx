import React from 'react';

interface TutorsHeaderProps {
  onAddTutor: () => void;
}

export const TutorsHeader: React.FC<TutorsHeaderProps> = ({ onAddTutor }) => {
  return (
    <div className="flex justify-between items-center mb-4 md:mb-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Tutors</h1>
      <button 
        onClick={onAddTutor}
        className="bg-primary text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-md flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden xs:inline">Add Tutor</span>
        <span className="xs:hidden">Add</span>
      </button>
    </div>
  );
};

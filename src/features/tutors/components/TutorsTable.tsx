import React from 'react';
import { Table, SkeletonTable } from '../../../shared/components';
import type { Tutor } from '../types';

interface TutorsTableProps {
  tutors: Tutor[];
  loading: boolean;
  onEdit: (tutor: Tutor) => void;
  onDelete: (id: string) => void;
}

export const TutorsTable: React.FC<TutorsTableProps> = ({
  tutors,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    { 
      key: 'hourlyRate', 
      label: 'Hourly Rate',
      render: (value: number) => `Rp ${value.toLocaleString('id-ID')}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
  ];

  if (loading) {
    return <SkeletonTable rows={5} columns={5} />;
  }

  return (
    <Table
      data={tutors}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      emptyMessage="No tutors yet — click Add Tutor."
    />
  );
};

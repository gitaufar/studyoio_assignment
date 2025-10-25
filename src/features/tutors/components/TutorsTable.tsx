import React from 'react';
import { Table, SkeletonTable, StatusBadge } from '../../../shared/components';
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
      render: (value: string) => <StatusBadge status={value} />
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

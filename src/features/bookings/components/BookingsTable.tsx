import React from 'react';
import { Table, SkeletonTable, StatusBadge } from '../../../shared/components';
import type { Booking } from '../types';

interface BookingsTableProps {
  bookings: Booking[];
  loading: boolean;
  onEdit: (booking: Booking) => void;
  onDelete: (id: string) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({ 
  bookings, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  const columns = [
    { key: 'tutorName', label: 'Tutor' },
    { key: 'studentName', label: 'Student' },
    { key: 'date', label: 'Date' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => <StatusBadge status={value} />
    },
  ];

  if (loading) {
    return <SkeletonTable rows={5} columns={6} />;
  }

  return (
    <Table
      data={bookings}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      emptyMessage="No bookings yet — click Add Booking."
    />
  );
};

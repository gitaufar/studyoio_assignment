import React from 'react';
import { Table } from '../../../shared/components';
import { BookingStatusBadge } from './BookingStatusBadge';
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
      render: (value: string) => <BookingStatusBadge status={value as 'scheduled' | 'completed' | 'cancelled'} />
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
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

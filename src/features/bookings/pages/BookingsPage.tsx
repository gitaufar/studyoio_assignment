import React, { useEffect, useState, useMemo } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { BookingForm } from '../components/BookingForm';
import type { Booking } from '../types';
import { Modal, Table } from '../../../shared/components';

export const BookingsPage: React.FC = () => {
  const { bookings, loading, fetchBookings, deleteBooking } = useBookingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>();
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Filter bookings by status
  const filteredBookings = useMemo(() => {
    if (statusFilter === 'all') return bookings;
    return bookings.filter(booking => booking.status === statusFilter);
  }, [bookings, statusFilter]);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedBooking(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      await deleteBooking(id);
    }
  };

  const columns = [
    { key: 'tutorName', label: 'Tutor' },
    { key: 'studentName', label: 'Student' },
    { key: 'date', label: 'Date' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[value] || ''}`}>
            {value}
          </span>
        );
      }
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Booking</h1>
        <button 
          onClick={handleAdd}
          className="bg-secondary text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Booking</span>
        </button>
      </div>

      {/* Filter by Status */}
      <div className="mb-6 flex items-center space-x-4">
        <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark text-gray-900 dark:text-white"
        >
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredBookings.length} booking(s) found
        </span>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      ) : (
        <Table
          data={filteredBookings}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No bookings yet — click Add Booking."
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BookingForm
          booking={selectedBooking}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchBookings();
          }}
        />
      </Modal>
    </div>
  );
};

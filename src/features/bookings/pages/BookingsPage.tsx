import React, { useEffect, useState, useMemo } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { 
  BookingForm, 
  BookingsHeader, 
  BookingsFilter, 
  BookingsTable 
} from '../components';
import type { Booking } from '../types';
import { Modal } from '../../../shared/components';

export const BookingsPage: React.FC = () => {
  const { bookings, loading, fetchBookings, deleteBooking } = useBookingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>();
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

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

  return (
    <div>
      <BookingsHeader onAddBooking={handleAdd} />
      
      <BookingsFilter 
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
        resultCount={filteredBookings.length}
      />
      
      <BookingsTable 
        bookings={filteredBookings}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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

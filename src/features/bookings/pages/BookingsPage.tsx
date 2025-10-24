import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const { bookings, loading, fetchBookings, deleteBooking } = useBookingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>();
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

  const rangeFilter = searchParams.get('range'); // Get 'range' query param

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings = useMemo(() => {
    let result = bookings;

    // Apply range filter (next 3 days)
    if (rangeFilter === 'next3d') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const threeDaysLater = new Date(today);
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
      
      result = result.filter(booking => {
        if (booking.status !== 'scheduled' || !booking.date) return false;
        
        const bookingDate = new Date(booking.date + 'T00:00:00');
        return bookingDate >= today && bookingDate <= threeDaysLater;
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }

    return result;
  }, [bookings, statusFilter, rangeFilter]);

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

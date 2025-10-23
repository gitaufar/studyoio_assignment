import React, { useEffect, useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { BookingForm } from '../components/BookingForm';
import type { Booking } from '../types';
import { Modal, Table } from '../../../shared/components';

export const BookingsPage: React.FC = () => {
  const { bookings, loading, fetchBookings, deleteBooking } = useBookingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

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
    { key: 'studentName', label: 'Nama Siswa' },
    { key: 'tutorName', label: 'Tutor' },
    { key: 'subject', label: 'Mata Pelajaran' },
    { key: 'date', label: 'Tanggal' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bookings-page">
      <h1>Daftar Booking</h1>
      <button onClick={handleAdd}>Tambah Booking</button>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          data={bookings}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
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

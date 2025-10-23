import { create } from 'zustand';
import { bookingService } from '../services/bookingService';
import type { Booking } from '../types';

interface BookingStore {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const bookings = await bookingService.getAll();
      set({ bookings, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch bookings', loading: false });
    }
  },

  addBooking: async (booking) => {
    set({ loading: true, error: null });
    try {
      await bookingService.create(booking);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to add booking', loading: false });
      throw error;
    }
  },

  updateBooking: async (id, booking) => {
    set({ loading: true, error: null });
    try {
      await bookingService.update(id, booking);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to update booking', loading: false });
      throw error;
    }
  },

  deleteBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      await bookingService.delete(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete booking', loading: false });
      throw error;
    }
  },
}));

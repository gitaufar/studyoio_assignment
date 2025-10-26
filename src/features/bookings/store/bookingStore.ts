import { create } from 'zustand';
import { bookingService } from '../services/bookingService';
import type { Booking } from '../types';
import type { Unsubscribe } from 'firebase/firestore';

interface BookingStore {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  isSubscribed: boolean;
  unsubscribe: Unsubscribe | null;
  
  subscribeBookings: () => void;
  unsubscribeBookings: () => void;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  loading: true, // Start as loading
  error: null,
  isSubscribed: false,
  unsubscribe: null,

  /**
   * Subscribe to real-time booking updates
   * Data automatically syncs from Firestore's IndexedDB cache
   */
  subscribeBookings: () => {
    const state = get();
    
    // Prevent duplicate subscriptions
    if (state.isSubscribed || state.unsubscribe) {
      return;
    }
    
    const unsubscribe = bookingService.subscribeToBookings(
      (bookings) => {
        set({ 
          bookings, 
          loading: false, 
          error: null,
          isSubscribed: true 
        });
      },
      (error) => {
        set({ 
          error: error.message, 
          loading: false 
        });
      }
    );

    set({ unsubscribe, isSubscribed: true });
  },

  /**
   * Unsubscribe from real-time updates
   */
  unsubscribeBookings: () => {
    const state = get();
    if (state.unsubscribe) {
      state.unsubscribe();
      set({ unsubscribe: null, isSubscribed: false });
    }
  },

  /**
   * Legacy fetch method (for one-time loads)
   * Prefer subscribeBookings for real-time updates
   */
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

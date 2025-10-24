import { create } from 'zustand';
import { tutorService } from '../services/tutorService';
import type { Tutor } from '../types';
import type { Unsubscribe } from 'firebase/firestore';

interface TutorStore {
  tutors: Tutor[];
  loading: boolean;
  error: string | null;
  isSubscribed: boolean;
  unsubscribe: Unsubscribe | null;
  
  subscribeTutors: () => void;
  unsubscribeTutors: () => void;
  fetchTutors: () => Promise<void>;
  addTutor: (tutor: Omit<Tutor, 'id'>) => Promise<void>;
  updateTutor: (id: string, tutor: Partial<Tutor>) => Promise<void>;
  deleteTutor: (id: string) => Promise<void>;
}

export const useTutorStore = create<TutorStore>((set, get) => ({
  tutors: [],
  loading: true, // Start as loading
  error: null,
  isSubscribed: false,
  unsubscribe: null,

  /**
   * Subscribe to real-time tutor updates
   * Data automatically syncs from Firestore's IndexedDB cache
   */
  subscribeTutors: () => {
    const state = get();
    
    // Prevent duplicate subscriptions
    if (state.isSubscribed || state.unsubscribe) {
      console.warn('⚠️ Already subscribed to tutors');
      return;
    }

    console.log('🔄 Subscribing to tutors real-time updates...');
    
    const unsubscribe = tutorService.subscribeToTutors(
      (tutors) => {
        set({ 
          tutors, 
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
  unsubscribeTutors: () => {
    const state = get();
    if (state.unsubscribe) {
      console.log('🛑 Unsubscribing from tutors');
      state.unsubscribe();
      set({ unsubscribe: null, isSubscribed: false });
    }
  },

  /**
   * Legacy fetch method (for one-time loads)
   * Prefer subscribeTutors for real-time updates
   */
  fetchTutors: async () => {
    set({ loading: true, error: null });
    try {
      const tutors = await tutorService.getAll();
      set({ tutors, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tutors', loading: false });
    }
  },

  addTutor: async (tutor) => {
    set({ loading: true, error: null });
    try {
      await tutorService.create(tutor);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to add tutor', loading: false });
      throw error;
    }
  },

  updateTutor: async (id, tutor) => {
    set({ loading: true, error: null });
    try {
      await tutorService.update(id, tutor);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to update tutor', loading: false });
      throw error;
    }
  },

  deleteTutor: async (id) => {
    set({ loading: true, error: null });
    try {
      await tutorService.delete(id);
      set((state) => ({
        tutors: state.tutors.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete tutor', loading: false });
      throw error;
    }
  },
}));

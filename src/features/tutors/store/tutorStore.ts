import { create } from 'zustand';
import { tutorService } from '../services/tutorService';
import type { Tutor } from '../types';

interface TutorStore {
  tutors: Tutor[];
  loading: boolean;
  error: string | null;
  fetchTutors: () => Promise<void>;
  addTutor: (tutor: Omit<Tutor, 'id'>) => Promise<void>;
  updateTutor: (id: string, tutor: Partial<Tutor>) => Promise<void>;
  deleteTutor: (id: string) => Promise<void>;
}

export const useTutorStore = create<TutorStore>((set) => ({
  tutors: [],
  loading: false,
  error: null,

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

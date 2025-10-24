
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import type { Booking } from '../types';
import { db } from '../../../shared/services/firebase';

const COLLECTION_NAME = 'bookings';

export const bookingService = {
  /**
   * Subscribe to real-time updates for all bookings
   * Data is automatically cached in IndexedDB by Firestore
   * Works offline - will use cached data when network is unavailable
   */
  subscribeToBookings: (
    onUpdate: (bookings: Booking[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    
    return onSnapshot(
      q,
      (snapshot) => {
        const bookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];
        
        // Check if data came from cache or server
        const source = snapshot.metadata.fromCache ? 'cache' : 'server';
        console.log(`📅 Bookings loaded from ${source} (${bookings.length} bookings)`);
        
        onUpdate(bookings);
      },
      (error) => {
        console.error('❌ Error subscribing to bookings:', error);
        if (onError) onError(error as Error);
      }
    );
  },

  /**
   * Get all bookings (one-time fetch)
   * For initial loads only - prefer subscribeToBookings for real-time updates
   */
  getAll: async (): Promise<Booking[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  getById: async (id: string): Promise<Booking | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Booking;
    }
    return null;
  },

  getByTutor: async (tutorId: string): Promise<Booking[]> => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('tutorId', '==', tutorId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  create: async (booking: Omit<Booking, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...booking,
      createdAt: new Date(),
    });
    return docRef.id;
  },

  update: async (id: string, booking: Partial<Booking>): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...booking,
      updatedAt: new Date(),
    });
  },

  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};

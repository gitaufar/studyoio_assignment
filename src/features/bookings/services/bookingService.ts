
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
} from 'firebase/firestore';
import type { Booking } from '../types';
import { db } from '../../../shared/services/firebase';

const COLLECTION_NAME = 'bookings';

export const bookingService = {
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

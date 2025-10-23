
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import type { Tutor } from '../types';
import { db } from '../../../shared/services/firebase';

const COLLECTION_NAME = 'tutors';

export const tutorService = {
  getAll: async (): Promise<Tutor[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tutor[];
  },

  getById: async (id: string): Promise<Tutor | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Tutor;
    }
    return null;
  },

  create: async (tutor: Omit<Tutor, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...tutor,
      createdAt: new Date(),
    });
    return docRef.id;
  },

  update: async (id: string, tutor: Partial<Tutor>): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...tutor,
      updatedAt: new Date(),
    });
  },

  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};

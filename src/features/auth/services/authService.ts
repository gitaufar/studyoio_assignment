
import { auth } from '../../../shared/services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import type { Credential, User } from '../types';
import { getAuthErrorMessage } from '../utils/errorMessages';

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || '',
  displayName: firebaseUser.displayName || undefined,
  photoURL: firebaseUser.photoURL || undefined,
});

export const authService = {
  login: async (credential: Credential): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  register: async (credential: Credential): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  getCurrentUser: (): User | null => {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? mapFirebaseUser(firebaseUser) : null;
  },
};

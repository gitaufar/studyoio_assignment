
import { auth } from '../../../shared/services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import type { Credential, User } from '../types';

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || '',
  displayName: firebaseUser.displayName || undefined,
  photoURL: firebaseUser.photoURL || undefined,
});

export const authService = {
  login: async (credential: Credential): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credential.email,
      credential.password
    );
    return mapFirebaseUser(userCredential.user);
  },

  register: async (credential: Credential): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credential.email,
      credential.password
    );
    return mapFirebaseUser(userCredential.user);
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  getCurrentUser: (): User | null => {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? mapFirebaseUser(firebaseUser) : null;
  },
};

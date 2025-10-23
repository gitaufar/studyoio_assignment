export interface Tutor {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  bio?: string;
  rating?: number;
  photoURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TutorFormData extends Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'> {}

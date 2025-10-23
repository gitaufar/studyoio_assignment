export interface Tutor {
  id: string;
  name: string;
  email: string;
  subject: string;
  hourlyRate: number;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TutorFormData extends Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'> {}

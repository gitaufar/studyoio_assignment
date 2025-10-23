export interface Booking {
  id: string;
  studentName: string;
  studentId?: string;
  tutorName: string;
  tutorId?: string;
  subject: string;
  date: string;
  time: string;
  duration: number; // dalam menit
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingFormData extends Omit<Booking, 'id' | 'createdAt' | 'updatedAt'> {}

export interface Booking {
  id: string;
  tutorName: string;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingFormData extends Omit<Booking, 'id' | 'createdAt' | 'updatedAt'> {}

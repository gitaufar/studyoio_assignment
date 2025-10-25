import React, { useState, useEffect } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { useTutorStore } from '../../tutors/store/tutorStore';
import { DatePicker, TimePicker, SuccessModal, ErrorModal } from '../../../shared/components';
import type { Booking } from '../types';

interface BookingFormProps {
  booking?: Booking;
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ booking, onSuccess }) => {
  const { addBooking, updateBooking, loading } = useBookingStore();
  const { tutors, fetchTutors } = useTutorStore();
  const [formData, setFormData] = useState<Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>>({
    tutorName: '',
    studentName: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'scheduled',
  });

  // Modal states
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: '' });
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
    error?: string;
  }>({ isOpen: false, message: '' });

  // Fetch tutors when component mounts
  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  useEffect(() => {
    if (booking) {
      setFormData({
        tutorName: booking.tutorName,
        studentName: booking.studentName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
      });
    }
  }, [booking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (booking?.id) {
        await updateBooking(booking.id, formData);
        setSuccessModal({
          isOpen: true,
          message: `Booking dengan ${formData.tutorName} berhasil diperbarui.`,
        });
      } else {
        await addBooking(formData);
        setSuccessModal({
          isOpen: true,
          message: `Booking dengan ${formData.tutorName} berhasil ditambahkan.`,
        });
      }
    } catch (error: any) {
      setErrorModal({
        isOpen: true,
        message: booking?.id ? 'Gagal memperbarui booking' : 'Gagal menambahkan booking',
        error: error?.message || 'Unknown error',
      });
    }
  };

  const handleSuccessClose = () => {
    setSuccessModal({ isOpen: false, message: '' });
    onSuccess?.();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Update form data
    const newFormData = {
      ...formData,
      [name]: value,
    };

    // Auto-calculate status when date or endTime changes
    if ((name === 'date' || name === 'endTime') && newFormData.date && newFormData.endTime) {
      const bookingDateTime = new Date(`${newFormData.date}T${newFormData.endTime}`);
      const now = new Date();
      
      // Auto-set status based on date/time, but only if not manually changed to 'cancelled'
      if (formData.status !== 'cancelled') {
        newFormData.status = bookingDateTime > now ? 'scheduled' : 'completed';
      }
    }

    setFormData(newFormData);
  };

  const handleDateChange = (dateString: string) => {
    const newFormData = {
      ...formData,
      date: dateString,
    };

    // Auto-calculate status
    if (dateString && newFormData.endTime) {
      const bookingDateTime = new Date(`${dateString}T${newFormData.endTime}`);
      const now = new Date();
      
      if (formData.status !== 'cancelled') {
        newFormData.status = bookingDateTime > now ? 'scheduled' : 'completed';
      }
    }

    setFormData(newFormData);
  };

  const handleStartTimeChange = (timeString: string) => {
    setFormData({
      ...formData,
      startTime: timeString,
    });
  };

  const handleEndTimeChange = (timeString: string) => {
    const newFormData = {
      ...formData,
      endTime: timeString,
    };

    // Auto-calculate status
    if (newFormData.date && timeString) {
      const bookingDateTime = new Date(`${newFormData.date}T${timeString}`);
      const now = new Date();
      
      if (formData.status !== 'cancelled') {
        newFormData.status = bookingDateTime > now ? 'scheduled' : 'completed';
      }
    }

    setFormData(newFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {booking ? 'Edit Booking' : 'Tambah Booking'}
      </h2>
      
      <div>
        <label htmlFor="tutorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nama Tutor:
        </label>
        <select
          id="tutorName"
          name="tutorName"
          value={formData.tutorName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          required
        >
          <option value="">-- Select Tutor --</option>
          {tutors
            .filter(tutor => tutor.status === 'active')
            .map((tutor) => (
              <option key={tutor.id} value={tutor.name}>
                {tutor.name} - {tutor.subject}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nama Siswa:
        </label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Enter student name"
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tanggal:
        </label>
        <DatePicker
          value={formData.date}
          onChange={handleDateChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Time:
          </label>
          <TimePicker
            value={formData.startTime}
            onChange={handleStartTimeChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            End Time:
          </label>
          <TimePicker
            value={formData.endTime}
            onChange={handleEndTimeChange}
            minTime={formData.startTime}
            required
          />
          {formData.startTime && formData.endTime && formData.endTime <= formData.startTime && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">
              End time must be after start time
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status:
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          required
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Auto-filled based on date/time, but you can change it manually
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={handleSuccessClose}
        message={successModal.message}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        message={errorModal.message}
        error={errorModal.error}
      />
    </form>
  );
};

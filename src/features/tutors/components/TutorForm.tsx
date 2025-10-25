import React, { useState, useEffect } from 'react';
import { useTutorStore } from '../store/tutorStore';
import { Input, SuccessModal, ErrorModal } from '../../../shared/components';
import { SelectField } from './SelectField';
import type { Tutor } from '../types';

interface TutorFormProps {
  tutor?: Tutor;
  onSuccess?: () => void;
}

export const TutorForm: React.FC<TutorFormProps> = ({ tutor, onSuccess }) => {
  const { addTutor, updateTutor, loading } = useTutorStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    hourlyRate: 0,
    status: 'active' as 'active' | 'inactive',
  });

  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string; error?: string }>({
    isOpen: false,
    message: '',
  });

  useEffect(() => {
    if (tutor) {
      setFormData({
        name: tutor.name,
        email: tutor.email,
        subject: tutor.subject,
        hourlyRate: tutor.hourlyRate,
        status: tutor.status,
      });
    }
  }, [tutor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tutor?.id) {
        await updateTutor(tutor.id, formData);
        setSuccessModal({
          isOpen: true,
          message: `${formData.name} has been successfully updated.`,
        });
      } else {
        await addTutor(formData);
        setSuccessModal({
          isOpen: true,
          message: `${formData.name} has been successfully added as a tutor.`,
        });
      }
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: tutor ? 'Failed to update tutor. Please try again.' : 'Failed to add tutor. Please try again.',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleSuccessClose = () => {
    setSuccessModal({ isOpen: false, message: '' });
    onSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'hourlyRate' ? Number(value) : value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {tutor ? 'Edit Tutor' : 'Tambah Tutor'}
      </h2>
      
      <Input
        type="text"
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter tutor name"
        required
      />

      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        placeholder="tutor@example.com"
        required
      />

      <Input
        type="text"
        id="subject"
        name="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="e.g. Mathematics, Physics"
        required
      />

      <Input
        type="number"
        id="hourlyRate"
        name="hourlyRate"
        label="Hourly Rate (Rp)"
        value={formData.hourlyRate}
        onChange={handleChange}
        min="0"
        step="1000"
        placeholder="e.g. 100000"
        required
      />

      <SelectField
        id="status"
        name="status"
        label="Status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </SelectField>

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

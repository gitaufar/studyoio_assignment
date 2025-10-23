import React, { useState, useEffect } from 'react';
import { useTutorStore } from '../store/tutorStore';
import { InputField } from './InputField';
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
      } else {
        await addTutor(formData);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Error saving tutor:', error);
    }
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
      
      <InputField
        type="text"
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter tutor name"
        required
      />

      <InputField
        type="email"
        id="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        placeholder="tutor@example.com"
        required
      />

      <InputField
        type="text"
        id="subject"
        name="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="e.g. Mathematics, Physics"
        required
      />

      <InputField
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
    </form>
  );
};

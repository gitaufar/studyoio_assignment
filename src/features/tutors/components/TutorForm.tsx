import React, { useState, useEffect } from 'react';
import { useTutorStore } from '../store/tutorStore';
import type { Tutor } from '../types';

interface TutorFormProps {
  tutor?: Tutor;
  onSuccess?: () => void;
}

export const TutorForm: React.FC<TutorFormProps> = ({ tutor, onSuccess }) => {
  const { addTutor, updateTutor, loading } = useTutorStore();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    if (tutor) {
      setFormData({
        name: tutor.name,
        subject: tutor.subject,
        email: tutor.email,
        phone: tutor.phone,
        bio: tutor.bio || '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="tutor-form">
      <h2>{tutor ? 'Edit Tutor' : 'Tambah Tutor'}</h2>
      
      <div>
        <label htmlFor="name">Nama:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="subject">Mata Pelajaran:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Telepon:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
};

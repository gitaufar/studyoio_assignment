import React, { useEffect, useState } from 'react';
import { useTutorStore } from '../store/tutorStore';
import { TutorForm } from '../components/TutorForm';
import type { Tutor } from '../types';
import { Modal, Table } from '../../../shared/components';

export const TutorsPage: React.FC = () => {
  const { tutors, loading, fetchTutors, deleteTutor } = useTutorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | undefined>();

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleEdit = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTutor(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus tutor ini?')) {
      await deleteTutor(id);
    }
  };

  const columns = [
    { key: 'name', label: 'Nama' },
    { key: 'subject', label: 'Mata Pelajaran' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telepon' },
  ];

  return (
    <div className="tutors-page">
      <h1>Daftar Tutor</h1>
      <button onClick={handleAdd}>Tambah Tutor</button>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          data={tutors}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TutorForm
          tutor={selectedTutor}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchTutors();
          }}
        />
      </Modal>
    </div>
  );
};

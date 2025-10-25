import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTutorStore } from '../store/tutorStore';
import { TutorForm } from '../components/TutorForm';
import type { Tutor } from '../types';
import { 
  Modal, 
  Table, 
  SkeletonTable, 
  Pagination,
  ConfirmationModal,
  SuccessModal,
  ErrorModal,
} from '../../../shared/components';
import { usePagination } from '../../../shared/hooks/usePagination';

export const TutorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Remove fetchTutors - data now comes from real-time subscription in App.tsx
  const { tutors, loading, deleteTutor } = useTutorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | undefined>();
  
  // Modal states
  const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; tutorId?: string; tutorName?: string }>({
    isOpen: false,
  });
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string; error?: string }>({
    isOpen: false,
    message: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);
  
  const searchQuery = searchParams.get('search') || '';
  const statusFilter = (searchParams.get('status') || 'all') as 'all' | 'active' | 'inactive';

  // No need to fetch - data is already syncing via useFirebaseSync in App.tsx

  const handleEdit = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTutor(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const tutor = tutors.find(t => t.id === id);
    setConfirmDelete({ 
      isOpen: true, 
      tutorId: id,
      tutorName: tutor?.name || 'this tutor',
    });
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete.tutorId) return;
    
    setIsDeleting(true);
    try {
      await deleteTutor(confirmDelete.tutorId);
      setConfirmDelete({ isOpen: false });
      setSuccessModal({
        isOpen: true,
        message: `${confirmDelete.tutorName} has been successfully deleted.`,
      });
    } catch (error) {
      setConfirmDelete({ isOpen: false });
      setErrorModal({
        isOpen: true,
        message: 'Failed to delete tutor. Please try again.',
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
  };

  const handleStatusFilterChange = (value: 'all' | 'active' | 'inactive') => {
    const params = new URLSearchParams(searchParams);
    
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    
    setSearchParams(params);
  };

  // Filter and search tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter(tutor => {
      const matchesSearch = 
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || tutor.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [tutors, searchQuery, statusFilter]);

  // Pagination
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    goToPage,
    setItemsPerPage,
  } = usePagination({
    data: filteredTutors,
    initialItemsPerPage: 10,
  });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    { 
      key: 'hourlyRate', 
      label: 'Hourly Rate',
      render: (value: number) => `Rp ${value.toLocaleString('id-ID')}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tutors</h1>
        <button 
          onClick={handleAdd}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-md flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Tutor</span>
        </button>
      </div>

      {/* Top Toolbar: Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter by Status */}
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
          className="px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      {loading ? (
        <SkeletonTable rows={5} columns={5} />
      ) : (
        <>
          <Table
            data={paginatedData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyMessage="No tutors yet — click Add Tutor."
          />
          
          {filteredTutors.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTutors.length}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TutorForm
          tutor={selectedTutor}
          onSuccess={() => {
            setIsModalOpen(false);
            // No need to manually fetch - real-time sync handles it
          }}
        />
      </Modal>

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false })}
        onConfirm={confirmDeleteAction}
        title="Delete Tutor"
        message={`Are you sure you want to delete "${confirmDelete.tutorName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={isDeleting}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: '' })}
        message={successModal.message}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        message={errorModal.message}
        error={errorModal.error}
      />
    </div>
  );
};

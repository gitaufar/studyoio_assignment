import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTutorStore } from "../store/tutorStore";
import { useNetworkStatus } from "../../../shared/hooks/useNetworkStatus";
import {
  TutorForm,
  TutorsHeader,
  TutorsFilter,
  TutorsTable,
} from "../components";
import type { Tutor } from "../types";
import {
  Modal,
  Pagination,
  ConfirmationModal,
  SuccessModal,
  ErrorModal,
} from "../../../shared/components";
import { usePagination } from "../../../shared/hooks/usePagination";

export const TutorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tutors, loading, deleteTutor, subscribeTutors } = useTutorStore();
  const { isOnline } = useNetworkStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | undefined>();

  // Ensure subscription is active when component mounts
  useEffect(() => {
    subscribeTutors();
  }, [subscribeTutors]);

  // Modal states
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    tutorId?: string;
    tutorName?: string;
  }>({
    isOpen: false,
  });
  const [confirmBulkDelete, setConfirmBulkDelete] = useState<{
    isOpen: boolean;
    ids: string[];
  }>({
    isOpen: false,
    ids: [],
  });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
    error?: string;
  }>({
    isOpen: false,
    message: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const statusFilter = (searchParams.get("status") || "all") as
    | "all"
    | "active"
    | "inactive";
  
  // Get pagination params from URL
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const limitFromUrl = parseInt(searchParams.get("limit") || "10", 10);

  // No need to fetch - data is already syncing via useFirebaseSync in App.tsx

  const handleEdit = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTutor(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const tutor = tutors.find((t) => t.id === id);
    setConfirmDelete({
      isOpen: true,
      tutorId: id,
      tutorName: tutor?.name || "this tutor",
    });
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete.tutorId) return;

    // Check internet connection first
    if (!isOnline) {
      setConfirmDelete({ isOpen: false });
      setErrorModal({
        isOpen: true,
        message:
          "You are currently offline. Please check your internet connection and try again.",
        error: "No internet connection",
      });
      return;
    }

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
        message: "Failed to delete tutor. Please try again.",
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = (ids: string[]) => {
    setConfirmBulkDelete({
      isOpen: true,
      ids,
    });
  };

  const confirmBulkDeleteAction = async () => {
    if (confirmBulkDelete.ids.length === 0) return;

    // Check internet connection first
    if (!isOnline) {
      setConfirmBulkDelete({ isOpen: false, ids: [] });
      setErrorModal({
        isOpen: true,
        message:
          "You are currently offline. Please check your internet connection and try again.",
        error: "No internet connection",
      });
      return;
    }

    setIsDeleting(true);
    const count = confirmBulkDelete.ids.length;
    
    try {
      // Delete all tutors sequentially
      await Promise.all(
        confirmBulkDelete.ids.map(id => deleteTutor(id))
      );
      
      setConfirmBulkDelete({ isOpen: false, ids: [] });
      setSuccessModal({
        isOpen: true,
        message: `${count} tutor${count > 1 ? 's' : ''} berhasil dihapus.`,
      });
    } catch (error) {
      setConfirmBulkDelete({ isOpen: false, ids: [] });
      setErrorModal({
        isOpen: true,
        message: "Gagal menghapus tutor. Silakan coba lagi.",
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const handleStatusFilterChange = (value: "all" | "active" | "inactive") => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    setSearchParams(params);
  };

  // Filter and search tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || tutor.status === statusFilter;

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
    initialItemsPerPage: limitFromUrl,
    initialPage: pageFromUrl,
  });

  // Update URL when pagination changes
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
    goToPage(page);
  };

  const handleItemsPerPageChange = (limit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", limit.toString());
    params.set("page", "1"); // Reset to page 1 when changing items per page
    setSearchParams(params);
    setItemsPerPage(limit);
  };

  return (
    <div>
      <TutorsHeader onAddTutor={handleAdd} />

      <TutorsFilter
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusFilterChange}
        resultCount={filteredTutors.length}
      />
      
      <div className="flex flex-col gap-4">
        <TutorsTable
          tutors={paginatedData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBulkDelete={handleBulkDelete}
        />

        {!loading && filteredTutors.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredTutors.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>

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

      {/* Confirmation Modal for Bulk Delete */}
      <ConfirmationModal
        isOpen={confirmBulkDelete.isOpen}
        onClose={() => setConfirmBulkDelete({ isOpen: false, ids: [] })}
        onConfirm={confirmBulkDeleteAction}
        title="Hapus Banyak Tutor"
        message={`Anda yakin ingin menghapus ${confirmBulkDelete.ids.length} tutor yang dipilih? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus Semua"
        cancelText="Batal"
        type="danger"
        loading={isDeleting}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: "" })}
        message={successModal.message}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
        error={errorModal.error}
      />
    </div>
  );
};

import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import { useNetworkStatus } from "../../../shared/hooks/useNetworkStatus";
import {
  BookingForm,
  BookingsHeader,
  BookingsFilter,
  BookingsTable,
} from "../components";
import type { Booking } from "../types";
import {
  Modal,
  Pagination,
  ConfirmationModal,
  SuccessModal,
  ErrorModal,
} from "../../../shared/components";
import { usePagination } from "../../../shared/hooks/usePagination";

export const BookingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Remove fetchBookings - data now comes from real-time subscription in App.tsx
  const { bookings, loading, deleteBooking } = useBookingStore();
  const { isOnline } = useNetworkStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>();

  // Modal states
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    bookingId: string;
    tutorName: string;
  }>({ isOpen: false, bookingId: "", tutorName: "" });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
    error?: string;
  }>({ isOpen: false, message: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const rangeFilter = searchParams.get("range");
  const statusFilter = (searchParams.get("status") || "all") as
    | "all"
    | "scheduled"
    | "completed"
    | "cancelled";

  // No need to fetch - data is already syncing via useFirebaseSync in App.tsx

  const filteredBookings = useMemo(() => {
    let result = bookings;

    // Apply range filter (next 3 days)
    if (rangeFilter === "next3d") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const threeDaysLater = new Date(today);
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);

      result = result.filter((booking) => {
        if (booking.status !== "scheduled" || !booking.date) return false;

        const bookingDate = new Date(booking.date + "T00:00:00");
        return bookingDate >= today && bookingDate <= threeDaysLater;
      });
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    return result;
  }, [bookings, statusFilter, rangeFilter]);

  // Pagination
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    goToPage,
    setItemsPerPage,
  } = usePagination({
    data: filteredBookings,
    initialItemsPerPage: 10,
  });

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedBooking(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;

    setConfirmDelete({
      isOpen: true,
      bookingId: id,
      tutorName: booking.tutorName,
    });
  };

  const confirmDeleteAction = async () => {
    // Check internet connection first
    if (!isOnline) {
      setConfirmDelete({ isOpen: false, bookingId: "", tutorName: "" });
      setErrorModal({
        isOpen: true,
        message:
          "Anda sedang offline. Silakan periksa koneksi internet Anda dan coba lagi.",
        error: "No internet connection",
      });
      return;
    }

    setIsDeleting(true);
    try {
      await deleteBooking(confirmDelete.bookingId);
      setConfirmDelete({ isOpen: false, bookingId: "", tutorName: "" });
      setSuccessModal({
        isOpen: true,
        message: `Booking dengan ${confirmDelete.tutorName} berhasil dihapus.`,
      });
    } catch (error: any) {
      setConfirmDelete({ isOpen: false, bookingId: "", tutorName: "" });
      setErrorModal({
        isOpen: true,
        message: "Gagal menghapus booking",
        error: error?.message || "Unknown error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusFilterChange = (
    newStatus: "all" | "scheduled" | "completed" | "cancelled"
  ) => {
    const params = new URLSearchParams(searchParams);

    if (newStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }

    setSearchParams(params);
  };

  return (
    <div>
      <BookingsHeader onAddBooking={handleAdd} />

      <BookingsFilter
        statusFilter={statusFilter}
        onFilterChange={handleStatusFilterChange}
        resultCount={filteredBookings.length}
      />

      <div className="flex flex-col gap-2">
        <BookingsTable
          bookings={paginatedData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {!loading && filteredBookings.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredBookings.length}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BookingForm
          booking={selectedBooking}
          onSuccess={() => {
            setIsModalOpen(false);
            // No need to manually fetch - real-time sync handles it
          }}
        />
      </Modal>

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={confirmDelete.isOpen}
        onClose={() =>
          setConfirmDelete({ isOpen: false, bookingId: "", tutorName: "" })
        }
        onConfirm={confirmDeleteAction}
        title="Hapus Booking?"
        message={`Apakah Anda yakin ingin menghapus booking dengan ${confirmDelete.tutorName}? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
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

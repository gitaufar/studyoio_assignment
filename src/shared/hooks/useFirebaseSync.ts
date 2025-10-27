import { useEffect } from 'react';
import { useTutorStore } from '../../features/tutors/store/tutorStore';
import { useBookingStore } from '../../features/bookings/store/bookingStore';
import { useUserContext } from '../stores/userContext';


export const useFirebaseSync = () => {
  const { user } = useUserContext();

  useEffect(() => {
    // Only subscribe when user is logged in
    if (!user) {
      return;
    }

    // Get store methods directly
    const { subscribeTutors, unsubscribeTutors } = useTutorStore.getState();
    const { subscribeBookings, unsubscribeBookings } = useBookingStore.getState();

    // Start subscriptions
    subscribeTutors();
    subscribeBookings();

    // Cleanup on unmount or when user changes
    return () => {
      unsubscribeTutors();
      unsubscribeBookings();
    };
  }, [user]); // Re-subscribe when user changes

  return null;
};

import { useEffect } from 'react';
import { useTutorStore } from '../../features/tutors/store/tutorStore';
import { useBookingStore } from '../../features/bookings/store/bookingStore';

/**
 * Global hook to initialize Firebase real-time subscriptions
 * Call this once in your App.tsx or root layout
 * 
 * This will:
 * 1. Subscribe to Firestore collections (tutors, bookings)
 * 2. Automatically sync data in real-time
 * 3. Use IndexedDB cache when offline
 * 4. Clean up subscriptions on unmount
 */
export const useFirebaseSync = () => {
  const subscribeTutors = useTutorStore((state) => state.subscribeTutors);
  const unsubscribeTutors = useTutorStore((state) => state.unsubscribeTutors);
  
  const subscribeBookings = useBookingStore((state) => state.subscribeBookings);
  const unsubscribeBookings = useBookingStore((state) => state.unsubscribeBookings);

  useEffect(() => {
    console.log('🔥 Initializing Firebase real-time sync...');
    
    // Start subscriptions
    subscribeTutors();
    subscribeBookings();

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up Firebase subscriptions...');
      unsubscribeTutors();
      unsubscribeBookings();
    };
  }, []); // Empty dependency array - run once on mount

  return null;
};

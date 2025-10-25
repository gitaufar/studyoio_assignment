import { useEffect } from 'react';
import { useTutorStore } from '../../features/tutors/store/tutorStore';
import { useBookingStore } from '../../features/bookings/store/bookingStore';


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

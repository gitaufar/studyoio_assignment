import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import type { DashboardStats } from '../types';

export const dashboardService = {
  subscribeToStats(callback: (stats: DashboardStats) => void): () => void {
    // Subscribe to tutors collection
    const unsubscribeTutors = onSnapshot(collection(db, 'tutors'), (tutorsSnapshot) => {
      const tutors = tutorsSnapshot.docs.map(doc => doc.data());
      
      const totalTutors = tutors.length;
      const activeTutors = tutors.filter((t: any) => t.status === 'active').length;
      const inactiveTutors = tutors.filter((t: any) => t.status === 'inactive').length;

      // Subscribe to bookings collection
      const unsubscribeBookings = onSnapshot(collection(db, 'bookings'), (bookingsSnapshot) => {
        const bookings = bookingsSnapshot.docs.map(doc => doc.data());
        
        const totalBookings = bookings.length;
        const scheduledBookings = bookings.filter((b: any) => b.status === 'scheduled').length;
        const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;
        const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled').length;

        callback({
          totalTutors,
          activeTutors,
          inactiveTutors,
          totalBookings,
          scheduledBookings,
          completedBookings,
          cancelledBookings,
        });
      });

      // Return cleanup function for bookings subscription
      return unsubscribeBookings;
    });

    // Return cleanup function that unsubscribes from both
    return unsubscribeTutors;
  },
};

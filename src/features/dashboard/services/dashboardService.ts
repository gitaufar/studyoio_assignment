import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import type { DashboardStats, WeeklyBookingData, TutorBySubjectData } from '../types';

// Color palette for pie chart
const COLORS = [
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FF9800', // Orange
  '#9C27B0', // Purple
  '#F44336', // Red
  '#00BCD4', // Cyan
  '#FFC107', // Amber
  '#E91E63', // Pink
  '#3F51B5', // Indigo
  '#8BC34A', // Light Green
];

export const dashboardService = {
  subscribeToStats(
    onStatsUpdate: (stats: DashboardStats) => void,
    onWeeklyDataUpdate: (weeklyData: WeeklyBookingData[]) => void,
    onTutorSubjectUpdate: (tutorSubjectData: TutorBySubjectData[]) => void
  ): () => void {
    // Subscribe to tutors collection
    const unsubscribeTutors = onSnapshot(collection(db, 'tutors'), (tutorsSnapshot) => {
      const tutors = tutorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const totalTutors = tutors.length;
      const activeTutors = tutors.filter((t: any) => t.status === 'active').length;
      const inactiveTutors = tutors.filter((t: any) => t.status === 'inactive').length;

      // Calculate tutors by subject
      const tutorsBySubject = calculateTutorsBySubject(tutors);
      onTutorSubjectUpdate(tutorsBySubject);

      // Subscribe to bookings collection
      const unsubscribeBookings = onSnapshot(collection(db, 'bookings'), (bookingsSnapshot) => {
        const bookings = bookingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const totalBookings = bookings.length;
        const scheduledBookings = bookings.filter((b: any) => b.status === 'scheduled').length;
        const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;
        const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled').length;

        // Calculate upcoming sessions (next 3 days)
        const upcomingSessions = calculateUpcomingSessions(bookings);

        onStatsUpdate({
          totalTutors,
          activeTutors,
          inactiveTutors,
          totalBookings,
          scheduledBookings,
          completedBookings,
          cancelledBookings,
          upcomingSessions,
        });

        // Calculate weekly booking data (last 7 days)
        const weeklyData = calculateWeeklyBookings(bookings);
        onWeeklyDataUpdate(weeklyData);
      });

      // Return cleanup function for bookings subscription
      return unsubscribeBookings;
    });

    // Return cleanup function that unsubscribes from both
    return unsubscribeTutors;
  },
};

function calculateWeeklyBookings(bookings: any[]): WeeklyBookingData[] {
  const today = new Date();
  const weekData: WeeklyBookingData[] = [];
  
  // Generate last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Get day name
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Filter bookings for this day
    const dayBookings = bookings.filter((b: any) => {
      if (!b.date) return false;
      return b.date === dateString;
    });
    
    weekData.push({
      day: dayName,
      scheduled: dayBookings.filter((b: any) => b.status === 'scheduled').length,
      completed: dayBookings.filter((b: any) => b.status === 'completed').length,
      cancelled: dayBookings.filter((b: any) => b.status === 'cancelled').length,
    });
  }
  
  return weekData;
}

function calculateTutorsBySubject(tutors: any[]): TutorBySubjectData[] {
  // Group tutors by subject
  const subjectMap: Record<string, number> = {};
  
  tutors.forEach((tutor: any) => {
    if (tutor.subject && tutor.status === 'active') {
      const subject = tutor.subject.trim();
      subjectMap[subject] = (subjectMap[subject] || 0) + 1;
    }
  });
  
  // Convert to array and add colors
  const subjectData: TutorBySubjectData[] = Object.entries(subjectMap)
    .map(([subject, count], index) => ({
      subject,
      count,
      fill: COLORS[index % COLORS.length],
    }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
  
  return subjectData;
}

function calculateUpcomingSessions(bookings: any[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  
  const upcomingCount = bookings.filter((booking: any) => {
    if (booking.status !== 'scheduled' || !booking.date) return false;
    
    const bookingDate = new Date(booking.date + 'T00:00:00');
    return bookingDate >= today && bookingDate <= threeDaysLater;
  }).length;
  
  return upcomingCount;
}

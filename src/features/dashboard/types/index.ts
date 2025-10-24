export interface DashboardStats {
  totalTutors: number;
  activeTutors: number;
  inactiveTutors: number;
  totalBookings: number;
  scheduledBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  upcomingSessions: number; // Next 3 days
}

export interface WeeklyBookingData {
  day: string;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export interface TutorBySubjectData {
  subject: string;
  count: number;
  fill: string;
}

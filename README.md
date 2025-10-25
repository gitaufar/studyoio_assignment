# 📚 StudyOIO — Admin Dashboard

> A modern, responsive admin panel for managing tutors and bookings in a private tutoring platform, built with React, TypeScript, and Firebase.

---

## 📋 Overview

This project was developed as a **frontend internship assignment** to demonstrate proficiency in React, TypeScript, state management, and Firebase integration. The dashboard enables administrators to manage **tutors**, **bookings**, and view **real-time analytics** through an intuitive interface.

**Core Modules:**
- 🧑‍🏫 **Tutors Management** — Create, update, delete, and filter tutors
- 📅 **Bookings Management** — Schedule, track, and manage student sessions
- 📊 **Dashboard Analytics** — View statistics, charts, and upcoming sessions

---

## ✨ Features

- 🔐 **Firebase Authentication** — Secure login/register with email & password
- 🗂️ **Full CRUD Operations** — Manage tutors and bookings with real-time Firestore sync
- 📈 **Interactive Dashboard** — Charts (weekly bookings, tutors by subject) using Recharts
- 🎨 **Dark Mode Support** — Toggle between light and dark themes
- 📱 **Responsive Design** — Mobile-first UI with TailwindCSS
- 🔍 **Search & Filters** — Filter by status, search by name/email, pagination support
- 🚀 **URL State Persistence** — Pagination and filters stored in URL query params
- ⚡ **Optimized Performance** — Zustand for state management, Firebase onSnapshot for real-time updates

---

## 🛠️ Tech Stack

| Category               | Tools                                      |
|------------------------|--------------------------------------------|
| **Frontend**           | React 19.1.1 + TypeScript 5.9.3           |
| **Build Tool**         | Vite 7.1.7                                |
| **Styling**            | TailwindCSS 4.1.15                        |
| **State Management**   | Zustand 5.0.8 + Context API               |
| **Backend**            | Firebase 12.4.0 (Auth + Firestore)        |
| **Routing**            | React Router 7.9.4                        |
| **UI Components**      | Material UI (Date/Time Pickers)           |
| **Charts**             | Recharts 3.3.0                            |
| **Date Handling**      | Day.js 1.11.18                            |

---

## 📁 Project Structure

```
src/
├── core/
│   ├── layouts/
│   │   └── DashboardLayout.tsx        # Main layout with sidebar
│   └── routes/
│       ├── AppRoutes.tsx              # Route configuration
│       ├── ProtectedRoute.tsx         # Auth guard
│       ├── PublicRoute.tsx            # Guest routes
│       └── RootRedirect.tsx           # Root redirect logic
│
├── features/
│   ├── auth/
│   │   ├── pages/                     # Login, Register
│   │   ├── hooks/                     # useAuth
│   │   ├── services/                  # authService (Firebase)
│   │   └── components/                # PasswordInput, ErrorAlert
│   │
│   ├── dashboard/
│   │   ├── pages/                     # DashboardPage
│   │   ├── components/                # StatCards, Charts
│   │   ├── hooks/                     # useDashboard
│   │   └── services/                  # dashboardService
│   │
│   ├── tutors/
│   │   ├── pages/                     # TutorsPage
│   │   ├── components/                # TutorForm, TutorsTable
│   │   ├── store/                     # tutorStore (Zustand)
│   │   ├── services/                  # tutorService (Firestore)
│   │   └── types/                     # Tutor types
│   │
│   └── bookings/
│       ├── pages/                     # BookingsPage
│       ├── components/                # BookingForm, BookingsTable
│       ├── store/                     # bookingStore (Zustand)
│       ├── services/                  # bookingService (Firestore)
│       └── types/                     # Booking types
│
├── shared/
│   ├── components/                    # Table, Modal, Sidebar, AppBar, etc.
│   ├── hooks/                         # usePagination, useFirebaseSync
│   ├── services/
│   │   └── firebase.ts                # Firebase config
│   └── stores/
│       ├── userContext.tsx            # User auth state
│       └── themeContext.tsx           # Dark mode state
│
├── App.tsx
└── main.tsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/gitaufar/studyoio_assignment.git
cd studyoio_assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```
Access the app at **http://localhost:5173**

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎬 Demo

[📹 Watch Demo Video](https://your-demo-link-here)

---

## 👤 Author

**Zhafir Aufar**  
📧 zhafiraufar123@gmail.com  
🔗 [GitHub @gitaufar](https://github.com/gitaufar)

---

> *Clean UI, modular code, and real-time data — simplicity with clarity.*

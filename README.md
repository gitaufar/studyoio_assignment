# StudyOIO - Admin Panel

Admin Panel untuk manajemen tutor, booking, dan siswa pada platform EdTech interactive math learning.

## 🚀 Features

- ✅ **Authentication** - Login & Register dengan Firebase Auth
- ✅ **Dashboard** - Overview statistik dan metrics
- ✅ **Tutor Management** - CRUD operations untuk data tutor
- ✅ **Booking Management** - CRUD operations untuk data booking
- ✅ **Real-time Data** - Integrasi dengan Firebase Firestore
- ✅ **Responsive Design** - Mobile-friendly UI dengan TailwindCSS
- ✅ **State Management** - Menggunakan Zustand

## 🛠️ Tech Stack

- **Framework**: React.js 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Charts**: Recharts (optional)

## 📦 Installation

1. Clone repository ini:
```bash
git clone <repository-url>
cd studyoio
```

2. Install dependencies:
```bash
npm install
```

3. Setup Firebase configuration:
   - Copy file `.env.example` menjadi `.env`
   - Isi dengan kredensial Firebase Anda:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di `http://localhost:5173`

## 📁 Project Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── hooks/useAuth.ts
│   │   ├── types/index.ts
│   │   └── services/authService.ts
│   │
│   ├── tutors/
│   │   ├── pages/TutorsPage.tsx
│   │   ├── components/TutorForm.tsx
│   │   ├── store/tutorStore.ts
│   │   ├── services/tutorService.ts
│   │   └── types/index.ts
│   │
│   └── bookings/
│       ├── pages/BookingsPage.tsx
│       ├── components/BookingForm.tsx
│       ├── store/bookingStore.ts
│       ├── services/bookingService.ts
│       └── types/index.ts
│
├── shared/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── AppBar.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   └── useResponsive.ts
│   │
│   ├── services/firebase.ts
│   └── stores/userContext.tsx
│
├── App.tsx
└── main.tsx
```

## 🎯 Usage

### Login / Register
1. Buka halaman `/login` atau `/register`
2. Masukkan email dan password
3. Setelah berhasil, akan redirect ke `/dashboard`

### Manage Tutors
1. Navigasi ke `/tutors`
2. Klik "Tambah Tutor" untuk menambah data baru
3. Klik "Edit" untuk mengubah data
4. Klik "Hapus" untuk menghapus data

### Manage Bookings
1. Navigasi ke `/bookings`
2. Klik "Tambah Booking" untuk membuat booking baru
3. Isi form dengan data tutor, siswa, tanggal, dan waktu
4. Kelola status booking (pending, confirmed, completed, cancelled)

## 🔥 Firebase Setup

### 1. Buat Project Firebase
- Buka [Firebase Console](https://console.firebase.google.com)
- Klik "Add Project"
- Ikuti wizard setup

### 2. Enable Authentication
- Pilih Authentication → Sign-in method
- Enable "Email/Password"

### 3. Create Firestore Database
- Pilih Firestore Database
- Klik "Create Database"
- Pilih production mode atau test mode
- Pilih region terdekat

### 4. Firestore Collections
Buat collections berikut:

**tutors**
```
{
  name: string,
  email: string,
  subject: string,
  phone: string,
  bio: string,
  rating: number,
  createdAt: timestamp
}
```

**bookings**
```
{
  studentName: string,
  tutorName: string,
  subject: string,
  date: string,
  time: string,
  duration: number,
  status: string,
  notes: string,
  createdAt: timestamp
}
```

## 🎨 Design Guidelines

- **Color Palette**:
  - Primary: `#4CAF50` (Green)
  - Secondary: `#2196F3` (Blue)
  - Background: `#F9FAFB` (Light Gray)
  
- **Typography**: Inter / Poppins
- **Spacing**: Consistent 16px padding
- **Border Radius**: 8-12px
- **Shadows**: Subtle elevation

## 📝 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 🤝 Contributing

Ini adalah project assignment untuk Web Developer Internship di EdTech.

## 📄 License

© 2025 StudyOIO - EdTech Platform

## 👨‍💻 Author

**[Your Name]**
- Email: [your.email@example.com]
- GitHub: [your-github-username]

---

**Assignment for**: EdTech Web Developer Internship  
**Submission**: studyosystemio@gmail.com

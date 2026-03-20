# Modern E-Commerce Full-Stack Application

Welcome to the production-level full-stack E-Commerce project. This application features a stunning modern UI, 3D animations, smooth transitions, and a scalable architecture.

## 📁 Folder Structure

```text
ecommerce-app
│
├── frontend               # Next.js (App Router), React, Tailwind CSS, Framer Motion, Three.js
│   ├── app                # Next.js App Router Pages
│   ├── components         # Reusable UI components
│   ├── hooks              # Custom React hooks
│   ├── context            # React Context API for state management
│   ├── animations         # Framer motion variants
│   ├── styles             # Global CSS
│
├── backend                # Node.js, Express.js
│   ├── controllers        # Route logic
│   ├── routes             # API endpoints definitions
│   ├── models             # Mongoose schemas
│   ├── middleware         # Express middleware (auth, error handling)
│   ├── config             # Configuration files (DB connection, etc.)
│
└── README.md
```

## 💻 Development Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or MongoDB Atlas)

### Setup the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Setup the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory and add the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Backend (Render / Heroku)
1. Push your code to GitHub.
2. Link your repository to Render.
3. Set the root directory to `backend`.
4. Set the Build Command to `npm install` and Start Command to `node server.js`.
5. Add the necessary Environment Variables (`MONGO_URI`, `JWT_SECRET`, etc.).

### Frontend (Vercel)
1. Push your code to GitHub.
2. Link your repository to Vercel.
3. Set the Root Directory to `frontend`.
4. Vercel will auto-detect Next.js and configure build settings.
5. Add `NEXT_PUBLIC_API_URL` to Vercel's Environment Variables (pointing to your deployed backend URL).

## ✨ Features Highlight
- **3D UI Animations:** Using React Three Fiber for interactive product showcase.
- **Framer Motion:** Smooth page transitions and element animations.
- **Modern UI:** Glassmorphism, tailored gradients, and sleek dark mode support.
- **Authentication:** Secure JWT role-based access.
- **Admin Dashboard:** Comprehensive product and order management.

# assesmentSDE1Aman

# RBAC Blog Application

## Project Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/amanad26/assesmentSDE1Aman.git
cd <repository-folder>
```

### 2. Backend Setup

#### 2.1 Install Dependencies
```bash
cd blog_app_backend
npm install
```

#### 2.2 Configure Environment Variables
- Create a new MongoDB database.
- Update the `.env` file with your new MongoDB connection string.

#### 2.3 Seed Initial Data
- To create the default Admin user and roles, run:
```bash
npm run seed
```

#### 2.4 Start the Backend Server
```bash
npm run dev
```

### 3. Frontend Setup

#### 3.1 Install Dependencies
```bash
cd blog_app_frontend
npm install
```

#### 3.2 Start the Frontend Server
```bash
npm run dev
```

---

## Notes
- The backend server typically runs on `http://localhost:5000` (or as configured).
- The frontend (React + Vite) runs on `http://localhost:5173`.
- Ensure your frontend API requests point to the correct backend URL.

---

Happy Coding! 🚀

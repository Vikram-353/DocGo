# DocGo — Doctor Appointment Booking

DocGo is a full-stack doctor appointment booking application with separate frontend, admin panel, and backend services. It allows patients to find doctors, book appointments, and pay online (Razorpay). The project is built with React + Vite (frontend & admin UI) and Node.js/Express + MongoDB (backend).

---

## 🚀 Features

- Browse doctors by speciality and view profiles
- Book appointment slots with doctors
- User, Doctor and Admin roles with separate dashboards
- Online payment integration using **Razorpay** (order creation + server-side verification)
- Image uploads via Cloudinary

---

## 📁 Project structure (top-level)

- `frontend/` — Public-facing React app (Vite)
- `adminPanel/` — Admin & doctor dashboard React app (Vite)
- `backend/` — Express API server (MongoDB models, controllers, routes)

---

## ⚙️ Quickstart (Local Development)

Prerequisites:
- Node.js (>=16) and npm
- MongoDB URI (Atlas or local)

Run backend:
```bash
cd backend
npm install
# create and configure .env (see below)
npm start
```

Run frontend:
```bash
cd frontend
npm install
# ensure VITE_BACKEND_URL is set in .env
npm start
```

Run admin panel:
```bash
cd adminPanel
npm install
npm start
```

---

## 🧩 Environment variables

Backend (`backend/.env`) — add or update:
```
MONGODB_URI="<your-mongo-uri>"
CLOUDINARY_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
JWT_SECRET="<jwt-secret>"
ADMIN_EMAIL="..."
ADMIN_PASSWORD="..."
RAZORPAY_KEY_ID="<your-razorpay-key-id>"
RAZORPAY_KEY_SECRET="<your-razorpay-key-secret>"
```

Frontend (`frontend/.env`) — add:
```
VITE_BACKEND_URL="http://localhost:5000" # or your backend URL
```



## 🔧 Notes & Next steps

- Add webhooks on the backend for asynchronous verification and reconciliation (see `backend/README_PAYMENT.md` for details). This ensures payments are reconciled even when events arrive after a checkout completes.
- Auto-trigger payment: the booking endpoint supports an `autoPay=true` flag. If you pass this flag, the backend will create a Razorpay order and return it in the booking response so the frontend can open the checkout immediately after booking.
- Optional improvements: add webhook logging, retry/reconciliation logic, and unit tests for payment endpoints.

---

## 📚 Useful files

- `backend/models/appointmentModel.js` — stores appointment data and payment details
- `backend/controllers/userController.js` — contains `createOrder` and `verifyPayment` handlers
- `frontend/src/pages/MyAppointment.jsx` — frontend payment integration and checkout handler

---
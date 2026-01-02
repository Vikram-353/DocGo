import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  createOrder,
  verifyPayment,
} from "../controllers/userController.js";
import authUser from "../midelware/authUser.js";
import upload from "../midelware/multer.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// Payment endpoints
userRouter.post("/create-order", authUser, createOrder);
userRouter.post("/verify-payment", authUser, verifyPayment);

export default userRouter;

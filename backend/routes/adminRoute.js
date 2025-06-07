import express from "express";
import {
  addDoctor,
  allDocotrs,
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  doctorProfileById,
} from "../controllers/adminController.js";

import upload from "../midelware/multer.js";
import authAdmin from "../midelware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/addDoctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDocotrs);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.get("/doctor-detail/:id", authAdmin, doctorProfileById);
export default adminRouter;

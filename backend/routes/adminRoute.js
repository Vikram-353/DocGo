import express from "express";
import { addDoctor, loginAdmin } from "../controllers/adminController.js";

import upload from "../midelware/multer.js";
import authAdmin from "../midelware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/addDoctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
export default adminRouter;

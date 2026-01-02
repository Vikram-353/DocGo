import express from "express";
import razorpayWebhook from "../controllers/webhookController.js";

const router = express.Router();

// Use raw body parser for webhook signature verification
router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

export default router;

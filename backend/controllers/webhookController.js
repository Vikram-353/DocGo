import crypto from "crypto";
import appointmentModel from "../models/appointmentModel.js";

// Razorpay webhook endpoint - uses raw body
const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const rawBody = req.body; // Buffer when using express.raw

    if (!secret) {
      console.error("RAZORPAY_WEBHOOK_SECRET not configured");
      return res.status(500).send("Webhook not configured");
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expected !== signature) {
      console.warn("Invalid webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(rawBody.toString());

    // Handle payment.captured events (and similar payment events)
    if (
      event.event === "payment.captured" ||
      event.event === "payment.authorized"
    ) {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      // Find appointment by stored orderId
      const appointment = await appointmentModel.findOne({
        "paymentDetails.orderId": orderId,
      });
      if (appointment && !appointment.payment) {
        await appointmentModel.findByIdAndUpdate(appointment._id, {
          payment: true,
          paymentDetails: {
            orderId,
            paymentId: payment.id,
            signature: "", // webhook doesn't include checkout signature
            method: payment.method,
            amount: payment.amount / 100,
            currency: payment.currency,
            paidAt: Date.now(),
          },
        });
        console.log(`Appointment ${appointment._id} marked paid via webhook`);
      }
    }

    // Acknowledge
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook handling failed", err);
    res.status(500).send("Server error");
  }
};

export default razorpayWebhook;

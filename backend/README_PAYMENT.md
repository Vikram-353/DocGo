Razorpay Integration (DocGo backend)

Overview
- The project supports online payments for appointments using Razorpay.
- Backend endpoints added:
  - POST /api/user/create-order (auth required) — creates a Razorpay order for an appointment
  - POST /api/user/verify-payment (auth required) — verifies Razorpay signature and marks appointment as paid
  - POST /api/webhook/razorpay — webhook endpoint for asynchronous payment events (no auth, verifies signature)

Environment
- Add the following to `backend/.env` (use your Razorpay test/live keys):

RAZORPAY_KEY_ID="<your_key_id>"
RAZORPAY_KEY_SECRET="<your_key_secret>"
RAZORPAY_WEBHOOK_SECRET="<your_webhook_secret>"

How it works (user flow)
1. Book an appointment from the frontend (the booking API may return `appointmentId` and `amount`).
2. Immediately after booking the frontend can request `autoPay=true` on booking and the backend will create a Razorpay order and return it to open checkout automatically.
3. Frontend opens Razorpay Checkout. After a completed payment, the checkout's handler will call `/api/user/verify-payment` to verify the signature server-side.
4. Additionally, Razorpay will send webhook events for payment updates. The server verifies the webhook signature using `RAZORPAY_WEBHOOK_SECRET` and reconciles payments by matching the order ID stored on appointments.

Testing
- Run backend and frontend locally.
- Ensure `backend/.env` has `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` set (test keys recommended).
- For webhook testing locally, use a tool like `ngrok` to expose your dev server and paste the public URL in Razorpay's webhook configuration.

Security
- Keep `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` secret and never commit them to source control.
- Webhook verification is HMAC SHA256 on the raw request body.

Notes
- The appointment document stores `paymentDetails.orderId` when an order is created; webhooks reconcile and mark appointments `payment: true` when a successful payment event is received.

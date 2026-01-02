import React, { useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import axios from "axios";
import Contact from "./Contact";

function MyAppointment() {
  const { backendUrl, token, getDoctorData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const calcelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existing = document.querySelector(
        "script[src='https://checkout.razorpay.com/v1/checkout.js']"
      );
      if (existing) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payOnline = async (appointmentId, amount) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/create-order`,
        { appointmentId },
        { headers: { token } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const { order, key } = data;

      const ok = await loadRazorpayScript();
      if (!ok) {
        toast.error("Razorpay SDK failed to load. Check your connection.");
        return;
      }

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "DocGo",
        description: "Appointment Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${backendUrl}/api/user/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                appointmentId,
              },
              { headers: { token } }
            );
            if (verifyRes.data.success) {
              toast.success("Payment successful");
              getUserAppointments();
              getDoctorData();
            } else {
              toast.error(
                verifyRes.data.message || "Payment verification failed"
              );
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
          }
        },
        prefill: {},
        theme: { color: "#3b82f6" },
      };

      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const months = [
    "",
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-1 mt-12 font-medium text-zinc-700 border-b ">
        My Appointment
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xm mt-1">
                Date And Time :{" "}
                <span className="text-sm text-neutral-700 font-medium">
                  {slotDateFormate(item.slotDate)}| {item.slotTime}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => calcelAppointment(item._id)}
                  className="text-sm hover:bg-red-500 hover:text-white transition-all duration-300 text-stone-500 text-center sm:min-w-48 py-2 border rounded"
                >
                  Cancle Appointment
                </button>
              )}

              {!item.cancelled && !item.isCompleted && !item.payment && (
                <button
                  onClick={() => payOnline(item._id, item.amount)}
                  className="text-sm hover:bg-primary hover:text-white transition-all duration-300 text-stone-500 text-center sm:min-w-48 py-2 border rounded"
                >
                  Pay Online
                </button>
              )}

              {item.payment && (
                <button className="sm:min-w-48 py-2 border border-green-200 text-green-500">
                  Paid
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}

              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-200 text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment;

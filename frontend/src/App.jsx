import React from "react";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";

import { Routes, Route } from "react-router-dom";
import {
  Doctors,
  Appointment,
  About,
  Login,
  Contact,
  MyAppointment,
  MyProfile,
  Navbar,
  Footer,
} from "./utility";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointments/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./component/Navbar";
function App() {
  const { atoken } = useContext(AdminContext) || {};

  return atoken ? (
    <div className="bg-[#F8F9FD)]">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;

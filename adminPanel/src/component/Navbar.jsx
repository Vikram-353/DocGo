import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/doctorContext.jsx";

function Navbar() {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
    dtoken && setDToken("");
    dtoken && localStorage.removeItem("dtoken");
  };

  return (
    <div className="flex justify-between items-center p-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout} // Fixed: Removed the parentheses
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;

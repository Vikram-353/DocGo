import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/doctorContext";

function SideBar() {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r p-4">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img
              src={assets.home_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img
              src={assets.appointment_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Appointment</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/addDoctor"}
          >
            <img
              src={assets.add_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img
              src={assets.people_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Doctors list</p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img
              src={assets.home_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            <img
              src={assets.appointment_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Appointment</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img
              src={assets.people_icon}
              alt=""
              className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem]"
            />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default SideBar;

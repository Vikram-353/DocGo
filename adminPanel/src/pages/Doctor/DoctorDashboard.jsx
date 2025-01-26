import React, { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContex";

function DoctorDashboard() {
  const {
    dtoken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currencySymbol, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="items-center flex gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currencySymbol}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="items-center flex gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointment</p>
            </div>
          </div>
          <div className="items-center flex gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>{" "}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>
          <div className="pt-4 border border-t-0 ">
            {Array.isArray(dashData?.latestAppointments) &&
            dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item.userData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormate(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 cursor-pointer "
                        src={assets.tick_icon}
                        alt=""
                      />
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer "
                        src={assets.cancel_icon}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">
                No appointments available
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorDashboard;

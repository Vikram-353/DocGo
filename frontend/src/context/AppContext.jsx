import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  useEffect(() => {
    if (token) {
      if (token) {
        loadUserProfileData();
      } else {
        setUserData(false);
      }
    }
  }, [token]);

  const value = {
    doctors,
    token,
    setToken,
    currencySymbol,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

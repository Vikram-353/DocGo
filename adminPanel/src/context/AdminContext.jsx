import { createContext, useState } from "react";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState("");
  const value = {};
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

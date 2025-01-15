import React, { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const value = {
    message: "Hello from Context!", // Example value
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

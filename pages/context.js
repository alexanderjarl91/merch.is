import React, { useState } from "react";
import { auth } from "./firebase";

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  //testfunc
  const [user, setUser] = useState({
    username: "alex",
    email: "alexander@alexander.is",
  });

  return (
    <UsersContext.Provider value={{ user }}>{children}</UsersContext.Provider>
  );
};

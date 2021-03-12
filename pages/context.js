import React, { useState } from "react";

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "alex",
    email: "alexander@alexander.is",
  });

  return (
    <UsersContext.Provider value={{ user }}>{children}</UsersContext.Provider>
  );
};

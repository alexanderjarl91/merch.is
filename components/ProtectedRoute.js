import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "../pages/context";

//protected route component
// put component or page through this function, render it if it passes.
const ProtectedRoute = (dashboard) => {
  const { users, currentUser } = useContext(UsersContext);
  const [userLogged, setUserLogged] = useState();
  const router = useRouter();

  useEffect(() => {
    setUserLogged(!currentUser);
  }, [users]);

  if (userLogged === true) {
    return dashboard;
  } else if (userLogged === false) {
    router.push("/");
    return;
  } else {
    return null;
  }
};

export default ProtectedRoute;

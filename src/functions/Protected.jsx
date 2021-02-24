import React, { cloneElement, useEffect, useState } from "react";
import { getFunction } from "./CRUDFunction";

const Protected = (props) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const user = await getFunction("users/me");
    if (user && user._id) {
      setUser(user);
    } else {
      window.location.replace("/");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return <>{user && cloneElement(props.children, { user })}</>;
};

export default Protected;

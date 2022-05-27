import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "./components";
import Home from "./container/Home";
import { parseJwt } from "./auth/auth";
import axios from "axios";

const App = () => {
  const { isLoading, getAccessTokenSilently, user } = useAuth0();
  const [permissions, setPermissions ] = useState();

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const payload = parseJwt()
      if(payload?.permissions?.length) {
        setPermissions(payload.permissions)
      }
    };
    if (user) {
      getToken();
    }
  }, [getAccessTokenSilently, user]);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen	 items-center justify-center">
        Loading ...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home permissions={permissions} user={user}/>} />
    </Routes>
  );
};

export default App;

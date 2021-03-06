import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import errorToDisplay from "../errorHandeling";
import {
  login,
  signup,
  getUserPetsById,
  updateUserDetails,
  logout,
} from "../services/server";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(
    localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  );
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    try {
      const user = await login(email, password);
      if (user) {
        localStorage.activeUser = JSON.stringify(user);
        setActiveUser(user);
        console.log(activeUser);
        navigate("/");
      }
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)).status)
      alert(errorToDisplay(err));
    }
  }

  async function handleLogout(e) {
    localStorage.removeItem("activeUser");
    logout();
    setActiveUser(null);
  }

  async function editUser(userDetails) {
    try {
      const response = await updateUserDetails(userDetails);
      if (response) {
        setActiveUser(response);
        localStorage.activeUser = JSON.stringify(response);
        navigate("/");
      }
    } catch (err) {
      alert(errorToDisplay(err));

    }
  }
  async function handleSignUp(newUser) {
    try {
      const user = await signup(newUser);
      if (user) {
        navigate("/");
      }
    } catch (err) {
      alert(errorToDisplay(err));
    }
  }

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        handleSignUp,
        editUser,
        onLogin: handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

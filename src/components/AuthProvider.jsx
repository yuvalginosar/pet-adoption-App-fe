import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axios from 'axios'
import { login, signup, getUserPetsById, updateUserDetails} from "../services/server";

function AuthProvider({children}) {
  const [activeUser, setActiveUser] = useState(
    localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  );
    const navigate = useNavigate();

    async function handleLogin(email, password) {
        try {
          const user = await login(email, password);
          localStorage.activeUser = JSON.stringify(user);
          // const userPets = await getUserPetsById(user.id)
          // user.pets = userPets
          setActiveUser(user);
          console.log(activeUser)
          navigate('/');
        } catch (e) {
            console.error(e)
        }
    }
    async function handleLogout(e) {
      localStorage.removeItem("activeUser");
      // localStorage.removeItem("token");
      // setToken(null);
      setActiveUser(null);
    }

    async function editUser(userDetails) {
        try{
          const response = await updateUserDetails(userDetails)
          setActiveUser(response)
          localStorage.activeUser = JSON.stringify(response);
          navigate('/')
        }catch (error){
            console.error(error)
        }
    }
    async function handleSignUp(newUser) {
        try { 
          const user = await signup(newUser)
            setActiveUser(user);
            navigate('/');
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        };
    }


  return (
    <AuthContext.Provider
      value={{ activeUser, handleSignUp, editUser, onLogin: handleLogin, handleLogout}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
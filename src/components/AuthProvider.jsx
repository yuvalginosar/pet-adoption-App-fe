import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axios from 'axios'
import { login, signup, getUserPetsById } from "../services/server";

function AuthProvider({children}) {
    const [activeUser, setActiveUser] = useState(null);
    const navigate = useNavigate();

    async function handleLogin(email, password) {
        try {
          const user = await login(email, password);
          // const userPets = await getUserPetsById(user.id)
          // user.pets = userPets
          setActiveUser(user);
          console.log(activeUser)
          navigate('/');
        } catch (e) {
            console.error(e)
        }
    }
   
    async function editUser(firstName,lastName, email, pwd, phoneNumber, userBio) {
        try{

        }catch{

        }
    }
    async function handleSignUp(firstName,lastName, email, pwd, phoneNumber) {
        try { 
          const user = await signup(firstName,lastName, email, pwd, phoneNumber)
            setActiveUser(user);
            navigate('/');
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        };
    }


  return (
    <AuthContext.Provider
      value={{ activeUser, handleSignUp, editUser, onLogin: handleLogin,}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
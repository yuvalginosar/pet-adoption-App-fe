import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axios from 'axios'

function AuthProvider({children}) {
    const [activeUser, setActiveUser] = useState({'firstName': 'test1',
'lastName': 'test2', 'pets': ['a', 'b']});
    const navigate = useNavigate();

    // async function handleLogin(email, pwd) {
        // try {
        //     setActiveUser(user);
        //     navigate('/');
        // } catch (e) {
        //     console.error(e)
        // }
    // }

    async function editUser(firstName,lastName, email, pwd, phoneNumber, userBio) {
        try{

        }catch{

        }
    }
    async function handleSignUp(firstName,lastName, email, pwd, phoneNumber) {
    //     try { 
    //         const newUser = {
    //           'email': email, 
    //           'userName': userName,
    //         }
    //         setActiveUser(user);
    //         navigate('/');
    //     } catch(error) {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //     };
    }


  return (
    <AuthContext.Provider
      value={{ activeUser, handleSignUp, editUser}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
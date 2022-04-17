import React, { useState } from "react";
import { Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import './HomePage.css'
import LoginPage from "../components/LoginPage";
import SignUp from "../components/SignUp";
import useAuth from "../hooks/useAuth";



function HomePage(props) {
    const { activeUser } = useAuth();
    console.log(activeUser)
    const [showLogIn, setShowLogIn] = useState(false);
    const handleCloseLogIn = () => setShowLogIn(false);
    const handleShowLogIn = () => setShowLogIn(true);

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);
  return (
      
    <div className="container" >
                
        {activeUser && 
        
        <h1 className="display-1">Welcom {activeUser.first_name} {activeUser.last_name}!</h1>
        
        
        }
        <h1 className="display-1">Bring a new friend to your family!</h1>
        <h3>Here you can find dogs and cats looking for a home. Adopt a new friend for life or provide a temporary foster home</h3>
        {!activeUser &&<div className='my-4'>
        <LoginPage showLogIn={showLogIn} handleCloseLogIn={handleCloseLogIn}/>
         <SignUp showSignUp={showSignUp} handleCloseSignUp={handleCloseSignUp}/>
        <Button 
            variant="secondary" 
            size="sm"
            type = 'button'
            onClick={handleShowSignUp}
        >
        Sign Up
        </Button>{' '}
        
        <Button 
            variant="secondary" 
            size="sm"
            type = 'button'
            onClick={handleShowLogIn}
        >
            Login
        </Button>
        
        </div>  
}
    </div>
  );
}

export default HomePage;

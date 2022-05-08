import React, { useState } from "react";
import { Button, Container, Modal, Form, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import LoginPage from "../components/LoginPage";
import SignUp from "../components/SignUp";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";

function HomePage(props) {
  const { activeUser } = useAuth();
  console.log(activeUser);
  const [showLogIn, setShowLogIn] = useState(false);
  const handleCloseLogIn = () => setShowLogIn(false);
  const handleShowLogIn = () => setShowLogIn(true);

  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);
  return (
    <Container className="p-container">
      {activeUser && (
        <h2>
          Welcom {activeUser.first_name} {activeUser.last_name}!
        </h2>
      )}
      <h2>Bring a new friend to your family!</h2>
      <h4>
        Here you can find dogs and cats looking for a home. Adopt a new friend
        for life or provide a temporary foster home
      </h4>
      {!activeUser && (
        <div className="my-4">
          <LoginPage
            showLogIn={showLogIn}
            handleCloseLogIn={handleCloseLogIn}
          />
          <SignUp
            showSignUp={showSignUp}
            handleCloseSignUp={handleCloseSignUp}
            handleShowLogIn={handleShowLogIn}
          />
          {/* <ButtonGroup vertical className="ml-auto"> */}
          <div className="page-btn"><Button
              className="my-2"
              variant="secondary"
              size="sm"
              type="button"
              onClick={handleShowLogIn}
              >
              Login
            </Button>
            <Button
              variant="link"
              size="sm"
              type="button"
              onClick={handleShowSignUp}
              >
              Sign Up
            </Button>{" "}
                </div>
          {/* </ButtonGroup> */}
        </div>
      )}
      <SearchBar/>
    </Container>
  );
}

export default HomePage;

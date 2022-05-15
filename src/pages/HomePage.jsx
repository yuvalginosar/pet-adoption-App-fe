import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./HomePage.css";
import LoginPage from "../components/LoginPage";
import SignUp from "../components/SignUp";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";
import { faDog, faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function HomePage(props) {
  const { activeUser } = useAuth();
  const [showLogIn, setShowLogIn] = useState(false);
  const handleCloseLogIn = () => setShowLogIn(false);
  const handleShowLogIn = () => setShowLogIn(true);

  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  const dogIcon = <FontAwesomeIcon icon={faDog} />;
  const catIcon = <FontAwesomeIcon icon={faCat} />;
  return (
    <Container className="p-container">
      <div className="header">
        {activeUser && (
          <h2>
            Hello {activeUser.first_name} {activeUser.last_name}!
          </h2>
        )}
        <h2>
          Bring a new friend to your life {dogIcon}
          {catIcon}
        </h2>
        <h5 className="my-2">
          This is a platform for you to find the perfect match.{" "}
          <p>
            There are many dogs and cats looking for a home, adopt or provide a
            temporary foster home
          </p>
        </h5>
        {!activeUser && (
          <div className="my-2">
            <LoginPage
              showLogIn={showLogIn}
              handleCloseLogIn={handleCloseLogIn}
            />
            <SignUp
              showSignUp={showSignUp}
              handleCloseSignUp={handleCloseSignUp}
              handleShowLogIn={handleShowLogIn}
            />
            <div className="page-btn">
              <Button
                className="my-2"
                variant="outline-secondary"
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
          </div>
        )}
      </div>
      <SearchBar />
    </Container>
  );
}

export default HomePage;

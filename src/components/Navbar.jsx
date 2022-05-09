import React, { useEffect, useState } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./navbar.css";

function PetsNavbar(props) {
  const { activeUser, handleLogout } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        {activeUser && !activeUser.is_admin && (
          <Nav className="c-nav">
            <>
              <div className="split-nav">
                <span className="flexed">
                  <Nav.Link to="/" as={NavLink} className="me-2">
                    Search
                  </Nav.Link>
                  <Nav.Link to="/Pets" as={NavLink}>
                    MyPets
                  </Nav.Link>
                </span>
                <span className="flexed">
                  <Nav.Link to="/Profile" as={NavLink} className="me-2">
                    {activeUser.first_name}
                  </Nav.Link>
                  <Nav.Link to="/" as={NavLink} onClick={handleLogout}>
                    logout
                  </Nav.Link>
                </span>
              </div>
            </>
          </Nav>
        )}
        {activeUser && (activeUser.is_admin) && (
          <Nav className="c-nav">
            <>
              
              <div className="split-nav">
                <span className="flexed">
                  <Nav.Link to="/admin" as={NavLink} className="me-2">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link to="/Pets" as={NavLink}>
                    MyPets
                  </Nav.Link>
                </span>
                <span className="flexed">
                  <Nav.Link to="/Profile" as={NavLink} className="me-2">
                    {activeUser.first_name}
                  </Nav.Link>
                  <Nav.Link to="/" as={NavLink} onClick={handleLogout}>
                    logout
                  </Nav.Link>
                </span>
              </div>
            </>
          </Nav>
        )}
        <Nav className="ms-auto">
          {!activeUser && (
            <Nav.Link to="/" as={NavLink}>
              Login
            </Nav.Link>
          )}
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default PetsNavbar;

import React, { useEffect, useState } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import './navbar.css'

function PetsNavbar(props) {
  const { activeUser, handleLogout } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {activeUser && (
          <Nav className="c-nav-user">
                <>
                <Nav.Link to="/" as={NavLink}>
                  Search
                </Nav.Link>
                <Nav.Link to="/Pets" as={NavLink}>
                  MyPets
                </Nav.Link>
               
                <Nav.Link to="/Profile" as={NavLink}>
                  {activeUser.first_name}
                </Nav.Link>
                <Nav.Link
                  to="/"
                  as={NavLink}
                  onClick={handleLogout}
                >
                  logout
                </Nav.Link>
              </>
            </Nav>
            )}
              {activeUser && activeUser.is_admin && (
            <Nav >
                <>
                  {" "}
                  <Nav.Link to="/addPet" as={NavLink}>
                    Add Pet
                  </Nav.Link>
                  <Nav.Link to="/admin" as={NavLink}>
                    admin Dashboard
                  </Nav.Link>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PetsNavbar;

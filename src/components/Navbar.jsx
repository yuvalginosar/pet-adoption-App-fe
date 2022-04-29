import React, { useEffect, useState } from 'react';
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";




function PetsNavbar(props) {
  const { activeUser, handleLogout } = useAuth();

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {activeUser && (
                <>
                  <Nav.Link to="/" as={NavLink}>
                    Home
                  </Nav.Link>
                  <Nav.Link to="/Profile" as={NavLink}>
                    Profile
                  </Nav.Link>
                  <Nav.Link to="/Pets" as={NavLink}>
                    Pets
                  </Nav.Link>
                  <Nav.Link to="/SearchBar" as={NavLink}>
                    Search
                  </Nav.Link>
                  <Nav.Link to="/addPet" as={NavLink}>
                  Add Pet
                  </Nav.Link>
                  <Nav.Link className="mx-5" to="/" as={NavLink} onClick={handleLogout} >
                  logout
                  </Nav.Link>
                </>
              )}
            </Nav>
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
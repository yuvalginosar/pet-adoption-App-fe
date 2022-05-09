import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import PetCard from "../components/PetCard";
import useAuth from "../hooks/useAuth";
import { getPets, getUserPetsById } from "../services/server.js";
function Pets(props) {
  const { activeUser } = useAuth();
  const [myPets, setMyPets] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const curPets = await getUserPetsById(activeUser.id);
        setPets(curPets);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPets();
  }, [activeUser]);

  let usersPets;
  if (myPets) {
    usersPets = pets.filter((pet) => {
      return pet.status.includes("adopt") || pet.status.includes("foster");
    });
  } else {
    usersPets = pets.filter((pet) => {
      return pet.status.includes("save");
    });
  }

  return (
    <Container className="p-container">

      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => setMyPets(true)}> My Pets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setMyPets(false)}>Saved Pets</Nav.Link>
        </Nav.Item>
      </Nav>

    

      <Row xs={1} md={2} className="g-4">
        {usersPets.map((pet) => (
          <Col key={pet.id}>
            <PetCard pet={pet} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Pets;

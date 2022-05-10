import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import "./SearchBar.css";
import { getPets } from "../services/server.js";
import PetCard from "./PetCard";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function SearchBar() {
  const [results, setResults] = useState([]);
  const [isadvanced, setIsAdvanced] = useState(false);

  //search params
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [name, setName] = useState("");
  const [isResultsEmpty, setIsResultsEmpty] = useState(false);

  async function fetchPets() {
    const curPets = await getPets(adoptionStatus, type, height, weight, name);
    setHeight('');
    setName('')
    setWeight('')
    setType('')
    setAdoptionStatus('')
    setResults(curPets);
    if (curPets.length === 0) {
      setIsResultsEmpty(true);
    }
  }

  function onSwitchOn() {
    console.log(isadvanced);
    setIsAdvanced(!isadvanced);
  }
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />

  return (
    <Container className="my-5">
      <Form className="c-form">
        {isadvanced ? (
          <div className="mb-3">
            <Form.Group className="mb-2" controlId="adoptionStatus">
              <Form.Label>Adoption Status</Form.Label>
              <Form.Control
                type="text"
                value={adoptionStatus}
                onChange={(e) => setAdoptionStatus(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="height">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </div>
        ) : (
          <Form.Group className="my-2" controlId="serachType">
            <Form.Control
              placeholder={"sesrch pet by type.."}
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
        )}
        <div className="aligned">
          <Button
            className="my-2 s-btn"
            variant="outline-secondary"
            onClick={fetchPets}
            size="sm"
          >
            {searchIcon} Search
          </Button>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="advanced"
            onChange={onSwitchOn}
          />
        </div>
        {isResultsEmpty && (
          <div>We could'nt find a match. Please try another search key</div>
        )}
        <ListGroup className="result-box">
          {results && (
            <Row xs={1} md={2} className="g-4 mt-2">
              {results.map((pet) => (
                <Col key={pet.id}>
                  <PetCard pet={pet} />
                </Col>
              ))}
            </Row>
          )}
        </ListGroup>
      </Form>
    </Container>
  );
}

export default SearchBar;

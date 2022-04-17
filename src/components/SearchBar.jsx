import React, { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import "./SearchBar.css";
import axios from "axios";
import mockPets from '../data/mockPets';
import {getPets} from '../services/server.js'
import PetCard from "./PetCard";


function SearchBar () {
const [results, setResults] = useState([]);
const [pets, setPets] = useState([]);
const [isadvanced, setIsAdvanced] = useState(false)

//search params
const [adoptionStatus, setAdoptionStatus] = useState('')
const [type, setType] = useState('')
const [height, setHeight] = useState('')
const [weight, setWeight] = useState('')
const [name, setName] = useState('')


async function fetchPets() {
  const curPets = await getPets(adoptionStatus, type, height, weight, name)
  console.log(curPets)
   setResults(curPets)
// setPets(mockPets)
}

function onSwitchOn() {
  console.log(isadvanced)
  setIsAdvanced(!isadvanced)
}
  return (
    <div className="c-searchbox">
      <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="advanced search"
        onChange={onSwitchOn}
      />
      {isadvanced ?
        <div className="mb-3">
           <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Adoption Status</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Adoption Status" 
                            value={adoptionStatus}
                            onChange={(e) => setAdoptionStatus(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Type" 
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Height</Form.Label>
                         <Form.Control type="email" 
                            placeholder="Height" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Weight" 
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
      </div>
      
      
                :
                  <Form.Control
                    placeholder={'sesrch pet..'}
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                }
                  <Button className="my-2"
                    variant="secondary" 
                    onClick={fetchPets}>
                    Search
                </Button>
      <ListGroup className="result-box">
        {results &&
         <Row xs={1} md={2} className="g-4 mt-2">
         {results.map((pet, key) => (
             <Col>
                 <PetCard
                     key={key}
                     pet={pet}
                     />
             </Col>
         ))}
         </Row>
         
         }
      </ListGroup>
      </Form>
    </div>
  );
}

export default SearchBar;

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from '../hooks/useAuth';



function PetDetailsPage(props) {
    const { id } = useParams();
    const { activeUser } = useAuth();
    const [petStatus, setPetStatus] = useState('')
    console.log(activeUser)
    const ob = {
        "type": "Cat",
        "name": "Jasmine",
        "adoptionStatus": "Available",
        "picture": "",
        "height": 66,
        "weight": 22,
        "color": "Orange Tabby/White",
        "bio": "",
        "hypoallergnic": false,
        "dietery": [],
        "breed": "Domestic Shorthair Mix",
        'id' : '1'
      }
      const [pet, setPet] = useState(ob);

      console.log(pet)
    // useEffect(() => {
    //   async function fetchActor() {
    //     const url = `https://localhost:8080/pet/${id}`;
    //     const response = await axios.get(url);
    //     setPet(response.data);
          
    //   }
  
    //   fetchActor();
    // }, [id]);
    
    useEffect(() => {

    function definePetsStatus() {
        if (activeUser.pets.includes(pet.id)){
            setPetStatus ('owner')
        }
        else if (pet.adoptionStatus === 'Fostered') {
            setPetStatus('Fostered')
        }
        else { setPetStatus('none')}
    }
    definePetsStatus()
    console.log(petStatus)

    }, []);
    return (
        <Container>
            <Card className="my-3">
            <Row>
                <Col md={3}>
                {pet.picture ? <Card.Img variant="top"  src={pet.picture} /> : <p>'no img'</p>}

                </Col>
                <Col md={9}>
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>
                        <p>Adoption status: {pet.adoptionStatus}</p>
                        <p>Height: {pet.height}</p>
                        <p>Weight: {pet.weight}</p>
                        <p>Color: {pet.color}</p>
                        <p>Bio: {pet.bio}</p>
                        <p>Hypoallergnic: {pet.hypoallergnic ? 'yes' : 'no'}</p>
                        <p>Dietery: {pet.dietery.join(', ')}</p>
                        <p>Breed: {pet.breed}</p>
                    </Card.Text>
                </Card.Body>
                </Col>
            </Row>
                {petStatus === 'none' && <div className='mb-2'>
                    <Button 
                        variant="success" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Addopt {pet.name}
                    </Button>{' '}
                    <p className='mx-2'> or</p>
                    <Button 
                        variant="secondary" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Foster {pet.name}
                    </Button>
                </div>}
                {petStatus === 'Fostered' && <div className='mb-2'>
                    <Button 
                        variant="success" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Addopt {pet.name}
                    </Button>{' '}
                </div>}
                {(petStatus === 'owner' || petStatus === 'Fostered') && <div className='mb-2'>
                    <Button 
                        variant="danger" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Return {pet.name}
                    </Button>{' '}
                </div>}
            </Card>
        </Container>
    );
}
export default PetDetailsPage;
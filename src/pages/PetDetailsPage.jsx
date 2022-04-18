import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import {getPetById} from '../services/server.js'
import './petDetailPage.css'


function PetDetailsPage(props) {
    const [pet, setPet] = useState('');

    const id = useParams();
    const { activeUser } = useAuth();
    const [petStatus, setPetStatus] = useState(null)
    
    useEffect(() => {
        async function fetchPets() {
            console.log('hi')
            const curPet = await getPetById(id.id)
            console.log(curPet)
            setPet(curPet)
            setPetStatus(curPet.status)
       }
       fetchPets()
       console.log(pet)
    }, [])
    
    return (
        
        <Container>
           {pet && <Card className="my-3">
            <Row>
                <Col md={3}>
                {pet.picture ? <Card.Img variant="top"  src={pet.picture} /> : <p className='ms-1'>no available img</p>}

                </Col>
                <Col md={9}>
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>
                        <p>Adoption status: {pet.adoption_status}</p>
                        <p>Height: {pet.height}cm</p>
                        <p>Weight: {pet.weight}Kg</p>
                        <p>Color: {pet.color}</p>
                        <p>Bio: {pet.bio}</p>
                        <p>Hypoallergnic: {pet.hypoallergenic ? 'yes' : 'no'}</p>
                        {/* <p>Dietery: {pet.dietery.join(', ')}</p> */}
                        <p>Breed: {pet.breed}</p>
                    </Card.Text>
                </Card.Body>
                </Col>
            </Row>
                {(petStatus === null || petStatus === null) && <div className='mb-2 align'>
                    <Button 
                        variant="success" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Addopt {pet.name}
                    </Button>{' '}
                    <Button 
                        variant="secondary" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Foster {pet.name}
                    </Button>
                </div>}
                {petStatus === 'foster' && <div className='mb-2'>
                    <Button 
                        variant="success" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Addopt {pet.name}
                    </Button>{' '}
                </div>}
                {(petStatus === 'adopt' || petStatus === 'foster') && <div className='mb-2'>
                    <Button 
                        variant="danger" 
                        size="md"
                        type = 'button'
                        onClick={''}
                    >
                    Return {pet.name}
                    </Button>{' '}
                </div>}
            </Card>}
        </Container>
    );
}
export default PetDetailsPage;
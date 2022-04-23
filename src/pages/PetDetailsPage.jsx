import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import {getPetById, savePet, deleteSavedPet, adoptOrFosterPet, returnPet} from '../services/server.js'
import './petDetailPage.css'
import PetModal from '../components/PetModal';

function PetDetailsPage(props) {
    const [pet, setPet] = useState('');
    const [isSaved, setIsSaved] = useState(false)
    const id = useParams();
    console.log(id)
    const { activeUser } = useAuth();
    const [petStatus, setPetStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userAction, setUserAction] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        async function fetchPets() {
            const curPet = await getPetById(id.id)
            setPet(curPet)
            setPetStatus(curPet.status)
       }
       fetchPets()
    }, [isSaved, isLoading])
    
    async function handleSavePet() {
        setIsLoading(true)
        const petId = id.id
        const userId = activeUser.id
        const res = await savePet(petId, userId)
        setIsSaved(!isSaved)
        setIsLoading(false)
    }
    async function handleDeleteSavedPet() {
        setIsLoading(true)
        const petId = id.id
        const userId = activeUser.id
        const res = await deleteSavedPet(petId, userId)
        setIsSaved(!isSaved)
        setIsLoading(false)
    }

    async function handleAdoptOrFosterPet(action) {
        setIsLoading(true)
        const curPetStatus = pet.status
        const petId = id.id
        const userId = activeUser.id
        const res = await adoptOrFosterPet(petId, userId, action, curPetStatus)
        console.log(res)
        if (action === 'foster') setUserAction("fostering")
        if (action === 'adopt') setUserAction("adopting")
        setIsLoading(false)
        handleShow()
    }
    console.log(pet)


    async function handleReturnPet() {
        setIsLoading(true)
        const petId = id.id
        const userId = activeUser.id
        const res = await returnPet(petId, userId)
        setUserAction('returnning')
        setIsLoading(false)
        handleShow()
    }

   
    return (
        <Container>
            {console.log(userAction)}
            {userAction && <PetModal name={pet.name} action={userAction} show={show} handleClose={handleClose}/>}
           {pet && <Card className="my-3">
            {/* <Row> */}
                {/* <Col md={3}> */}
                {pet.picture ? <Card.Img variant="top"  src={pet.picture} /> : <p className='ms-1'>no available img</p>}

                {/* </Col>
                <Col md={9}> */}
                <Card.Body>
                    <Card.Title>
                        {pet.name}
                        {pet.status === null && 
                    <Button className='mx-5 btn1'
                        variant="info" 
                        size="sm"
                        type = 'button'
                        onClick={handleSavePet}
                    >
                    Add {pet.name} to My Pets
                    </Button>
                }
                {pet.status === 'save' && 
                    <Button className='mx-5 btn1'
                        variant="info" 
                        size="sm"
                        type = 'button'
                        onClick={handleDeleteSavedPet}
                    >
                    Remove {pet.name} from my pets 
                    </Button>
                }
                    </Card.Title>
                    <Card.Text>
                        <p>Adoption status: {pet.adoption_status}</p>
                        <p>Height: {pet.height}cm</p>
                        <p>Weight: {pet.weight}Kg</p>
                        <p>Color: {pet.color}</p>
                        <p>Bio: {pet.bio}</p>
                        {/* <p>Dietary: {JSON.parse(pet.dietary_restrictions).join()}</p> */}
                        <p>Hypoallergnic: {pet.hypoallergenic ? 'yes' : 'no'}</p>
                        {/* <p>Dietery: {pet.dietery.join(', ')}</p> */}
                        <p>Breed: {pet.breed}</p>
                    </Card.Text>
                </Card.Body>
                {/* </Col>
            </Row> */}
                {(pet.adoption_status === "Available" && (petStatus === null || petStatus === "save")) && <div className='mb-2 align'>
                    <Button 
                        variant="success" 
                        size="sm"
                        type = 'button'
                        onClick={() => handleAdoptOrFosterPet('adopt')}
                    >
                    Addopt {pet.name}
                    </Button>{' '}
                    <Button 
                        variant="secondary" 
                        size="sm"
                        type = 'button'
                        onClick={() => handleAdoptOrFosterPet('foster')}
                    >
                    Foster {pet.name}
                    </Button>
                    {isLoading && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />}
                </div>}
                {(pet.adoption_status === "Fostered" && (petStatus !== 'adopt' )) && <div className='mb-2'>
                    <Button className='mx-2 my-2'
                        variant="success" 
                        size="sm"
                        type = 'button'
                        onClick={() => handleAdoptOrFosterPet('adopt')}
                    >
                    Addopt {pet.name}
                    </Button>{' '}
                </div>}
                {(petStatus === 'adopt' || petStatus === 'foster') && <div className='mb-2'>
                    <Button 
                        variant="danger" 
                        size="sm"
                        type = 'button'
                        onClick={() => handleReturnPet()}
                    >
                    Return {pet.name}
                    </Button>{' '}
                </div>}
                
            </Card>}
        </Container>
    );
}
export default PetDetailsPage;
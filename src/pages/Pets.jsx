import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import petsContext from '../contexts/petsContext';
import mockPets from '../data/mockPets';
import useAuth from '../hooks/useAuth';
import {getPets, getUserPetsById} from '../services/server.js'
function Pets(props) {
    // const {pets} = useContext(petsContext)
    const { activeUser } = useAuth();
    const [myPets, setMyPets] = useState(true)
    const [pets, setPets] = useState([]);
    // const [results, setResults] = useState([]);
    // const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
        async function fetchPets() {
            const curPets = await getUserPetsById(activeUser.id)
            // console.log(activeUser.id)
            console.log(curPets)
            setPets(curPets)
            // console.log(pets)
        }
      fetchPets()
    //   console.log(pets)
    }, [activeUser])


    let usersPets;
    if (myPets){
        usersPets = pets.filter(pet => {
            return (pet.status.includes('adopt') || pet.status.includes('foster'))
        })
    }
    else {
        usersPets = pets.filter(pet => {
            return (pet.status.includes('save'))
    })
    }
    

    return (
        <Container className="p-pets">
            <Dropdown className='my-2'>
                <Dropdown.Toggle variant="secondary" size='sm' id="dropdown-basic">
                    {myPets ? 'My Pets' : 'Saved Pets'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item 
                        onClick={() => setMyPets(true)}
                    >Show My Pets</Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => setMyPets(false)}
                    >Show Saved Pets</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {myPets ? <h1>My Pets</h1> : <h1>Saved Pets</h1>}

            <Row xs={1} md={2} className="g-4">
            {usersPets.map((pet) => (
                <Col key={pet.id}>
                    <PetCard
                        pet={pet}
                        />
                </Col>
            ))}
            </Row>
      </Container>
    );
}

export default Pets;
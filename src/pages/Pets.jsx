import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import petsContext from '../contexts/petsContext';
import mockPets from '../data/mockPets';
import useAuth from '../hooks/useAuth';
import {getPets} from '../services/server.js'
function Pets(props) {
    // const {pets} = useContext(petsContext)
    const { activeUser } = useAuth();
    const [myPets, setMyPets] = useState(false)
    const [pets, setPets] = useState([]);
    // const [results, setResults] = useState([]);
    // const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
       async function fetchPets() {
           const curPets = await getPets()
            setPets(curPets)
        // setPets(mockPets)

      }
      fetchPets()
      console.log(pets)
    }, [])



    function displayCurrUserPets(activeUser) {
        // let usersPets = pets.filter(pet => {
        //     return pet.id.includes(activeUser.pets)
        // })
        //     setPets(usersPets)
            setMyPets(true)
    }

    function displayAllPets() {
            setMyPets(false)
    }

    return (
        <Container className="p-pets">
            <Dropdown className='my-2'>
                <Dropdown.Toggle variant="secondary" size='sm' id="dropdown-basic">
                    {myPets ? 'My Pets' : 'All Pets'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item 
                        onClick={displayCurrUserPets}
                    >Show My Pets</Dropdown.Item>
                    <Dropdown.Item 
                        onClick={displayAllPets}
                    >Show All Pets</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {myPets ? <h1>My Pets</h1> : <h1>All Pets</h1>}

            <Row xs={1} md={2} className="g-4">
            {pets.map((pet, key) => (
                <Col>
                    <PetCard
                        key={key}
                        pet={pet}
                        />
                </Col>
            ))}
            </Row>
      </Container>
    );
}

export default Pets;
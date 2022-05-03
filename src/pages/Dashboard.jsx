import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsers, getPets } from '../services/server.js';


function Dashboard(props) {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [pets, setPets] = useState([]);

    useEffect(() => {
        async function getAllUsersAndPets() {
            const [curUsers, curPets] = await Promise.all([getUsers(), getPets()])
            console.log(curPets)
            setUsers(curUsers)
            setPets(curPets)

        } 
        getAllUsersAndPets()
    }, [])


    return (
        <Container>
            <h4 className='my-3'>Users list</h4>
            <div className='users-list'>
                <ListGroup>
                    {users.map((user) => (
                        <ListGroup.Item key={user.id} onClick={() => navigate(`/admin/user/${user.id}`)} >
                                {user.first_name + ' ' + user.last_name + ' email: ' + user.email } 
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            
            <h4 className='my-3'>All pets</h4>
            <div className='Pets-list'>
                <ListGroup>
                    {pets.map((pet) => (
                        <ListGroup.Item key={pet.id} onClick={() => navigate(`/admin/editpet/${pet.id}`)}>
                                {pet.name + ' ' + pet.adoption_status } 
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Container>
    );
}

export default Dashboard;
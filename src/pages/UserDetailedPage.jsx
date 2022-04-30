import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getUserFullById } from '../services/server';


function UserDetailedPage(props) {
    const [user, setUser] = useState({})
    const id = useParams();
    console.log(id)
    useEffect(() => {
        async function getUserDetails() {
            const curUser = await getUserFullById(id.id)
            console.log(curUser)
            setUser(curUser)
        } 
        getUserDetails()
    }, [])
    return (
       <Container>
           <Card>
                <Card.Body>
                    <Card.Title className='my-3'> 
                        {user.first_name + ' '+ user.last_name}
                    </Card.Title>
                    <Card.Text>Email Address: {user.email}</Card.Text>
                    <Card.Text> Phone Number: {user.phone}</Card.Text>
                    {user.is_admin ?
                        <Card.Text>{user.first_name} is an admin</Card.Text>
                    :   <Card.Text>{user.first_name} is a user/pet owner</Card.Text>
                        }
                                            
                    <Card.Title className='mt-5'> Users pet's</Card.Title>

                    {user.pets?.length > 0 ?
                    <Table striped hover>
                        <thead>
                            <tr>
                            <th>Pet's name</th>
                            <th>Type</th>
                            <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.pets.map((pet) => (
                                <tr key={pet.id}>
                                    <td> {pet.name}</td>
                                    <td> {pet.type}</td>
                                    <td> {pet.status}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                    : <p>{user.first_name} do not own, foster or save any pets</p>
                    }
                </Card.Body>
           </Card>
           
       </Container>
    );
}

export default UserDetailedPage;
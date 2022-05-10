import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFullById } from "../services/server";
import './userDetailedPage.css'
function UserDetailedPage(props) {
  const [user, setUser] = useState({});
  const id = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      try {
        const curUser = await getUserFullById(id.id);
        if (curUser) {
          setUser(curUser);
        }
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
    getUserDetails();
  }, []);
  return (
    <Container className="p-container">
      <Card>
        <Card.Body className="centerd">
          <Card.Title className="my-3">
            {user.first_name + " " + user.last_name}
          </Card.Title>
          <Card.Text>Email Address: {user.email}</Card.Text>
          <Card.Text> Phone Number: {user.phone}</Card.Text>
          {user.is_admin ? (
            <Card.Text>{user.first_name} is an admin</Card.Text>
          ) : (
            <Card.Text>{user.first_name} is a user/pet owner</Card.Text>
          )}
          <Card.Title className="mt-5"> Users pet's</Card.Title>
          {user.pets?.length > 0 ? (
            <div className="c-table">
            <Table striped hover >
              <thead>
                <tr>
                  <th>Pet's name</th>
                  <th>Type</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {user.pets.map((pet) => (
                  <tr key={pet.id}
                  onClick={() => navigate(`/admin/editpet/${pet.id}`)}
                  className='clickable'
                  >
                    <td> {pet.name}</td>
                    <td> {pet.type}</td>
                    <td> {pet.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          ) : (
            <p>{user.first_name} do not own, foster or save any pets</p>
            )}
            
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDetailedPage;

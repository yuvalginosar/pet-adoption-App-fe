import React, { useEffect, useState } from "react";
import { Container, ListGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers, getPets } from "../services/server.js";
import "./dashboard.css";
import { CaretDownFill } from "react-bootstrap-icons";
function Dashboard(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showPets, setShowPets] = useState(true);
  useEffect(() => {
    async function getAllUsersAndPets() {
      try {
        const [curUsers, curPets] = await Promise.all([getUsers(), getPets()]);
        setUsers(curUsers);
        setPets(curPets);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
    getAllUsersAndPets();
  }, []);

  function handleShowUsers() {
    setShowUsers(!showUsers);
  }
  function handleShowPets() {
    setShowPets(!showPets);
  }

  return (
    <Container className="p-container">
      <h4 className="my-3 headline">
        Pets <CaretDownFill onClick={handleShowPets} />
      </h4>
      {showPets && ( <div className="c-list">
        
          <Table striped hover>
            <thead>
              <tr>
                <th>Pet name</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr
                  key={pet.id}
                  onClick={() => navigate(`/admin/editpet/${pet.id}`)}
                >
                  <td> {pet.name}</td>
                  <td> {pet.type}</td>
                  <td> {pet.adoption_status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
      </div>
        )}
      <h4 className="my-3 headline">
        Users <CaretDownFill onClick={handleShowUsers} />
      </h4>
        {showUsers && (
      <div className="c-list">
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/admin/user/${user.id}`)}
                >
                  <td> {user.first_name + " " + user.last_name}</td>
                  <td> {user.email}</td>
                  <td> {user.is_admin ? "admin" : "pet owner"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
      </div>
        )}
    </Container>
  );
}

export default Dashboard;

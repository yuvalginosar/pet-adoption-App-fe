import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers, getPets } from "../services/server.js";
import "./dashboard.css";
import { CaretDownFill, CaretRightFill, Plus } from "react-bootstrap-icons";
import SearchBar from "../components/SearchBar.jsx";
import useAuth from "../hooks/useAuth";

function Dashboard(props) {
  const { activeUser, handleLogout } = useAuth();
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
      <h4 className="headline">
        Welcom {activeUser.first_name} {activeUser.last_name}!
      </h4>
      <SearchBar />
      <div className="aligned">
        <h4 className="my-3 headline">
          Pets{" "}
          {showPets ? (
            <CaretDownFill className="c-clickable" onClick={handleShowPets} />
          ) : (
            <CaretRightFill className="c-clickable" onClick={handleShowPets} />
          )}
        </h4>{" "}
        <Button
          className="c-add"
          variant="outline-secondary"
          size="sm"
          onClick={() => navigate("/addPet")}
        >
          <Plus size={25} /> Add
        </Button>{" "}
      </div>
      {showPets && (
        <div className="c-list">
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
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
        Users{" "}
        {showUsers ? (
          <CaretDownFill className="c-clickable" onClick={handleShowUsers} />
        ) : (
          <CaretRightFill className="c-clickable" onClick={handleShowUsers} />
        )}
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

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  getPetById,
  getStatusByIds,
  savePet,
  deleteSavedPet,
  adoptOrFosterPet,
  returnPet,
} from "../services/server.js";
import "./petDetailPage.css";
import PetModal from "../components/PetModal";
import { Star, StarFill, BookmarkHeart, BookmarkHeartFill } from 'react-bootstrap-icons';

function PetDetailsPage(props) {
  const [pet, setPet] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const id = useParams();
  const { activeUser } = useAuth();
  const [petStatus, setPetStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPets() {
      try {
        console.log(activeUser);
        const [curPet, petStatusForUser] = await Promise.all([
          getPetById(id.id),
          getStatusByIds(id.id, activeUser.id),
        ]);
        setPet(curPet);
        console.log(petStatusForUser.length);
        if (petStatusForUser.length === 0) setPetStatus(null);
        else setPetStatus(petStatusForUser[0].status);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
    fetchPets();
  }, [isSaved, isLoading]);

  function currentPetStatus(array) {
    if (array.length === 0) setPetStatus(null);
    else setPetStatus(array[0].status);
  }

  async function handleSavePet() {
    setIsLoading(true);
    const petId = id.id;
    const userId = activeUser.id;
    try {
      const res = await savePet(petId, userId);
      setIsSaved(!isSaved);
      setIsLoading(false);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  async function handleDeleteSavedPet() {
    setIsLoading(true);
    const petId = id.id;
    const userId = activeUser.id;
    try {
      const res = await deleteSavedPet(petId, userId);
      setIsSaved(!isSaved);
      setIsLoading(false);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  async function handleAdoptOrFosterPet(action) {
    setIsLoading(true);
    const curPetStatus = petStatus;
    const petId = id.id;
    const userId = activeUser.id;
    console.log(action);
    try {
      const res = await adoptOrFosterPet(petId, userId, action, curPetStatus);
      if (action === "foster") setUserAction("fostering");
      if (action === "adopt") setUserAction("adopting");
      setIsLoading(false);
      handleShow();
    } catch (err) {
      alert(err);
      console.log(err);
      navigate("/");
    }
  }

  async function handleReturnPet() {
    setIsLoading(true);
    const petId = id.id;
    const userId = activeUser.id;
    try {
      const res = await returnPet(petId, userId);
      setUserAction("returnning");
      setIsLoading(false);
      handleShow();
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <Container className="p-container">
      {console.log(pet, petStatus)}
      {userAction && (
        <PetModal
          name={pet.name}
          action={userAction}
          show={show}
          handleClose={handleClose}
        />
      )}
      {pet && (
        <Card className="my-3 c-card">
          {/* <Row> */}
          {/* <Col md={3}> */}
          {pet.picture ? (
            <Card.Img
              variant="top"
              src={pet.picture}
              width={100}
              height={500}
            />
          ) : (
            <p className="ms-1">no available img</p>
          )}

          {/* </Col>
                <Col md={9}> */}
          <Card.Body>
            <Card.Title className="card-title">
              {pet.name}, {pet.adoption_status}
              {pet.adoption_status !== "Adopted" && petStatus === null && (
                  // <FontAwesomeIcon icon={faStar} onClick={handleSavePet}></FontAwesomeIcon>
                  // <FontAwesomeIcon icon={["fal", "faStar}/>
                  
                  <BookmarkHeart className="mx-3 clickable"
                  onClick={handleSavePet}
                  
                  ></BookmarkHeart>
                // <Button
                //   className="mx-5 btn1"
                //   variant="info"
                //   size="sm"
                //   type="button"
                //   onClick={handleSavePet}
                // >
                //   Add to My Pets
                // </Button>
              )}
              {petStatus === "save" && (
                //  <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                //  <FontAwesomeIcon icon={["fal", "faStar"]}/>
                <BookmarkHeartFill className="mx-3 clickable"
                onClick={handleDeleteSavedPet}

                >

                </BookmarkHeartFill>
                // <Button
                //   className="mx-5 btn1"
                //   variant="info"
                //   size="sm"
                //   type="button"
                //   onClick={handleDeleteSavedPet}
                // >
                //   Remove from my pets
                // </Button>
              )}
            </Card.Title>
            <div className="one-line">  <div> <Card.Text className="c-bold">General characteristic</Card.Text>
            <Card.Text>Type of pet: {pet.type}</Card.Text>
            <Card.Text>Breed: {pet.breed}</Card.Text>
            <Card.Text>Height: {pet.height}cm</Card.Text>
            <Card.Text>Weight: {pet.weight}Kg</Card.Text>
            <Card.Text>Color: {pet.color}</Card.Text>
            </div>
            <div> <Card.Text className="c-bold">Aditional information</Card.Text>
            <Card.Text>Bio: {pet.bio}</Card.Text>
            {pet.dietary_restrictions ? (
              <Card.Text>
                Dietary: {JSON.parse(pet.dietary_restrictions).join()}
              </Card.Text>
            ) : (
              <Card.Text>Dietary: no restrictions</Card.Text>
            )}
            <Card.Text>
              Hypoallergnic: {pet.hypoallergenic ? "yes" : "no"}
            </Card.Text></div></div>
          </Card.Body>
          {/* </Col>
            </Row> */}
          {pet.adoption_status === "Available" &&
            (petStatus === null || petStatus === "save") && (
              <div className="mb-2 align">
                <Button
                  variant="success"
                  size="sm"
                  type="button"
                  onClick={() => handleAdoptOrFosterPet("adopt")}
                >
                  Addopt
                </Button>{" "}
                <Button
                  className="mx-2"
                  variant="success"
                  size="sm"
                  type="button"
                  onClick={() => handleAdoptOrFosterPet("foster")}
                >
                  Foster
                </Button>
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </div>
            )}
          <div className="mb-2 align">
            {pet.adoption_status === "Fostered" && petStatus !== "adopt" && (
              <div className="mb-2">
                <Button
                  className="mx-2"
                  variant="success"
                  size="sm"
                  type="button"
                  onClick={() => handleAdoptOrFosterPet("adopt")}
                >
                  Addopt
                </Button>{" "}
              </div>
            )}
            {((pet.adoption_status === "Adopted" && petStatus === "adopt") ||
              (pet.adoption_status == "Fostered" &&
                petStatus === "foster")) && (
              <div className="mb-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => handleReturnPet()}
                >
                  Return
                </Button>{" "}
              </div>
            )}
          </div>
        </Card>
      )}
    </Container>
  );
}
export default PetDetailsPage;

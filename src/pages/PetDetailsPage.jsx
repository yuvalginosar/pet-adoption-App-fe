import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
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
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import { faDog, faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import errorToDisplay from "../errorHandeling";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
        const [curPet, petStatusForUser] = await Promise.all([
          getPetById(id.id),
          getStatusByIds(id.id, activeUser.id),
        ]);
        setPet(curPet);
        currentPetStatus(petStatusForUser);
      } catch (err) {
        alert(errorToDisplay(err));
      }
    }
    fetchPets();
  }, [isSaved, isLoading]);

  function currentPetStatus(array) {
    if (array.length === 0) {
      setPetStatus(null);
    } else {
      setPetStatus(array[0].status);
    }
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
      alert(errorToDisplay(err));
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
      alert(errorToDisplay(err));
    }
  }

  async function handleAdoptOrFosterPet(action) {
    setIsLoading(true);
    const curPetStatus = petStatus;
    const petId = id.id;
    const userId = activeUser.id;
    try {
      const res = await adoptOrFosterPet(petId, userId, action, curPetStatus);
      if (action === "foster") setUserAction("fostering");
      if (action === "adopt") setUserAction("adopting");
      setIsLoading(false);
      handleShow();
    } catch (err) {
      alert(errorToDisplay(err));
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
      alert(errorToDisplay(err));
    }
  }
  const dogIcon = <FontAwesomeIcon icon={faDog} />;
  const catIcon = <FontAwesomeIcon icon={faCat} />;

  function renderTooltip(props){ 
    if(petStatus === null) {return(
    <Tooltip {...props}>Add to my saved pets</Tooltip>
  )}else if (petStatus === 'save')  {return(
    <Tooltip {...props}>Remove from my saved pets</Tooltip>
  )}
};

  function buttonComponent(action, handleFunction) {
    return (
      <Button
        className="me-2"
        variant="outline-success"
        size="sm"
        type="button"
        onClick={() => handleFunction(action.toLowerCase())}
      >
        {action}
      </Button>
    );
  }
  function renderButtonsAdoptFoster() {
    return (
      <div className="mb-2 align">
        {buttonComponent("Adopt", handleAdoptOrFosterPet)}
        {buttonComponent("Foster", handleAdoptOrFosterPet)}
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
    );
  }

  return (
    <Container className="p-container my-2">
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
          {pet.picture ? (
            <Card.Img
              variant="top"
              src={pet.picture}
            />
          ) : (
            <p className="ms-1">no available img</p>
          )}
          <Card.Body>
            <Card.Title className="card-title">
              
              <span className="c-bold">{pet.name}</span>, {pet.adoption_status}  
              {pet.type === "dog" ? (
                <span className="ms-4">{dogIcon}</span>
              ) : (
                <span>{catIcon}</span>
              )}{" "}
              {pet.adoption_status !== "Adopted" && petStatus === null && (
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                <BookmarkHeart
                  className="mx-1 clickable"
                  onClick={handleSavePet}
                  size={25}
                ></BookmarkHeart>
                </OverlayTrigger>
              )}
              {petStatus === "save" && (
                                <OverlayTrigger placement="top" overlay={renderTooltip}>

                <BookmarkHeartFill
                  className="mx-1 clickable"
                  onClick={handleDeleteSavedPet}
                  size={25}
                ></BookmarkHeartFill>
                                </OverlayTrigger>

              )}
            </Card.Title>
            <div className="one-line">
              {" "}
              <div>
                {" "}
                <Card.Text className="c-bold">General Characteristic</Card.Text>
                <Card.Text>Breed: {pet.breed}</Card.Text>
                <Card.Text>Height: {pet.height}cm</Card.Text>
                <Card.Text>Weight: {pet.weight}Kg</Card.Text>
                <Card.Text>Color: {pet.color}</Card.Text>
              </div>
              <div className="mt-5">
                {" "}
                <Card.Text className="c-bold">Aditional Information</Card.Text>
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
                </Card.Text>
              </div>
            </div>
          </Card.Body>
          {pet.adoption_status === "Available" &&
            (petStatus === null || petStatus === "save") &&
            renderButtonsAdoptFoster()}
          <div className="mb-2 align">
            {pet.adoption_status === "Fostered" && petStatus !== "adopt" && (
              <div className="mb-2">
                {buttonComponent("Adopt", handleAdoptOrFosterPet)}
              </div>
            )}
            {((pet.adoption_status === "Adopted" && petStatus === "adopt") ||
              (pet.adoption_status == "Fostered" &&
                petStatus === "foster")) && (
              <div className="mb-2">
                <Button
                  variant="outline-secondary"
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

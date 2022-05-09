import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PetModal({ name, action, show, handleClose }) {
  const navigate = useNavigate();
  const [titleToDisplay, setTitleToDisplay] = useState("");

  useEffect(() => {
    function editTitle() {
      switch (action) {
        case "adopting": {
          setTitleToDisplay(`Thank you for ${action} ${name} !`);
          break;
        }
        case "fostering": {
          setTitleToDisplay(`Thank you for ${action} ${name} !`);
          break;
        }
        case "returnning": {
          setTitleToDisplay(
            `We sorry to here you would like ${action} ${name}`
          );
          break;
        }
        default: {
          console.log("hi");
          break;
        }
      }
    }
    editTitle();
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{titleToDisplay}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your request was registered succesfully</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => navigate("/Pets")}>
          Go to my pets
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PetModal;

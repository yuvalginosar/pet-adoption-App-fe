import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
function PetCard({pet}) {
  const navigate = useNavigate()
  const { activeUser } = useAuth();
  const renderTooltip = props => (
    <Tooltip {...props}>login for mor details</Tooltip>
  );
    return (
        <Card >

        {pet.picture ? <Card.Img variant="top" fluid='true' src={pet.picture} width={100} height={250}/> : <p>'no img'</p>}
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
              <p>adoption status: {pet.adoption_status}</p>
          </Card.Text>
        </Card.Body>
       {activeUser ? <Button
          variant="secondary" 
          size="sm"
          onClick={() => navigate(`/Pets/${pet.id}`)}
        >
          
            See more
        </Button>
        : 
        <OverlayTrigger placement="top" overlay={renderTooltip}>
        <Button
        variant="secondary" 
        size="sm"
        // disabled ={true}
      >
        
          See more
      </Button>
      </OverlayTrigger>
      }
      </Card>
    );
}

export default PetCard;
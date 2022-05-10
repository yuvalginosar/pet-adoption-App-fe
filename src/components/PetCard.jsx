import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { faDog, faCat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function PetCard({pet}) {
  const navigate = useNavigate()
  const { activeUser } = useAuth();
  const renderTooltip = props => (
    <Tooltip {...props}>login for more details</Tooltip>
  );
  const dogIcon = <FontAwesomeIcon icon={faDog} />
  const catIcon = <FontAwesomeIcon icon={faCat} />
    return (
        <Card >

        {pet.picture ? <Card.Img variant="top" fluid='true' src={pet.picture} width={100} height={250}/> : <p>'no img'</p>}
        <Card.Body>
          <Card.Title>{pet.name} {pet.type ==='dog' ? <span>{dogIcon}</span> : <span>{catIcon}</span>}</Card.Title>
          <Card.Text>
              Adoption status: {pet.adoption_status}
          </Card.Text>
        </Card.Body>
       {activeUser ? <Button
          variant="outline-info" 
          size="sm"
          onClick={() => navigate(`/Pets/${pet.id}`)}
        >
          
            See more
        </Button>
        : 
        <OverlayTrigger placement="top" overlay={renderTooltip}>
        <Button
        variant="outline-info" 
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
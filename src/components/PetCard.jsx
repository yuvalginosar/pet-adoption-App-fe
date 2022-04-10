import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PetCard({pet}) {
    const navigate = useNavigate()
    return (
        <Card >

        {pet.picture ? <Card.Img variant="top"  src={pet.picture} /> : <p>'no img'</p>}
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
              <p>adoption status: {pet.adoptionStatus}</p>
          </Card.Text>
        </Card.Body>
        <Button
        variant="secondary" 
        size="sm"
          // onClick={() => navigate("/pets/" + pet.id)}>
          >
            See more
        </Button>
      </Card>
    );
}

export default PetCard;
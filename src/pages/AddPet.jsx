import React, { useState, Component, useRef  } from 'react';

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { addPet } from '../services/server';
import { Button, Form, Modal, Alert, Container, Dropdown } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
function AddPet(props) {
    const navigate = useNavigate();


    const Dietaryoptions = [
        { value: 'Low fat', label: 'Low fat' },
        { value: 'Sensative Stomach', label: 'Sensative Stomach' },
        { value: 'Joint Care', label: 'Joint Care' },
        { value: 'Kidney Care', label: 'Kidney Care' },
        { value: 'Poultry Allergy', label: 'Poultry Allergy' },
        { value: 'Beef Allergy', label: 'Beef Allergy' }

      ]
      const animatedComponents = makeAnimated();

    // const adoptingOptions = [{ value: 'Low fat', label: 'Low fat' },
    // { value: 'Sensative Stomach', label: 'Sensative Stomach' },
    // { value: 'Joint Care', label: 'Joint Care' }]
    
    const [type, setType] = useState('dog')
    const [name, setName] = useState("");
    const [adoptionStatus, setAdoptionStatus] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [color, setColor] = useState("");
    const [bio, setBio] = useState("");
    const [breed , setBreed ] = useState("");
    const [hypoallergenic  , setHypoallergenic  ] = useState(false);
    const [dietary, setDietary] = useState()
    const { activeUser } = useAuth();
    const fileImgRef = useRef();

    async function onAddPet () {
        const petDietary = JSON.stringify(dietary.map((val) => val.value))
        const response = await addPet(
            {
            type, 
            name, 
            adoptionStatus, 
            weight,
            height,
            color,
            bio,
            breed,
            hypoallergenic,
            petDietary,
            image: fileImgRef.current.files[0]
        })
        navigate('/');
    }
        console.log(adoptionStatus)
    return (
        <Container> 
            <h1>Add a new pet</h1>
            <Form>
                <Dropdown className='my-3'>
                    <Dropdown.Toggle variant="secondary" size='sm' id="dropdown-basic">
                        Type: {type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item 
                            onClick={() => setType('Dog')}
                        >Dog</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setType('Cat')}
                        >Cat</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                {/* <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={adoptingOptions[0]}
                   
                    options={adoptingOptions}
                /> */}


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>


                    <Form.Label className='mt-3'>Upload pets picture</Form.Label>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control ref={fileImgRef} type="file" accept="image/*" />
                    </Form.Group>


                <Dropdown className='my-3'>
                    <Dropdown.Toggle variant="secondary" size='sm' id="dropdown-basic">
                    Adoption Status: {adoptionStatus}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item 
                            onClick={() => setAdoptionStatus('Available')}
                        >Available</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setAdoptionStatus('Fostered')}
                        >Fostered</Dropdown.Item>
                         <Dropdown.Item 
                            onClick={() => setAdoptionStatus('Adopted')}
                        >Adopted</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="number" 
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="number" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" 
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" 
                            placeholder="write a short description" 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>breed of the pet</Form.Label>
                        <Form.Control type="text" 
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Label>Dietery restrictions</Form.Label>

                    <Select 
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={Dietaryoptions} 
                        onChange={(e) => setDietary(e)}
                        />

                    <Dropdown className='my-4'>
                    <Dropdown.Toggle variant="secondary" size='sm' id="dropdown-basic">
                        is hypoallergenic: { hypoallergenic? 'yes' : 'no'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item 
                            onClick={() => setHypoallergenic(true)}
                        >yes</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setHypoallergenic(false)}
                        >no</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Form>
                <Button className='my-2'
                    variant="primary" 
                    onClick={onAddPet}>
                    Add {name}
                </Button>
                
        </Container>
    );
}

export default AddPet;
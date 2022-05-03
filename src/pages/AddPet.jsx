import React, { useState, Component, useRef  } from 'react';

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { addPet } from '../services/server';
import { Button, Form, Modal, Alert, Container, Dropdown, Spinner } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
function AddPet(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [ errors, setErrors ] = useState({})
    const Dietaryoptions = [
        { value: 'none', label: 'none' },
        { value: 'Low fat', label: 'Low fat' },
        { value: 'Sensative Stomach', label: 'Sensative Stomach' },
        { value: 'Joint Care', label: 'Joint Care' },
        { value: 'Kidney Care', label: 'Kidney Care' },
        { value: 'Poultry Allergy', label: 'Poultry Allergy' },
        { value: 'Beef Allergy', label: 'Beef Allergy' }
      ]
      const animatedComponents = makeAnimated();

    
    
    const [type, setType] = useState('')
    const [name, setName] = useState("");
    const [adoptionStatus, setAdoptionStatus] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [color, setColor] = useState("");
    const [bio, setBio] = useState("");
    const [breed , setBreed ] = useState("");
    const [hypoallergenic, setHypoallergenic  ] = useState(false);
    const [dietary, setDietary] = useState()
    const { activeUser } = useAuth();
    const fileImgRef = useRef();

    async function onAddPet () {
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
        setErrors(newErrors)
        } else {
            setIsLoading(true)
            const petDietary = dietary ? JSON.stringify(dietary.map((val) => val.value)) : ""
            const petDetails = {type, name, adoptionStatus, weight, height, bio, color, breed}
            if (hypoallergenic) petDetails['hypoallergenic'] = hypoallergenic
            if (petDietary.length > 0) petDetails.petDietary = petDietary
            if (fileImgRef.current.files[0]) petDetails['image'] = fileImgRef.current.files[0]
            const response = await addPet(petDetails)
            setIsLoading(false)
            navigate('/admin');
        }
    }
    function findFormErrors(){
        const newErrors = {}
        if ( !name || name === '' ) newErrors.name = 'cannot be blank!'
        else if ( name.length > 30 ) newErrors.name = 'name is too long!'
        if ( !type || type === '' ) newErrors.type = 'must include a name'
        if ( !adoptionStatus ) newErrors.adoptionStatus = 'must mention adoption status'
        if ( weight === '' ) newErrors.weight = 'cannot be blank!'
        if ( height === '' ) newErrors.height = 'cannot be blank!'
        if ( color === '' ) newErrors.color = 'cannot be blank!'
        if ( breed === '' ) newErrors.breed = 'cannot be blank!'

    
        return newErrors
    }

    function setValues(setFunction, value, fieldName){
        setFunction(value)
        setErrors({...errors, [fieldName]: null})
    }

    return (
        <Container> 
            <h1>Add a new pet</h1>
            <Form>
            <Form.Label className='my-3'>Is it a dog or a cat?</Form.Label>
                <Form.Select 
                  onChange={(e) => setValues(setType, e.target.value, "type")}
                  isInvalid={ !!errors.type }
                >
                    <option >Select</option>
                    <option value='dog'>dog</option>
                    <option value='cat'>cat</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                        {errors.type }
                </Form.Control.Feedback>

                <Form.Group className="my-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" 
                        required={true}
                        value={name}
                        onChange={(e) => setValues(setName, e.target.value, "name")}
                        isInvalid={ !!errors.name }
                    />
                    {/* <Form.Text className="text-muted"></Form.Text> */}
                    <Form.Control.Feedback type='invalid'>
                        {errors.name }
                    </Form.Control.Feedback>
                </Form.Group>


                    <Form.Label className='my-3'>Upload pets picture</Form.Label>
                    <Form.Group controlId="formFile">
                        <Form.Control ref={fileImgRef} type="file" accept="image/*" />
                    </Form.Group>

                <Form.Label className='mt-3'>Adoption Status</Form.Label>
                <Form.Select 
                  onChange={(e) => setValues(setAdoptionStatus, e.target.value, "adoptionStatus")}
                  isInvalid={ !!errors.adoptionStatus }
                >   
                    <option >Select Status</option>
                    <option value='Available'>Available</option>
                    <option value='Fostered'>Fostered</option>
                    <option value='Adopted'>Adopted</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                            {errors.adoptionStatus }
                </Form.Control.Feedback>

                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="number" 
                            value={weight}
                            onChange={(e) => setValues(setWeight, e.target.value, "weight")}
                            isInvalid={ !!errors.weight }

                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <Form.Control.Feedback type='invalid'>
                            {errors.weight }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="number" 
                            value={height}
                            onChange={(e) => setValues(setHeight, e.target.value, "height")}
                            isInvalid={ !!errors.height }
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <Form.Control.Feedback type='invalid'>
                            {errors.height }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" 
                            value={color}
                            onChange={(e) => setValues(setColor, e.target.value, "color")}
                            isInvalid={ !!errors.color }
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <Form.Control.Feedback type='invalid'>
                            {errors.color }
                        </Form.Control.Feedback>
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
                            onChange={(e) => setValues(setBreed, e.target.value, "breed")}
                            isInvalid={ !!errors.breed }
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.breed }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Label>Dietery restrictions</Form.Label>

                    <Select 
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti
                        options={Dietaryoptions} 
                        onChange={(e) => setDietary(e)}
                        />


                <Form.Label className='my-3'>Is {name} Hypoallergenic?</Form.Label>
                <Form.Select 
                  onChange={(e) => setHypoallergenic(e.target.value)}
                >
                    <option > choose</option>
                    <option value={true}> yes</option>
                    <option value={false}>no</option>
                </Form.Select>


                <Button className='my-3'
                    variant="secondary" 
                    onClick={onAddPet}
                    style={{width: "100%", hover: "pointer"}}
                    >
                    {isLoading && <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                />}
                    Add {name}

                </Button>
                </Form>
                
        </Container>
    );
}

export default AddPet;
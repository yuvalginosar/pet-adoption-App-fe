import React, { useState, Component, useRef, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addPet } from "../services/server";
import { Button, Form, Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, updatePetDetails } from "../services/server.js";

function EditPet(props) {
  const navigate = useNavigate();
  const [pet, setPet] = useState("");

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [bio, setBio] = useState("");
  const [breed, setBreed] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietary, setDietary] = useState();
  const { activeUser } = useAuth();
  const fileImgRef = useRef();

  const id = useParams();

  useEffect(() => {
    async function fetchPets() {
      const curPet = await getPetById(id.id);
      setPet(curPet);
      console.log(pet);
    }
    fetchPets();
  }, []);

  async function onAddPet() {
    const petDietary = dietary
      ? JSON.stringify(dietary.map((val) => val.value))
      : "";

    const petDetails = {};
    // const teypeAttr = (type.length > 0) && {type}
    // const res = {...teypeAttr, }
    if (type.length > 0) petDetails["type"] = type;
    if (name.length > 0) petDetails["name"] = name;
    if (adoptionStatus.length > 0)
      petDetails["adoption_status"] = adoptionStatus;
    if (weight.length > 0) petDetails["weight"] = weight;
    if (height.length > 0) petDetails["height"] = height;
    if (bio.length > 0) petDetails["bio"] = bio;
    if (breed.length > 0) petDetails["breed"] = breed;
    if (hypoallergenic) petDetails["hypoallergenic"] = hypoallergenic;
    if (petDietary.length > 0) petDetails["dietary_restrictions"] = petDietary;
    if (fileImgRef.current.files[0])
      petDetails["image"] = fileImgRef.current.files[0];

    const response = await updatePetDetails(petDetails, id.id);
    console.log(response);
    navigate("/admin");
  }

  const Dietaryoptions = [
    { value: "none", label: "none" },
    { value: "Low fat", label: "Low fat" },
    { value: "Sensative Stomach", label: "Sensative Stomach" },
    { value: "Joint Care", label: "Joint Care" },
    { value: "Kidney Care", label: "Kidney Care" },
    { value: "Poultry Allergy", label: "Poultry Allergy" },
    { value: "Beef Allergy", label: "Beef Allergy" },
  ];
  const animatedComponents = makeAnimated();

  return (
    <Container>
      <h3>Edit {pet.name} details</h3>
      <Form>
        <Form.Label className="my-3">Is it a dog or a cat?</Form.Label>
        <Form.Select
          onChange={(e) => setType(e.target.value)}
        >
          <option> {pet.type}</option>
          <option value="dog">dog</option>
          <option value="cat">cat</option>
        </Form.Select>

        <Form.Group className="my-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={pet.name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Label className="my-3">Upload pets picture</Form.Label>
        <Form.Group controlId="formFile">
          <Form.Control ref={fileImgRef} type="file" accept="image/*" />
        </Form.Group>

        <Form.Label className="mt-3">
          Adoption Status: currently {pet.adoption_status}
        </Form.Label>
        <Form.Select onChange={(e) => setAdoptionStatus(e.target.value)}>
          <option value="Available">Available</option>
          <option value="Fostered">Fostered</option>
          <option value="Adopted">Adopted</option>
        </Form.Select>

        <Form.Group className="mt-3" controlId="formBasicEmail">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={pet.weight}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={pet.height}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder={pet.color}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            placeholder={pet.bio}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>breed of the pet</Form.Label>
          <Form.Control
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder={pet.breed}
          />
        </Form.Group>

        <Form.Label>Dietery restrictions</Form.Label>

        <Select
          placeholder={
            pet.dietary_restrictions
              ? JSON.parse(pet.dietary_restrictions).join()
              : "unknown"
          }
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          options={Dietaryoptions}
          onChange={(e) => setDietary(e)}
        />

        <Form.Label className="my-3">Is {name} Hypoallergenic?</Form.Label>
        <Form.Select onChange={(e) => setHypoallergenic(e.target.value)}>
          <option> {pet.hypoallergenic ? "yes" : "no"}</option>
          <option value={true}> yes</option>
          <option value={false}>no</option>
        </Form.Select>
      </Form>
      <Button
        className="my-3"
        variant="secondary"
        onClick={onAddPet}
        style={{ width: "100%", hover: "pointer" }}
      >
        Edit
      </Button>
    </Container>
  );
}

export default EditPet;

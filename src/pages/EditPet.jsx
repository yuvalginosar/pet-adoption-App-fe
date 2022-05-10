import React, { useState, Component, useRef, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Button, Form, Container, Image } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, updatePetDetails } from "../services/server.js";
import "../components/forms.css";
import errorToDisplay from "../errorHandeling";
function EditPet(props) {
  const navigate = useNavigate();
  const [pet, setPet] = useState("");

  const [type, setType] = useState("");
  const [name, setName] = useState("");
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
      try {
        const curPet = await getPetById(id.id);
        setPet(curPet);
      } catch (err) {
        alert(errorToDisplay(err));
      }
    }
    fetchPets();
  }, []);

  async function onAddPet() {
    const petDietary = dietary
      ? JSON.stringify(dietary.map((val) => val.value))
      : "";

    const petDetails = {};
    if (type.length > 0) petDetails["type"] = type;
    if (name.length > 0) petDetails["name"] = name;
    if (weight.length > 0) petDetails["weight"] = weight;
    if (height.length > 0) petDetails["height"] = height;
    if (bio.length > 0) petDetails["bio"] = bio;
    if (breed.length > 0) petDetails["breed"] = breed;
    if (hypoallergenic) petDetails["hypoallergenic"] = hypoallergenic;
    if (petDietary.length > 0) petDetails["dietary_restrictions"] = petDietary;
    if (fileImgRef.current.files[0])
      petDetails["image"] = fileImgRef.current.files[0];
    try {
      const response = await updatePetDetails(petDetails, id.id);
      navigate("/admin");
    } catch (err) {
      alert(err);
      console.log(err);
      navigate("/admin");
    }
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
    <Container className="p-container">
      <h4 className="my-3 headline">Edit {pet.name} details</h4>
      <Form className="c-form">
        <Form.Label className="my-3">Is it a dog or a cat?</Form.Label>
        <Form.Select onChange={(e) => setType(e.target.value)}>
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

        <Form.Label className="my-3">
          <Image
            src={pet.picture}
            width={100}
            height={100}
            rounded={true}
          ></Image>
        </Form.Label>
        <Form.Group controlId="formFile">
          <Form.Control ref={fileImgRef} type="file" accept="image/*" />
        </Form.Group>

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
          <Form.Label>Breed</Form.Label>
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
        <Button
          className="my-3"
          variant="outline-secondary"
          onClick={onAddPet}
          style={{ width: "100%", hover: "pointer" }}
        >
          Edit
        </Button>
      </Form>
    </Container>
  );
}

export default EditPet;

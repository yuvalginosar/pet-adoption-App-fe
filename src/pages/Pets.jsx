import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import petsContext from '../contexts/petsContext';
import mockPets from '../data/mockPets';

function Pets(props) {
    const {pets} = useContext(petsContext)
    // const [pets, setPets] = useState([]);
    // const [results, setResults] = useState([]);
    // const [searchText, setSearchText] = useState("");
  
    // useEffect(() => {
    //   async function fetchPets() {
    //     const searchURL = `https://localhost:8080=${searchText}`;
  
    //     const response = await axios.get(searchURL);
    //     setResults(response.data.results);
    //   }
  
    //   if (searchText) {
    //     fetchPets();
    //   } else {
    //     setResults([]);
    //   }
    // }, [searchText]);
  
    // function handleResultSelected(index) {
    //     setPets(pets.concat(results[index]));
    //     setResults([]);
    //     setSearchText("");
    // }

    return (
        <Container className="p-pets">
            <h1>Mt Pets</h1>
            <Row xs={1} md={2} className="g-4">
            {mockPets.map((pet, key) => (
                <Col>
                    <PetCard
                        key={key}
                        pet={pet}
                        />
                </Col>
            ))}
            </Row>
      </Container>
    );
}

export default Pets;
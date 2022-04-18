import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080',
});


async function login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (err) {
      console.log(err);
    }
}

async function signup(firstName,lastName, email, pwd, phoneNumber) {
  try {
    const response = await api.post('/signup', { firstName, lastName, email, pwd, phoneNumber });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getPets(adoptionStatus='', type='', height='', weight='', name='') {
  let queryString = ''
  if (adoptionStatus.length  > 0) queryString += `adoption_status=${adoptionStatus}`
  if (type.length  > 0) queryString += `&type=${type}`
  if (height.length  > 0) queryString += `&height=${height}`
  if (weight.length  > 0) queryString += `&weight=${weight}`
  if (name.length  > 0) queryString += `&name=${name}`

  try {
    const response = await api.get(`/pet?${queryString}`);
    console.log(response)
    return (response.data);
  } catch (err) {
    console.log(err);
  }
}
async function getPetById(id) {
  try {
    const response = await api.get(`/pet/${id}`);
    console.log(response)
    return (response.data[0]);
  } catch (err) {
    console.log(err);
  }
}

async function getUserPetsById(id) {
  try {
    const response = await api.get(`/pet/user/${id}`);
    console.log(response)
    return (response.data);
  } catch (err) {
    console.log(err);
  }
}

export {login, signup, getPets, getPetById, getUserPetsById}
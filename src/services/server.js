import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});


async function login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      console.log(response)
      return response.data.user;
    } catch (err) {
      alert(err)
      console.log(err);
      throw new Error(err)
    }
}

async function signup(newUser) {
  try {
    const response = await api.post('/signup', newUser);
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

async function savePet(petId, userId){
try {
  const response = await api.post(`/pet/${petId}/save`, {id: userId})
  console.log(response)
  return (response.data);
} catch (err) {
  console.log(err);
}
}

async function deleteSavedPet(petId, userId){
  try {
    const response = await api.delete(`/pet/${petId}/save`, { data: {id: userId}})
    return (response);
  } catch (err) {
    console.log(err);
  }
  }

  async function adoptOrFosterPet(petId, userId, action, curPetStatus){
    try {
      const response = await api.post(`/pet/${petId}/adopt`, {id: userId, type: action, curPetStatus: curPetStatus})
      return (response.data);
    } catch (err) {
      console.log(err);
    }
    }

    async function returnPet(petId, userId){
      try {
        const response = await api.post(`/pet/${petId}/return`, {id: userId})
        return (response.data);
      } catch (err) {
        console.log(err);
      }
      }

async function addPet(newPet) {
  const formData = new FormData();
  for(let [key, value] of Object.entries(newPet)) {
    if (key === 'image') {
      formData.append(`${key}`, value, value.name)
    }
    else {formData.append(`${key}`, value)}
  }
  try {
    const response = await api.post(`/pet`, formData)
    return (response.data);
  } catch (err) {
    console.log(err);
  }
}

async function updateUserDetails(detailsToUpdate) {
  
  try {
    const response = await api.put('/user/:id', detailsToUpdate )
    return(response.data)
  } catch (err) {
    console.error(err)
  }
}

async function updatePetDetails(detailsToUpdate, id) {
  console.log(detailsToUpdate)
  const formData = new FormData();
  for(let [key, value] of Object.entries(detailsToUpdate)) {
    if (key === 'image') {
      formData.append(`${key}`, value, value.name)
    }
    else {formData.append(`${key}`, value)}
  }
  try {
  //   for (var value of formData.values()) {
  //     console.log(typeof(value));
  //  }
    const response = await api.put(`/pet/${id}`, formData )
    return(response.data)
  } catch (err) {
    console.error(err)
  }
}
async function getUsers() {
  try {
    const response = await api.get('/user')
    return(response.data)
  } catch (err) {
    console.error(err)
  }
}

async function getUserFullById(id) {
  try {
    const response = await api.get(`/user/${id}/full`)
    console.log(response)
    return(response.data)
  } catch (err) {
    console.error(err)
  }
}

export {login, signup, getPets, getPetById, getUserPetsById, savePet, deleteSavedPet, adoptOrFosterPet, returnPet, addPet, updateUserDetails, getUsers, getUserFullById, updatePetDetails}
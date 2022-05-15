import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:8080",
baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

async function login(email, password) {
  const response = await api.post("/login", { email, password });
  return response.data.user;
}
async function logout() {
  const response = await api.get("/user/logout");
}
async function signup(newUser) {
  const response = await api.post("/signup", newUser);
  return response.data;
}

async function getPets(
  adoptionStatus = "",
  type = "",
  height = "",
  weight = "",
  name = ""
) {
  let queryString = "";
  if (adoptionStatus.length > 0)
    queryString += `adoption_status=${adoptionStatus}`;
  if (type.length > 0) queryString += `&type=${type}`;
  if (height.length > 0) queryString += `&height=${height}`;
  if (weight.length > 0) queryString += `&weight=${weight}`;
  if (name.length > 0) queryString += `&name=${name}`;

  const response = await api.get(`/pet?${queryString}`);
  return response.data;
}
async function getPetById(id) {
  const response = await api.get(`/pet/${id}`);
  return response.data[0];
}

async function getUserPetsById(id) {
  const response = await api.get(`/pet/user/${id}`);
  return response.data;
}

async function savePet(petId, userId) {
  const response = await api.post(`/pet/${petId}/save`, { id: userId });
  return response.data;
}

async function deleteSavedPet(petId, userId) {
  const response = await api.delete(`/pet/${petId}/save`, {
    data: { id: userId },
  });
  return response;
}

async function adoptOrFosterPet(petId, userId, action, curPetStatus) {
  const response = await api.post(`/pet/${petId}/adopt`, {
    id: userId,
    type: action,
    curPetStatus: curPetStatus,
  });
  return response.data;
}

async function returnPet(petId, userId) {
  const response = await api.post(`/pet/${petId}/return`, { id: userId });
  return response.data;
}

async function addPet(newPet) {
  const formData = new FormData();
  for (let [key, value] of Object.entries(newPet)) {
    if (key === "image") {
      formData.append(`${key}`, value, value.name);
    } else {
      formData.append(`${key}`, value);
    }
  }

  const response = await api.post(`/pet`, formData);
  return response.data;
}

async function updateUserDetails(detailsToUpdate) {
  const response = await api.put("/user/:id", detailsToUpdate);
  return response.data;
}

async function updatePetDetails(detailsToUpdate, id) {
  const formData = new FormData();
  for (let [key, value] of Object.entries(detailsToUpdate)) {
    if (key === "image") {
      formData.append(`${key}`, value, value.name);
    } else {
      formData.append(`${key}`, value);
    }
  }
  const response = await api.put(`/pet/${id}`, formData);
  return response.data;
}
async function getUsers() {
  const response = await api.get("/user");
  return response.data;
}

async function getUserFullById(id) {
  const response = await api.get(`/user/${id}/full`);
  return response.data;
}
async function getStatusByIds(petid, userid) {
  const response = await api.get(`/pet/${petid}/user/${userid}`);
  return response.data;
}

export {
  login,
  signup,
  getPets,
  getPetById,
  getUserPetsById,
  savePet,
  deleteSavedPet,
  adoptOrFosterPet,
  returnPet,
  addPet,
  updateUserDetails,
  getUsers,
  getUserFullById,
  updatePetDetails,
  getStatusByIds,
  logout,
};

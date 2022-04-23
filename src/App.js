import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
// import AuthProvider from "./components/AuthProvider";
import PetsNavbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import petsContext from "./contexts/petsContext";
import PetDetailsPage from "./pages/PetDetailsPage";
import SearchBar from "./components/SearchBar";
import LoginPage from "./components/LoginPage";
import AddPet from "./pages/AddPet";
// import SignUp from "./components/SignUp";


function App() {
  const pets = ['dog1', 'dog2', 'dog3', 'cat1', 'cat2']

  return (
    <AuthProvider>
      <petsContext.Provider value={{pets}}>
        <PetsNavbar />
        <Routes>
          <Route path= '/'> 
            <Route index element={<HomePage />} />
            <Route path= 'Profile' element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>} />
            <Route path="SearchBar" element={<ProtectedRoutes> <SearchBar /> </ProtectedRoutes>} />
            <Route path="addPet" element={<ProtectedRoutes> <AddPet /> </ProtectedRoutes>} />
            <Route path="Pets" > 
              <Route index element={ <ProtectedRoutes> <Pets /> </ProtectedRoutes>} />
              <Route path=":id" element={<ProtectedRoutes> <PetDetailsPage /> </ProtectedRoutes>} />
            </Route>
          </Route>

        </Routes>
      </petsContext.Provider> 
    </AuthProvider>
  );
}

export default App;

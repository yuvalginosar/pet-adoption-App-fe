import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
// import AuthProvider from "./components/AuthProvider";
import PetsNavbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import petsContext from "./contexts/petsContext";
import PetDetailsPage from "./pages/PetDetailsPage";

// import LoginPage from "./components/LoginPage";
// import SignUp from "./components/SignUp";


function App() {
  const pets = ['dog1', 'dog2', 'dog3', 'cat1', 'cat2']

  return (
    <AuthProvider>
      <petsContext.Provider value={{pets}}>
        <PetsNavbar />
        <Routes>
          <Route path= '/' element={<HomePage />} />
          <Route path= 'Profile' element={<Profile />} />
          <Route path="Pets" element={<Pets />} />
          <Route path="PetDetailsPage" element={<PetDetailsPage />} />

        </Routes>
      </petsContext.Provider> 
    </AuthProvider>
  );
}

export default App;

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import PetsNavbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import PetDetailsPage from "./pages/PetDetailsPage";
import SearchBar from "./components/SearchBar";
import AddPet from "./pages/AddPet";
import Dashboard from "./pages/Dashboard";
import UserDetailedPage from "./pages/UserDetailedPage";
import EditPet from "./pages/EditPet";
import AdminProtected from "./components/AdminProtected";

function App() {
  return (
    <AuthProvider>
      {/* <petsContext.Provider value={{pets}}> */}
      <PetsNavbar />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route
            path="Profile"
            element={
              <ProtectedRoutes>
                {" "}
                <Profile />{" "}
              </ProtectedRoutes>
            }
          />
          <Route path="SearchBar" element={<SearchBar />} />
          <Route
            path="addPet"
            element={
              <ProtectedRoutes>
                {" "}
                <AddPet />{" "}
              </ProtectedRoutes>
            }
          />
          <Route path="Pets">
            <Route
              index
              element={
                <ProtectedRoutes>
                  {" "}
                  <Pets />{" "}
                </ProtectedRoutes>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoutes>
                  {" "}
                  <PetDetailsPage />{" "}
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route path="admin">
            <Route
              index
              element={
                <AdminProtected>
                  <Dashboard />
                </AdminProtected>
              }
            ></Route>
            <Route
              path="user/:id"
              element={
                <AdminProtected>
                  <UserDetailedPage />
                </AdminProtected>
              }
            />
            <Route
              path="editpet/:id"
              element={
                <AdminProtected>
                  <EditPet />
                </AdminProtected>
              }
            />
          </Route>
        </Route>
      </Routes>
      {/* </petsContext.Provider>  */}
    </AuthProvider>
  );
}

export default App;

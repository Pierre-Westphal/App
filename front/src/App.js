import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak/Keycloak"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/HomePage";
import SecuredPage from "./pages/SecurePage";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <Nav />
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
            <Route path="/secured" element={
              <PrivateRoute>
                <SecuredPage />
              </PrivateRoute>
            }/>
         </Routes>
       </BrowserRouter>
       </ReactKeycloakProvider>
   </div>
 );
}

export default App;
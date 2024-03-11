import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import PrivateRoute from "./components/Common/PrivateRoute";
import './App.css';
import SecuredApp from './SecuredApp';
import keycloak from './components/Keycloak/Keycloak';

function App() {

  return (
    <div className="wrapper">
      <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route
                path='/'
                element={
                  <PrivateRoute>
                    <SecuredApp />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;

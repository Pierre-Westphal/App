import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloakConfig from './Keycloak/Keycloak';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import WelcomePage from './pages/HomePage';
import SecuredPage from './pages/SecurePage';
import PrivateRoute from './helpers/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ReactKeycloakProvider authClient={keycloakConfig}>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<WelcomePage />} />
            <Route
              path='/secured'
              element={
                <PrivateRoute>
                  <SecuredPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer position='bottom-right' />
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;

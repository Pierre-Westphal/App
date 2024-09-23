import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloakConfig from './Keycloak/Keycloak';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import WelcomePage from './pages/HomePage';
import SecuredPage from './pages/SecurePage';
import UserCreationPage from './pages/UserCreationPage';
import PrivateRoute from './helpers/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route exact path='/' element={<WelcomePage />} />
            <Route exact path='/form' element={<UserCreationPage />} />
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
      </AuthProvider>
    </div>
  );
}

export default App;

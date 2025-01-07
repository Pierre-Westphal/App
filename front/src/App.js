import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import SecuredPage from './pages/secured/SecurePage';
import ProfilePage from './pages/secured/ProfilePage';
import UserCreationPage from './pages/secured/UserCreationPage';
import UserModificationPage from './pages/secured/UserModificationPage';
import UsersPage from './pages/secured/UsersPage';
import PrivateRoute from './helpers/PrivateRoute';
import SettingsPage from './pages/secured/SettingsPage';
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
            <Route exact path='/secured/userCreation' element={<UserCreationPage />} />
            <Route exact path='/secured/userModification' element={<UserModificationPage />} />
            <Route exact path='/secured/users' element={<UsersPage />} />
            <Route exact path='/secured/settings' element={<SettingsPage />} />
            <Route exact path='/secured/profile' element={<ProfilePage />} />
            <Route
              path='/'
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

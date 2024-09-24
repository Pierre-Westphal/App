import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import WelcomePage from './pages/HomePage';
import SecuredPage from './pages/SecurePage';
import UserCreationPage from './pages/UserCreationPage';
import UsersPage from './pages/UsersPage';
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
            <Route exact path='/userCreation' element={<UserCreationPage />} />
            <Route exact path='/users' element={<UsersPage />} />
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

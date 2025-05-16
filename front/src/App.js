import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import SecuredRoutes from './routes/SecuredRoutes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <SecuredRoutes />
        </BrowserRouter>
        <ToastContainer position='bottom-right' />
      </AuthProvider>
    </div>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import SecuredRoutes from './routes/SecuredRoutes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeContextProvider } from './context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeContextProvider>
          <LanguageProvider>
            <BrowserRouter>
              <Nav />
              <SecuredRoutes />
            </BrowserRouter>
            <ToastContainer position='bottom-right' />
          </LanguageProvider>
        </ThemeContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

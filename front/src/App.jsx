import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeContextProvider>
          <LanguageProvider>
            <RouterProvider router={router} />
            <ToastContainer position='bottom-right' />
          </LanguageProvider>
        </ThemeContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
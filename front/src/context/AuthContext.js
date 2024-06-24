import { createContext } from 'react';

const AuthContextInterface = {
  isLoggedIn: false,
};

export default createContext(AuthContextInterface);

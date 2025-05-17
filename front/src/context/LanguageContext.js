import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n'; // adjust path if needed
import { apiRequest } from '../commons/Request'; // optional

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('languageCode') || 'en');

  // Update both i18n and localStorage
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng.toLowerCase());
    setLanguage(lng);
    localStorage.setItem('languageCode', lng);
  };

  // Optional: load language from API once
  useEffect(() => {
    localStorage.getItem('user_id')
    apiRequest(`user/${localStorage.getItem('user_id')}`, 'GET').then((data) => {
      if (data?.language && data.language !== language) {
        changeLanguage(data.language);
      }
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';

const SecuredApp = () => {

 return (
   <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/preferences">Preferences</Link>
      </li>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </div>
      );
    };

export default SecuredApp
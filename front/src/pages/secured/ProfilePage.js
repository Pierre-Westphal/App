import '../../style/global.css';
import React from 'react';
import LeftMenu from '../../menus/SecuredSubLetfMenu';
import { TextField, Grid, Container } from '@mui/material';
import UserForm from './UserForm';


const Profile = () => {
  const userDict = {
    firstName: localStorage.getItem('firstName'), 
    lastName: localStorage.getItem('lastName'),   
    username: localStorage.getItem('username'),   
    email: localStorage.getItem('email'),
    language: localStorage.getItem('languageCode')
  };

  return (
    <>
      <LeftMenu />
      <div className='margin-left-20 margin-top-5 margin-right-2'>
        <UserForm typeForm="view" userProps={userDict} />
      </div>
    </>
  );
};

export default Profile;
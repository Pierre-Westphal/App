import '../../style/global.css';
import React from 'react';
import LeftMenu from '../../menus/SecuredSubLetfMenu';
import { TextField, Grid, Container } from '@mui/material';


const Profile = () => {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const userName = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <>
      <LeftMenu />
      <div className='margin-left-20 margin-top-5'>
        <h1 className="text-black text-4xl">Profile Page.</h1>
        <Container component='main' maxWidth='xs' sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label='First Name' type='text' value={firstName} required variant='outlined' disabled={true} sx={{ mb: 3 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Last Name' type='text' value={lastName} required variant='outlined' disabled={true}  sx={{ mb: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Username' type='text' value={userName} required variant='outlined' disabled={true} sx={{ mb: 3 }} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Email' type='email' value={email} required variant='outlined' disabled={true} sx={{ mb: 3 }} fullWidth />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Profile;
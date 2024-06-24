import '../style/global.css';
import React, { useState } from 'react';
import { TextField, Button, Stack, Grid, Container } from '@mui/material';
import { apiRequest } from '../commons/Request';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let userDict = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      username: userName,
    };
    apiRequest('users', 'POST', userDict).then((data) => {
      console.log(data);
    });
  };
  return (
    <Container component='main' maxWidth='xs' sx={{ textAlign: 'center', alignItems: 'center' }}>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <h1>Users creation</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label='First Name' type='text' required variant='outlined' onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 3 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Last Name' type='text' required variant='outlined' onChange={(e) => setLastName(e.target.value)} sx={{ mb: 3 }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Username' type='text' required variant='outlined' onChange={(e) => setUsername(e.target.value)} sx={{ mb: 3 }} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' type='password' required variant='outlined' onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' type='email' required variant='outlined' onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }} fullWidth />
          </Grid>
        </Grid>
        <Button variant='outlined' color='secondary' type='submit'>
          Create
        </Button>
      </form>
    </Container>
  );
};

export default Home;

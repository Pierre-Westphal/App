import '../style/global.css';
import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { apiRequest } from '../commons/Request';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    console.log(firstName, lastName, email, password, userName);
    // apiRequest('users', 'POST');
  };
  return (
    <div className='margin-table'>
      <React.Fragment>
        <h1>Users creation</h1>

        <form autoComplete='off' onSubmit={handleSubmit}>
          {/* <Stack spacing={2} direction='row' sx={{ marginBottom: 4 }}> */}
          <TextField label='First Name' type='text' required variant='outlined' onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 3 }} />
          <TextField label='Last Name' type='text' required variant='outlined' onChange={(e) => setLastName(e.target.value)} sx={{ mb: 3 }} />
          {/* </Stack> */}
          <TextField label='Username' type='text' required variant='outlined' onChange={(e) => setUsername(e.target.value)} sx={{ mb: 3 }} />
          <TextField label='Password' type='password' required variant='outlined' onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} />
          <TextField label='Email' type='email' required variant='outlined' onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }} />
          <Button variant='outlined' color='secondary' type='submit'>
            Create
          </Button>
        </form>
      </React.Fragment>
    </div>
  );
};

export default Home;

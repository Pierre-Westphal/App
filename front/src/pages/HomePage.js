import React from 'react';
import { Button } from '@mui/material';
import request from '../commons/Request';

const Home = () => {
  return (
    <div>
      <h1 className='text-green-800 text-4xl'>Welcome to the Homepage</h1>
      <Button onClick={() => request()}>test</Button>
    </div>
  );
};

export default Home;

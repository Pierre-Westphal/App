import React from 'react';
import { Button } from '@mui/material';
import { apiRequest } from '../commons/Request';

const Home = () => {
  const [result, setResult] = React.useState('');

  const resultHealth = (e) => {
    apiRequest('health', 'GET').then((data) => {
      setResult(data);
    });
  };

  return (
    <div>
      <h1 className='text-green-800 text-4xl'>Welcome to the Homepage</h1>
      <Button onClick={resultHealth}>test</Button>
      {result && <span>{result.message}</span>}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import './App.css';

const API = "http://localhost:8000"

const checkIsAlive = async () => {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','http://localhost:8000');

  const response = await fetch(API, {
    mode: 'cors',
    credentials: "include",
    method: "GET",
    headers: headers
  });
  const body = await response.json()
  console.log(body)
  return body.message
}

function App() {

  const [response, setResponse] = useState(null);

  const onClickHandler = async () => {
    const temp = await checkIsAlive();

    setResponse(temp);
  }
  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button
        onClick={onClickHandler}>Test</button>
        <p>{response}</p>
    </div>
  );
}

export default App;

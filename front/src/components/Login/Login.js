import React ,{ useState } from 'react';
import PropTypes from 'prop-types';
import post from '../../utils/Requests/Post'
import get from '../../utils/Requests/Get'
import './Login.css';

export default function Login({ setToken }) {

  const [response, setResponse] = useState(null);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await post("login", {
      username,
      password
    });

    setToken(token);
  }

    const onClickHandler = async () => {
      const temp = await get("health");
      setResponse(temp);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button
        onClick={onClickHandler}>Test</button>
      <p>{response}</p>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import get from '../../utils/Requests/Get'

function Menu() {

  const [response, setResponse] = useState(null);

  const onClickHandler = async () => {
    const temp = await get("health");
    setResponse(temp);
  }

  return (
    <div className="wrapper">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/preferences">Preferences</Link>
      </li>
      <button
        onClick={onClickHandler}>Test
      </button>
      <p>{response}</p>
    </div>
  );
}

export default Menu;
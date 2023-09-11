import { Link } from 'react-router-dom';

function Menu() {

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
    </div>
  );
}

export default Menu;
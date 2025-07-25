import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const SecuredLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default SecuredLayout;
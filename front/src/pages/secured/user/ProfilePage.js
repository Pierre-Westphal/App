import '../../../style/global.css';
import LeftMenu from '../../../menus/SecuredSubLetfMenu';
import UserForm from './UserForm';
import { useLocation } from "react-router-dom";


const Profile = () => {
  const location = useLocation();
  let user = location.state?.userData;

  if (!user) {
    user = {
      firstName: localStorage.getItem('firstName'), 
      lastName: localStorage.getItem('lastName'),   
      username: localStorage.getItem('username'),   
      email: localStorage.getItem('email'),
      language: localStorage.getItem('languageCode'),
      title: 'profile'
    };
  }

  return (
    <>
      <LeftMenu />
      <div className='margin-left-20 margin-top-5 margin-right-2'>
        <UserForm typeForm="view" userProps={user} />
      </div>
    </>
  );
};

export default Profile;
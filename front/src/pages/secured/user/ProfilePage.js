import '../../../style/global.css';
import DefaultDataTable from '../../defaultDataTable';
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
      <DefaultDataTable children={<UserForm typeForm="view" userProps={user}/>}/>
    </>
  );
};

export default Profile;
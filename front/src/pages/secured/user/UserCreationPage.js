import '../../../style/global.css';
import LeftMenu from '../../../menus/SecuredSubLetfMenu';
import UserForm from './UserForm';


const UserCreationForm = () => {
  return (
    <>
      <LeftMenu />
      <div className='margin-left-20 margin-top-5 margin-right-2'>
        <UserForm typeForm="creation" userProps={{'title': 'userCreation'}}/>
      </div>
    </>
  )

};

export default UserCreationForm;

import '../../../style/global.css';
import DefaultDataTable from '../../defaultDataTable';
import UserForm from './UserForm';


const UserCreationForm = () => {
  return (
    <>
      <DefaultDataTable children={<UserForm typeForm="creation" userProps={{'title': 'userCreation'}}/>}/>
    </>
  )

};

export default UserCreationForm;

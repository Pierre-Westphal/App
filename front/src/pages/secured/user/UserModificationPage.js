import '../../../style/global.css';
import UserForm from './UserForm';
import DefaultDataTable from '../../defaultDataTable';
import { useLocation } from "react-router-dom";


const UserModificationPage = () => {
    const location = useLocation();
    let user = location.state?.userData || {};
    user['title'] = 'userModification';

    return (
        <>
            <DefaultDataTable children={<UserForm typeForm="edit" userProps={user}/>}/>
        </>
    );
};

export default UserModificationPage;
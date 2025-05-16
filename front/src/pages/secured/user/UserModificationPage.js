import LeftMenu from '../../../menus/SecuredSubLetfMenu';
import UserForm from './UserForm';

import React from 'react';
import { useLocation } from "react-router-dom";


const UserModificationPage = () => {
    const location = useLocation();
    let user = location.state?.userData;
    user['title'] = 'userModification';

    return (
        <div>
            <LeftMenu />
            <div className='margin-left-20 margin-top-5 margin-right-2'>
                <UserForm typeForm="edit" userProps={user} />
            </div>
        </div>
    );
};

export default UserModificationPage;
import LeftMenu from '../../menus/SecuredSubLetfMenu';
import UserForm from './UserForm';
import React from 'react';


const UserModificationPage = () => {
    const userDict = {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email')
    }

    return (
        <div>
            <LeftMenu />
            <div className='margin-left-20 margin-top-5 margin-right-2'>
                <UserForm typeForm="edit" userProps={userDict} />
            </div>
        </div>
    );
};

export default UserModificationPage;
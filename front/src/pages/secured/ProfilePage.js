import '../../style/global.css';
import React from 'react';
import LeftMenu from '../../menus/SecuredSubLetfMenu';


const Profile = () => {

 return (
  <>
    <LeftMenu />
    <div className='margin-left-20 margin-top-5'>
      <h1 className="text-black text-4xl">Welcome to the Profile Page.</h1>
    </div>
  </>
 );
};

export default Profile;
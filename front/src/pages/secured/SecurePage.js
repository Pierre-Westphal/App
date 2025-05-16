import '../../style/global.css';
import React from 'react';
import LeftMenu from '../../menus/SecuredSubLetfMenu';


const Secured = () => {

 return (
  <>
    <LeftMenu />
    <div className='margin-left-20 margin-top-5'>
      <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
    </div>
  </>
 );
};

export default Secured;
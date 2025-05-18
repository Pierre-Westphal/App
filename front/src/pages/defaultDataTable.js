import '../style/global.css';
import LeftMenu from '../menus/SecuredSubLetfMenu';

const DefaultDataTable = ({children}) => {
  return (
    <>
      <LeftMenu />
      <div className='margin-left-20 margin-top-5 margin-right-2'>
        {children}
      </div>
    </>
  );
}

export default DefaultDataTable;
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../helpers/PrivateRoute';

import SecuredPage from '../pages/secured/SecurePage';
import ProfilePage from '../pages/secured/user/ProfilePage';
import UserCreationPage from '../pages/secured/user/UserCreationPage';
import UserModificationPage from '../pages/secured/user/UserModificationPage';
import UsersPage from '../pages/secured/user/UsersPage';
import SettingsPage from '../pages/secured/SettingsPage';

const SecuredRoutes = () => (
  <Routes>
    <Route exact path='/secured/userCreation' element={<UserCreationPage />} />
    <Route exact path='/secured/userModification' element={<UserModificationPage />} />
    <Route exact path='/secured/users' element={<UsersPage />} />
    <Route exact path='/secured/settings' element={<SettingsPage />} />
    <Route exact path='/secured/profile' element={<ProfilePage />} />
    <Route
      path='/'
      element={
        <PrivateRoute>
          <SecuredPage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default SecuredRoutes;
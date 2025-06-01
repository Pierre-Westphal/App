import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import PrivateRoute from '../helpers/PrivateRoute';
import SecuredLayout from '../components/SecuredLayout';

import SecuredPage from '../pages/secured/SecurePage';
import ProfilePage from '../pages/secured/user/ProfilePage';
import UserCreationPage from '../pages/secured/user/UserCreationPage';
import UserModificationPage from '../pages/secured/user/UserModificationPage';
import UsersPage from '../pages/secured/user/UsersPage';
import SettingsPage from '../pages/secured/SettingsPage';
import AuditPage from '../pages/secured/auditPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PrivateRoute><SecuredLayout /></PrivateRoute>}>
      <Route index element={<SecuredPage />} />
      <Route path='/secured/userCreation' element={<UserCreationPage />} />
      <Route path='/secured/userModification' element={<UserModificationPage />} />
      <Route path='/secured/users' element={<UsersPage />} />
      <Route path='/secured/settings' element={<SettingsPage />} />
      <Route path='/secured/profile' element={<ProfilePage />} />
      <Route path='/secured/audit' element={<AuditPage />} />
    </Route>
  )
);

export default router;
import '../../../style/global.css';
import { useState } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Container, Button, TextField } from '@mui/material';
import { apiRequest } from '../../../commons/Request';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ErrorModal from '../../../helpers/ErrorModal';
import ConfirmationModal from '../../../helpers/ConfirmationModal';
import i18n from '../../../i18n';
import LanguageEnum from '../../../enums/LanguageEnum';

const UserForm = ({typeForm, userProps}) => {
    const [userId] = useState(userProps && userProps.userId ? userProps.userId : 0);
    const [firstName, setFirstName] = useState(userProps && userProps.firstName ? userProps.firstName : '');
    const [lastName, setLastName] = useState(userProps && userProps.lastName ? userProps.lastName : '');
    const [email, setEmail] = useState(userProps && userProps.email ? userProps.email : '');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState(userProps && userProps.username ? userProps.username : '');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConrirmationModal, setShowConrirmationModal] = useState(false);
    const [userDict, setUserDict] = useState({});
    const [languageCode, setLanguageCode] = useState(userProps && userProps.languageCode ? userProps.languageCode : 'FR');
    const viewMod = typeForm === 'view';
    const createMod = typeForm === 'creation';
    const { t } = useTranslation();
    const handleLanguageCodeChange = (e) => {
      setLanguageCode(e.target.value);
    };
    const [title] = useState(userProps && userProps.title ? userProps.title : 'profile');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setUserDict({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: userName,
        language: languageCode
      });
      setShowConrirmationModal(true);
    };
  
    const handleCloseErrorModal = () => {
      setShowErrorModal(false);
    };
  
    const handleCloseConrirmationModalWithoutModifications = () => {
      setShowConrirmationModal(false);
    };
  
    const handleCloseConrirmationModalCreate = () => {
      setShowConrirmationModal(false);
      apiRequest('user', 'POST', userDict).then((data) => {
        if (data.errors) {
          setErrorMessage(data.errors);
          setShowErrorModal(true);
        } else {
          toast.success(t('user.sucess.userCreation'));
        }
      });
    };

    const handleCloseConrirmationModalModification = () => {
      setShowConrirmationModal(false);
      apiRequest('user', 'PATCH', userDict).then((data) => {
        if (data.errors) {
          setErrorMessage(data.errors);
          setShowErrorModal(true);
        } else {
          if (userId === parseInt(localStorage.getItem('userId'))) {
            apiRequest(`user/${userId}`, 'GET', '').then((data) => {
              if (data.errors) {
                setErrorMessage(data.errors);
                setShowErrorModal(true);
              } else {
                localStorage.setItem('firstName', data.firstName);
                localStorage.setItem('lastName', data.lastName);
                localStorage.setItem('username', data.username);
                localStorage.setItem('email', data.email);
                localStorage.setItem('languageCode', data.language);
                i18n.changeLanguage(data.language.toLowerCase()).then (() => {
                  toast.success(t('user.sucess.userUpdate'));
                })
              }
            });
          } else {
          toast.success(t('user.sucess.userUpdate'));
        }
        }
      });
    };
  
    return (
      <div>
        <ErrorModal
          open={showErrorModal}
          handleClose={handleCloseErrorModal}
          errorMessage={errorMessage}
        />
        <ConfirmationModal
          open={showConrirmationModal}
          Title={"Confirmation"}
          handleCloseWithResult={createMod ? handleCloseConrirmationModalCreate : handleCloseConrirmationModalModification}
          handleCloseWithoutResult={handleCloseConrirmationModalWithoutModifications}
          Message={userDict}
        />
        <Container component='main' maxWidth='xs' sx={{ textAlign: 'center', alignItems: 'center' }}>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <h1>{t(`user.userForm.${title}`)}</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label={t('user.userForm.firstName')} type='text' required variant='outlined' disabled={viewMod} value={firstName ? firstName : ''} onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 3 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label={t('user.userForm.lastName')} type='text' required variant='outlined' disabled={viewMod} value={lastName ? lastName : ''} onChange={(e) => setLastName(e.target.value)} sx={{ mb: 3 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label={t('user.userForm.Username')} type='text' required variant='outlined' disabled={viewMod} value={userName ? userName : ''} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 3 }} fullWidth />
              </Grid>
              {createMod && (
                <Grid item xs={12}>
                    <TextField label={t('user.userForm.password')} type='password' required variant='outlined' disabled={viewMod} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} fullWidth />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField label={t('user.userForm.email')} type='email' required variant='outlined' disabled={viewMod} value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <InputLabel id="language-select-label">{t('user.userForm.Language')}</InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={languageCode}
                    disabled={viewMod}
                    onChange={handleLanguageCodeChange}
                    label={t('user.userForm.Language')}
                  >
                    {Object.keys(LanguageEnum).map((key) => (
                      <MenuItem key={key} value={LanguageEnum[key].id}>
                        {t(`${LanguageEnum[key].translation}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </Grid>
            </Grid>
            {typeForm === 'edit' && (
                <Button variant='outlined' color='secondary' type='submit'>
                  {t('user.userForm.update')}
                </Button>
            )}
            {typeForm === 'creation' && (
                <Button variant='outlined' color='secondary' type='submit'>
                  {t('user.userForm.create')}
                </Button>
            )}
          </form>
        </Container>
      </div>
    );
  };
  
  export default UserForm;
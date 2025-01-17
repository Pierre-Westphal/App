import '../../style/global.css';
import React, { useState } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Container, Button, TextField } from '@mui/material';
import { apiRequest } from '../../commons/Request';
import { toast } from 'react-toastify';
import ErrorModal from '../../helpers/ErrorModal';
import ConfirmationModal from '../../helpers/ConfirmationModal';
import LeftMenu from '../../menus/SecuredSubLetfMenu';

const UserForm = ({typeForm, userProps}) => {
    const [userId, setUserId] = useState(userProps && userProps.userId ? userProps.userId : 0);
    const [firstName, setFirstName] = useState(userProps && userProps.firstName ? userProps.firstName : '');
    const [lastName, setLastName] = useState(userProps && userProps.lastName ? userProps.lastName : '');
    const [email, setEmail] = useState(userProps && userProps.email ? userProps.email : '');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState(userProps && userProps.username ? userProps.username : '');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConrirmationModal, setShowConrirmationModal] = useState(false);
    const [userDict, setUserDict] = useState({});
    const [language, setLanguage] = useState(userProps && userProps.language ? userProps.language : 'FR');
    const viewMod = typeForm === 'view';
    const createMod = typeForm === 'creation';
    const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setUserDict({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        username: userName,
        language: language
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
          toast.success('User created successfully!');
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
          toast.success('User updated successfully!');
        }
      });
    };
  
    return (
      <div>
        <LeftMenu />
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
            <h1>Users creation</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='First Name' type='text' required variant='outlined' disabled={viewMod} value={firstName ? firstName : ''} onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 3 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Last Name' type='text' required variant='outlined' disabled={viewMod} value={lastName ? lastName : ''} onChange={(e) => setLastName(e.target.value)} sx={{ mb: 3 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label='Username' type='text' required variant='outlined' disabled={viewMod} value={userName ? userName : ''} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 3 }} fullWidth />
              </Grid>
              {createMod && (
                <Grid item xs={12}>
                    <TextField label='Password' type='password' required variant='outlined' disabled={viewMod} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} fullWidth />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField label='Email' type='email' required variant='outlined' disabled={viewMod} value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <InputLabel id="language-select-label">Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={language}
                    disabled={viewMod}
                    onChange={handleLanguageChange}
                    label="Language"
                  >
                    <MenuItem value="FR">French</MenuItem>
                    <MenuItem value="EN">English</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            </Grid>
            {typeForm === 'edit' && (
                <Button variant='outlined' color='secondary' type='submit'>
                  Update
                </Button>
            )}
            {typeForm === 'creation' && (
                <Button variant='outlined' color='secondary' type='submit'>
                  Create
                </Button>
            )}
          </form>
        </Container>
      </div>
    );
  };
  
  export default UserForm;
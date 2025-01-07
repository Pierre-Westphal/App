import '../../style/global.css';
import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import { apiRequest } from '../../commons/Request';
import { toast } from 'react-toastify';
import ErrorModal from '../../helpers/ErrorModal';
import ConfirmationModal from '../../helpers/ConfirmationModal';
import LeftMenu from '../../menus/SecuredSubLetfMenu';

const UserForm = ({typeForm, userProps}) => {
    console.log(userProps);
    const [firstName, setFirstName] = useState(userProps && userProps.firstName ? userProps.firstName : '');
    const [lastName, setLastName] = useState(userProps && userProps.lastName ? userProps.lastName : '');
    const [email, setEmail] = useState(userProps && userProps.email ? userProps.email : '');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState(userProps && userProps.username ? userProps.username : '');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConrirmationModal, setShowConrirmationModal] = useState(false);
    const [userDict, setUserDict] = useState({});
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setUserDict({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        username: userName,
      });
      setShowConrirmationModal(true);
  
    };
  
    const handleCloseErrorModal = () => {
      setShowErrorModal(false); // Close the modal
    };
  
    const handleCloseConrirmationModalWithoutModifications = () => {
      setShowConrirmationModal(false); // Close the modal
    };
  
    const handleCloseConrirmationModal = () => {
      setShowConrirmationModal(false); // Close the modal
      apiRequest('user', 'POST', userDict).then((data) => {
        if (data.errors) {
          setErrorMessage(data.errors);
          setShowErrorModal(true);
        } else {
          toast.success('User created successfully!');
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
          handleCloseWithResult={handleCloseConrirmationModal}
          handleCloseWithoutResult={handleCloseConrirmationModalWithoutModifications}
          Message={userDict}
        />
        <Container component='main' maxWidth='xs' sx={{ textAlign: 'center', alignItems: 'center' }}>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <h1>Users creation</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='First Name' type='text' required variant='outlined' value={firstName ? firstName : ''} onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 3 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Last Name' type='text' required variant='outlined' value={lastName ? lastName : ''} onChange={(e) => setLastName(e.target.value)} sx={{ mb: 3 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label='Username' type='text' required variant='outlined' value={userName ? userName : ''} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 3 }} fullWidth />
              </Grid>
              {typeForm !== 'view' && (
                <Grid item xs={12}>
                    <TextField label='Password' type='password' required variant='outlined' onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} fullWidth />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField label='Email' type='email' required variant='outlined' value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }} fullWidth />
              </Grid>
            </Grid>
            {typeForm === 'edit' && (
                <Button variant='outlined' color='secondary' type='submit'>
                  Update
                </Button>
            )}
            {typeForm === 'create' && (
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
import React from 'react';
import { Modal, Box, Typography, Button, Container } from '@mui/material';

const ErrorModal = ({ open, handleClose, errorMessage }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            border: '2px solid #f44336',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="error-modal-title" variant="h6" component="h2" color="error">
            Error
          </Typography>
          
          <Typography component="ul" variant="body1" color="error">
            {errorMessage && typeof errorMessage === 'object' ? errorMessage.map((error, index) => (
              <Typography component="li" key={index} sx={{ mb: 2 }}>
                <Typography component="span" variant="subtitle1">
                  {index + 1}. Field: {error.loc[1]}
                </Typography>
                <Typography component="ul" sx={{ ml: 2 }}>
                <Typography component="li">Input: {error.input}</Typography>
                <Typography component="li">Message: {error.msg}</Typography>
            </Typography>
              </Typography>
            )) : <Typography component="li">Message: {errorMessage}</Typography> }
          </Typography>

          <Button variant="contained" color="error" onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default ErrorModal;
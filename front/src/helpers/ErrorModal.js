import React, { useState } from 'react';
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
            width: '100%',
            bgcolor: 'background.paper',
            border: '2px solid #f44336',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="error-modal-title" variant="h6" component="h2" color="error">
            Error
          </Typography>
          <Typography id="error-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
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
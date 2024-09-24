import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const confirmationModal = ({ open, handleCloseWithResult, handleCloseWithoutResult, Title, Message }) => {

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleCloseWithoutResult}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {Title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <p>
                        <ul>
                            {Object.entries(Message).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {key === 'password' ? '********' : value}
                            </li>
                            ))}
                        </ul>
                    </p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseWithoutResult} autoFocus>
                    Disagree
                </Button>
                <Button onClick={handleCloseWithResult}>Agree</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default confirmationModal;



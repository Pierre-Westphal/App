import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const confirmationModal = ({ open, handleCloseWithResult, handleCloseWithoutResult, Message }) => {

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleCloseWithoutResult}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {Message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseWithResult}>Agree</Button>
                <Button onClick={handleCloseWithoutResult} autoFocus>
                    Disagree
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default confirmationModal;



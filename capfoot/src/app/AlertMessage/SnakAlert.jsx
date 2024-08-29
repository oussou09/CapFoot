import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Success Alert Component
const SnakAlert = ({ alertOpen, alertMessage, onClose }) => {
    return (
        <Snackbar
            open={alertOpen}
            autoHideDuration={7000} // Hide after 5 seconds
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Positioning
        >
            <Alert
                sx={{
                    fontWeight: 'bold',
                    zIndex: 100,
                }}
                onClose={onClose}
                severity="success"
                variant="outlined"
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
};

// Error Alert Component
const SnakAlertError = ({ alertOpen, alertMessage, onClose }) => {
    return (
        <Snackbar
            open={alertOpen}
            autoHideDuration={7000} // Hide after 5 seconds
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Positioning
        >
            <Alert
                sx={{
                    fontWeight: 'bold',
                    zIndex: 100,
                }}
                onClose={onClose}
                severity="error"
                variant="outlined"
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
};

export { SnakAlert, SnakAlertError };

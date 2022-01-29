import React from 'react';
import Alert from '@mui/material/Alert';

const AlertMessage = (props) => {
    const message = props.message;

    return (
        <Alert severity="error" sx={{ marginTop: "5%", backgroundColor: '#4d0000', color: 'white' }}>
        {message}
        </Alert>
    );
}

export default AlertMessage;

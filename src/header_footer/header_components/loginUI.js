import React from 'react';
import { pink } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

function LoginUI(props) {

    const status = props.status;

    const loginIcon = <IconButton>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
            <AccountCircleIcon sx={{ color: pink[500], fontSize: 50 }} />
        </Link>
            </IconButton>

    return (
        <Box sx={{display: 'flex', width: '20%', justifyContent: 'flex-end'}}>
            { status && loginIcon }
        </Box>
        );
}

export default LoginUI;
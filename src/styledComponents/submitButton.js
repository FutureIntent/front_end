import React from 'react';
import { pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

//sumbit button style
const SubmitButton = styled(Button)(({ theme }) => ({
    borderStyle: 'solid',
    borderColor: pink[500],
    backgroundColor: pink[900],
    borderWidth: 1,
    color: "white",
    '&:hover': {
        borderColor: pink[500],
        backgroundColor: pink[500]
    }
}));

export default SubmitButton;
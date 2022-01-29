import React from 'react';
import { pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

//input field style
const InputField = styled(TextField)({
    backgroundColor: '#212121',
    '& input': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& label': {
        color: 'white',
    },
    '& placeHolder': {
        color: 'white',
    },
    '& label.Mui-disabled': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: pink[900],
        },
        '&:hover fieldset': {
            borderColor: pink[500],
        },
        '&.Mui-focused fieldset': {
            borderColor: pink[500],
        },
        '&.Mui-disabled fieldset': {
            borderColor: pink[100],
        }
    }
});

export default InputField;
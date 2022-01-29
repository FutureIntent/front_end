import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SubmitButton from './../styledComponents/submitButton.js';
import InputField from './../styledComponents/inputField.js';
import AlertMessage from './../styledComponents/alert.js';

function Login() {

    //user input states
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    //server message state
    const [message, setMessage] = useState();

    //user input
    function handleInput(event) {

        const { email, password } = event.target.type;
        email ? setInput({
        ...input,[event.target.name]: event.target.value
        }) :
            setInput({
                ...input,[event.target.name]: event.target.value
            })
    }

    //fetch submit
    function handleSubmit(event) {
        fetch("http://localhost:3001/user/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: input.email,
                password: input.password
            })
        })
            .then(data => data.json())
            .then(data => { setMessage(data) })
            .catch(err => console.log(err))

        event.preventDefault();
    }

    useEffect(() => {
        if (message) {
            if (message.status === true) {
                window.location.replace("http://localhost:3000/");
            }
        }
    }, [message]);

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://wallpaperaccess.com/full/1801844.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    //store server message
    const msg = message && <span>{message.message}</span>

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }} component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{width: '100%'}}>

                    {message && <AlertMessage message={message.message} />}

                <InputField
                    required
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={input.email}
                    onChange={handleInput}
                    name="email"               
                />

                <InputField
                    required
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={input.password}
                    onChange={handleInput}
                    name="password"                
                />

                <SubmitButton type="submit">
                    Log In
                </SubmitButton>     

                </Stack>
            </Box>
        </Container>
        );
}
export default Login;
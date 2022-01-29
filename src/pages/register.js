import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RegisterCheck from './../auth/registerCheck.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SubmitButton from './../styledComponents/submitButton.js';
import InputField from './../styledComponents/inputField.js';
import AlertMessage from './../styledComponents/alert.js';

function Register() {

    const loggedIn= useSelector((state) => state.loginStatus.loggedIn);

    RegisterCheck(loggedIn);

    const [input, setInput] = useState({
        email: "",
        name: "",
        password: "",
        password_rep: ""
    });

    const [message, setMessage] = useState();

    function registerFetch(email, name, password) {

        fetch("http://localhost:3001/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
        })
            .then(data => data.json())
            .then(data => { setMessage(data) })
            .catch(err => console.log(err))

    }

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://wallpaperaccess.com/full/1801844.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    function handleInput(event) {

        setInput(prevInput => {
            return { ...prevInput, [event.target.name]: event.target.value }
        });

    }

    function handleSubmit(event) {
        if (input.password !== input.password_rep) {
            setMessage({ status: false, message: "Password fields must match" });
            event.preventDefault();
            return
        }

        registerFetch( input.email, input.name, input.password);
        event.preventDefault();
    }

    const msg = message && <span>{message.message}</span>

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }} component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: '100%' }}>

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
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={input.name}
                        onChange={handleInput}
                        name="name"
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

                    <InputField
                        required
                        label="Repeat password"
                        type="password"
                        variant="outlined"
                        value={input.password_rep}
                        onChange={handleInput}
                        name="password_rep"
                    />

                    <SubmitButton type="submit">
                        Log In
                    </SubmitButton>

                </Stack>
            </Box>
        </Container>
        );
}

export default Register;
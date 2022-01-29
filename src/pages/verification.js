import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AlertMessage from './../styledComponents/alert.js';

function Verification() {

    //get query
    const search = window.location.search;
    const query = new URLSearchParams(search);
    const id = query.get('id');
    const email = query.get('email');

    const [message, setMessage] = useState();

    useEffect(() => {

        fetch(`http://localhost:3001/user/verify?id=${id}&email=${email}`, {
            method: "PUT"
        })
            .then(data => data.json())
            .then(data => { setMessage(data) })
            .catch(err => console.log(err))

    }, []);

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://images5.alphacoders.com/764/thumb-1920-764519.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    const msg = message && <p>{message.message}</p>

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                {message && <AlertMessage message={message.message} />}
            </Box>
        </Container>
        );
}

export default Verification;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputField from './../styledComponents/inputField.js';
import SubmitButton from './../styledComponents/submitButton.js';
import Stack from '@mui/material/Stack';
import AlertMessage from './../styledComponents/alert.js';

function Profile() {

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        avatar: "",
        info: ""
    });

    const [message, setMessage] = useState();

    useEffect(() => {
        fetch("http://localhost:3001/user/profile", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => {
                if (data.status === true) {
                    if (data.data.info === null) data.data.info = "";
                    if (data.data.avatar === null) data.data.avatar = "";
                    setUserData(data.data)
                } else {
                    setMessage(data);
                }
            })
            .catch(err => console.log(err))
    },[]);

    const loginState = useSelector((state) => state.loginStatus.loggedIn);

    //UserCheck(loginState);

    function handleInput(event) {
        setUserData(prevState => {
            return {...prevState, [event.target.name]: event.target.value}
        });
    }

    function handleSubmit(event) {
        fetch("http://localhost:3001/user/update", {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.name,
                avatar: userData.avatar,
                info: userData.info
            })
        })
            .then(data => data.json())
            .then(data => {setMessage(data)})
            .catch(err => console.log(err))

        event.preventDefault();
    }

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://images5.alphacoders.com/764/thumb-1920-764519.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    const msg = message && <span>{message.message}</span>

    return (
        <Container maxWidth="sm">

            {loginState && <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }} component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: '100%' }}>

                    {message && <AlertMessage message={ message.message} /> }

                    <InputField
                        label={ userData.email }
                        variant="outlined"
                        name="email"
                        id="email"
                        disabled
                    />

                    <InputField
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={userData.name}
                        onChange={handleInput}
                        name="name"
                        id="name"
                        
                    />

                    <InputField                     
                        label="Avatar"
                        type="text"
                        variant="outlined"
                        value={userData.avatar}
                        onChange={handleInput}
                        name="avatar"
                        id="avatar"                        
                    />

                    <Card sx={{ maxWidth: 150, width: 150, 
                        alignSelf: 'center' }}>
                        <CardMedia
                            component="img"
                            height="150"
                            name="user_avatar"
                            id="user_avatar"
                            image={userData.avatar}
                            alt="avatar"
                        />
                    </Card>

                    <InputField 
                        label="Info"
                        type="text"
                        variant="outlined"
                        value={userData.info}
                        onChange={handleInput}
                        name="info"
                        id="info"
                    />

                    <SubmitButton type="submit">
                        Edit
                    </SubmitButton>

                </Stack>
            </Box>
}


        </Container>
    );
}

export default Profile;
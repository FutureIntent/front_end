import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertMessage from './../styledComponents/alert.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Divider from '@mui/material/Divider';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function Dashboard() {

    const { loggedIn, admin } = useSelector((state) => state.loginStatus);
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch("http://localhost:3001/user/admin", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => { if (data.status === false) setMessage(data) })
            .catch(err => console.log(err))
    }, []);

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://images5.alphacoders.com/764/thumb-1920-764519.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    //AdminCheck(loggedIn, admin);
    const new_post = <Link to="/new_post"> New Post </Link>

    const msg = message && <p>{message.message}</p>

    return (
        <Container maxWidth="sm">

            {message && <AlertMessage message={message.message} />}

            {(loggedIn && admin) && <Box sx={{height: '80vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <List>

                        <ListItem disablePadding>
                        <Link to="/new_post" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleOutlineIcon sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary="New Post" sx={{color: 'white'}}/>
                            </ListItemButton>
                            </Link>
                        </ListItem>

                    <Divider sx={{borderColor: 'white'}}/>

                        <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                          <ManageAccountsIcon sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Manage Users" sx={{ color: 'white' }} />
                                </ListItemButton>
                        </ListItem>

                  </List>     
            </Box>
            }
        </Container>
        );
}
export default Dashboard;
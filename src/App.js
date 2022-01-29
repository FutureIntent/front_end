import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { status,adminStatus } from './features/login/login.js';
import Header from './header_footer/header.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import Logout from './pages/logout.js';
import Profile from './pages/profile.js';
import Dashboard from './pages/dashboard.js';
import Verification from './pages/verification.js';
import New_post from './pages/new_post.js';
import Post_details from './pages/post_details.js';
import { grey } from '@mui/material/colors';

function App() {

    //login status redux global states
    const loginState = useSelector((state) => state.loginStatus.loggedIn);
    const dispatch = useDispatch();

    //fetch login status
    useEffect(() => {
        fetch("http://localhost:3001/user/loginStatus", {
            method: "POST",
            credentials: "include"
        })
            .then(data => data.json())
            .then(data => {
                dispatch(status(data.status));
                dispatch(adminStatus(data.isAdmin));
            })
            .catch(err => console.log(err))
    });

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://images5.alphacoders.com/764/thumb-1920-764519.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/verify">
                    <Verification />
                </Route>
                <Route path="/new_post">
                    <New_post />
                </Route>
                <Route path="/post/:id">
                    <Post_details />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

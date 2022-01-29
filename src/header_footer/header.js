import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderMenu from './header_components/menu.js';
import Home from './header_components/home.js';
import Box from '@mui/material/Box';
import LoginUI from './header_components/loginUI.js';
import Title from './header_components/title.js';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

function Header() {

    //redux authorisation global states
    const loginState = useSelector((state) => state.loginStatus.loggedIn);
    const adminState = useSelector((state) => state.loginStatus.admin);

    //menu elements
    const logIn = <Typography variant="string" sx={{ color: pink[500] }}><Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>Login</Link></Typography>
    const logOut = <Typography variant="string" sx={{ color: pink[500] }}><Link to="/logout" style={{ textDecoration: 'none', color: "inherit" }}>Log Out</Link></Typography>
    const register = <Typography variant="string" sx={{ color: pink[500] }}><Link to="/register" style={{ textDecoration: 'none', color: "inherit" }}>Register</Link></Typography>
    const profile = <Typography variant="string" sx={{ color: pink[500] }}><Link to="/profile" style={{ textDecoration: 'none', color: "inherit" }}>Profile</Link></Typography>
    const dashboard = <Typography variant="string" sx={{ color: pink[500] }}><Link to="/dashboard" style={{ textDecoration: 'none', color: "inherit" }}>Dashboard</Link></Typography>

    //menu options
    let options = []

    //menu option variants
    if (adminState) {
        options = [
            dashboard,
            profile,
            logOut
        ]
    } else if (loginState) {
        options = [
            profile,
            logOut
        ]
    } else {
        options = [
            logIn,
            register
        ]
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Box sx={{width: '20%', display: 'flex', justifyContent: 'flex-start'}}>
                <Home/>
                <HeaderMenu options={options} />
            </Box>
            <Title/>
            <LoginUI status={loginState} />
        </Box>
        );
}
export default Header;
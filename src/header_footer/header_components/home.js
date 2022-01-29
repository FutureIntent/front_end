import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

function Home() {

    const home = <IconButton><a href="/"><HomeIcon sx={{ color: pink[500], fontSize: 50 }} /></a></IconButton>

    return (
        <Box sx={{display: 'inline'}}>
            { home }
        </Box>
        );
}

export default Home;
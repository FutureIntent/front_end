import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import "@fontsource/nosifer";

function Title() {



    return (
        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h2" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, color: pink[500], fontFamily: "Nosifer" }}>
                FutureInc
            </Typography>
        </Box>
        );
}

export default Title;

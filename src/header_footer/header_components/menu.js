import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';

const ITEM_HEIGHT = 48;

function HeaderMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = props.options

    return (
        <Box sx={{display: 'inline'}}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon sx={{ color: pink[500], fontSize: 50 }}/>
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '12ch',
                        backgroundColor: grey[900]
                    },
                }}
            >
                {options.map((option,index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        { option }
                    </MenuItem>
                ))}
            </Menu>
        </Box>
        );

}

export default HeaderMenu;
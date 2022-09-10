import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav">
      <Link to="/start">
      <div>
        <img src="images/ThermaSolutions-Logo.jpg" alt="thermasolutions" />
      </div>  
        {/* <h2 className="nav-title">ThermaSolutions</h2> */}
      </Link>
      <div>
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Menu">
              <IconButton
                onClick={handleClick}
                size="large"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <MenuIcon color="secondary" size="large"/>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <MenuItem >
                <Link className="footLink" to="/login">
                  Login / Create Account
                </Link>
            </MenuItem>
          )}
          {/* If a user is logged in, show these links */}
          {user.id && (
            <MenuItem>
              <Link className="footLink" to="/start">
                New Procedure
              </Link>
            </MenuItem>
          )}
          {/* If a user is logged in, show these links */}
          {user.id && (
            <MenuItem>
              <Link className="footLink" to="/chart">
                Chart Page
              </Link>
            </MenuItem>
          )}
          {/* If a user is logged in, show these links */}
          {user.id && (
            <MenuItem>
              <Link className="footLink" to="/history">
                Procedure History
              </Link>
            </MenuItem>
          )}
            <MenuItem>
              <Link className="footLink" to="/about">
                About
              </Link>
            </MenuItem>
            {/* If a user is logged in, show these links */}
            {user.id && (
              <div>
                <Divider />
                <MenuItem className="footLink">
                  {/* <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon> */}
                    {/* <LogOutButton className="footLink" /> */}
                  <Link  className="footLink" onClick={() => dispatch({ type: 'LOGOUT' })} to="/login">
                    Log Out
                  </Link>
                </MenuItem>
              </div>
            )}
          </Menu>
        </React.Fragment>
      </div>
    </div>
  );
}

export default Nav;

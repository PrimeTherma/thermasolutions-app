import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  const user = useSelector((store) => store.user);

  return (
    <center className="footer">
      <Typography color="lightgrey">&copy; ThermaSolutions</Typography>
      <div>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="footLink" to="/start">
              <Typography>New Procedure</Typography>
            </Link>

            <Link className="footLink" to="/chart">
              <Typography>Chart Page</Typography>
            </Link>

            <Link className="footLink" to="/history">
              <Typography>Procedure History</Typography>
            </Link>
          </>
        )}

        <Link className="footLink" to="/about">
          <Typography>About</Typography>
        </Link>
      </div>
    </center>
  )
}

export default Footer;

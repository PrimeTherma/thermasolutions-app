import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box
    component="form"
    sx={{
        mt: 15,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    alignContent="center"
    autoComplete="off"
    className="formPanel" onSubmit={login}
    >
    {/* <form className="formPanel" onSubmit={login}> */}
      <Typography align="center" variant="h4">Login</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <Typography htmlFor="username">
          Username
          <TextField
            color="secondary"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Typography>
      </div>
      <div>
        <Typography htmlFor="password">
          Password
          <TextField
            color="secondary"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Typography>
      </div>
      <div>
        <Button 
          variant="contained"
          color="secondary"
          className="btn" 
          type="submit" 
          name="submit" 
          value="Log In"
          sx={{align: "center"}}
          >
            LOGIN
          {/* <input className="btn" type="submit" name="submit" value="Log In" /> */}
          </Button>
      </div>
    {/* </form> */}
    </Box>
  );
}

export default LoginForm;

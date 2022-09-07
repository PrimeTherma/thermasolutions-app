import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box
    component="form"
    sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    alignContent="center"
    autoComplete="off"
    className="formPanel" onSubmit={registerUser}
    >
    {/* <form className="formPanel" onSubmit={registerUser}> */}
      <h2 align="center">Create Account</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username
          <TextField
            color="error"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <TextField
            color="error"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button 
          variant="contained"
          color="error"
          className="btn" 
          type="submit" 
          name="submit" 
          value="Log In"
          sx={{align: "center"}}
          >
            Create Account
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
        </Button>
      </div>
    {/* </form> */}
    </Box>
  );
}

export default RegisterForm;

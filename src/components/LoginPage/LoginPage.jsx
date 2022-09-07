import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
      <Button 
        variant="outlined"
        color="error"
        type="button"
        className="btn btn_asLink"
        onClick={() => {
          history.push('/registration');
        }}
        >
          Create Account
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;

import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const history = useHistory();

  return (
    <div>


            <LoginForm />
 

      <center>
      <Button 
        sx={{ m:1}}
        variant="contained"
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

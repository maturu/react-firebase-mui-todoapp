import React, { useState } from 'react';
import { TextField, Button, Link } from '@mui/material';
import { withRouter } from 'react-router-dom';
import { auth } from '../firebase';

type ValidationType = { msg: string; type: string };

export const SignUp = withRouter((props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState<ValidationType>({
    msg: '',
    type: '',
  });

  const createUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push('/signin');
      })
      .catch((error) => {
        const err = error.message.split(' ');
        const msg: string = err.slice(1, -1).join(' ');
        const type: string = err.slice(-1)[0].includes('email')
          ? 'email'
          : 'password';

        setValidation({ msg, type });
      });
  };

  return (
    <>
      <p>Sign Up Page</p>
      <form noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Enter Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          helperText={validation.type === 'email' ? validation.msg : ''}
          error={validation.type === 'email'}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label="Enter Your Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          helperText={validation.type === 'password' ? validation.msg : ''}
          error={validation.type === 'password'}
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={createUser}
          disabled={!email || !password}
        >
          Sign Up
        </Button>
      </form>
      <Link href="/signin">Sign In</Link>
    </>
  );
});

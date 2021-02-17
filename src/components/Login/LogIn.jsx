import { Button, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { postFunction } from "../../functions/CRUDFunction";

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const logIn = async (e) => {
    e.preventDefault();
    const response = await postFunction("users/login", { email, password });
    if (response.token) {
      localStorage.clear();
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      window.location.reload();
      props.setLogIn(false);
      props.setSignedIn(true);
    } else {
      setError("User Email or password is Incorrect");
    }
  };
  return (
    <div className='backdrop px-5'>
      <Container className='px-5'>
        <Paper className='w-50 m-auto'>
          <form onSubmit={logIn} className='d-flex flex-column p-4'>
            {error.length > 0 && <i className='text-danger'>{error}</i>}
            <TextField className='m-3' variant='outlined' value={email} onChange={(e) => setEmail(e.target.value)} label='Email' type='email' required />
            <TextField className='m-3' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password' required />
            <div className='d-flex'>
              <Button variant='contained' className='m-3' onClick={() => props.setLogIn(false)} type='submit' color='gray'>
                Cancel
              </Button>
              <Button variant='contained' className='m-3' type='submit' color='primary'>
                Sign In
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LogIn;

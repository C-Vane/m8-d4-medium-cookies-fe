import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { postFunction } from "../../functions/CRUDFunction";
import "./styles.scss";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const logIn = async (e) => {
    e.preventDefault();
    const response = await postFunction("users/login", { email, password });
    if (response.ok) {
      window.location.reload();
      props.setSignedIn(true);
    } else {
      setError("User Email or password is Incorrect");
    }
  };

  return (
    <div className='pt-3'>
      <h2>Sign in with email</h2>
      <p className='h5 pt-4'>Enter your email and password to sign in.</p>
      <form onSubmit={logIn} className='d-flex flex-column p-4 mt-3'>
        {error.length > 0 && <i className='text-danger'>{error}</i>}
        <TextField className='m-3' value={email} onChange={(e) => setEmail(e.target.value)} label='Your email' type='email' required />
        <TextField className='m-3' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password' required />
        <div className='my-4'>
          <Button variant='dark' className='w-50 rounded-0 m-auto' type='submit'>
            Sign in
          </Button>
          <div className='m-auto w-50 pt-4 rounded-0 text-success cursor-pointer' onClick={() => props.setCurrent(false, true)}>
            <ArrowBackIosIcon /> All sign in options
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

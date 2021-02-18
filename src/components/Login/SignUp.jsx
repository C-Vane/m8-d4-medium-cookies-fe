import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { postFunction } from "../../functions/CRUDFunction";
import "./styles.scss";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState();
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
  const signUp = async (e) => {
    e.preventDefault();
    const response = await postFunction("users/register", { name, surname, email, password, img: image });
    if (response._id) {
      logIn(e);
    } else {
      setError("User Email or password is Incorrect");
    }
  };
  return (
    <div className='pt-3'>
      <h2>Sign up with email</h2>
      <p className='h5 pt-4'>Enter your data to create an account.</p>
      <form onSubmit={signUp} className='d-flex flex-column p-4'>
        {error.length > 0 && <i className='text-danger'>{error}</i>}
        <TextField className='m-3' value={name} onChange={(e) => setName(e.target.value)} label='Your name' type='text' required />
        <TextField className='m-3' value={surname} onChange={(e) => setSurname(e.target.value)} label='Your Surname' type='text' required />
        <TextField className='m-3' value={email} onChange={(e) => setEmail(e.target.value)} label='Your email' type='email' required />
        <TextField className='m-3' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password' required />
        <TextField className='m-3' value={image} onChange={(e) => setImage(e.target.value)} label='Profile Image URL' type='url' />
        <div className='my-4'>
          <Button variant='dark' className='m-auto w-50 rounded-0' type='submit'>
            Sign Up
          </Button>
          <div className='m-auto w-50 pt-4 rounded-0 text-success cursor-pointer' onClick={() => props.setCurrent(false, false)}>
            <ArrowBackIosIcon /> All sign up options
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

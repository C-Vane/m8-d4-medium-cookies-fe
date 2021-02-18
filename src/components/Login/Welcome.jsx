import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React from "react";

const Welcome = ({ setWelcome, setSignIn }) => {
  return (
    <div>
      <h2>Welcome back.</h2>
      <div className=' d-flex flex-column align-items-center my-4'>
        <Button variant='outlined' href={process.env.REACT_APP_URL + "users/googleLogin"} className='mb-3 w-50 text-normal'>
          <img src='https://developers.google.com/identity/images/g-logo.png' alt='google logo' width='20' className='img-fluid mr-3'></img> Sign in with Google
        </Button>
        <Button className='text-normal w-50' variant='outlined' onClick={() => setSignIn(true, true)}>
          <MailOutlineIcon className='mr-4' /> Sign in with Email
        </Button>
      </div>
      <p>
        No account?
        <b className='text-success cursor-pointer ml-1' onClick={() => setWelcome(false)}>
          Create one
        </b>
      </p>
    </div>
  );
};

export default Welcome;

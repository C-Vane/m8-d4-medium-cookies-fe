import React from "react";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const Join = ({ setWelcome, setSignUp }) => {
  return (
    <div>
      <h2>Join Medium.</h2>
      <p className='w-75 px-4 m-auto'>Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</p>
      <div className=' d-flex flex-column align-items-center my-4'>
        <Button variant='outlined' href={process.env.REACT_APP_URL + "users/googleLogin"} className='mb-3 w-50 text-normal'>
          <img src='https://developers.google.com/identity/images/g-logo.png' width='20' className='img-fluid mr-3'></img> Sign Up with Google
        </Button>
        <Button className='text-normal w-50' variant='outlined' onClick={() => setSignUp(true, false)}>
          <MailOutlineIcon className='mr-4' /> Sign up with Email
        </Button>
      </div>
      <p>
        Already have an account?
        <b className='text-success cursor-pointer' onClick={() => setWelcome(true)}>
          Sign in
        </b>
      </p>
    </div>
  );
};

export default Join;

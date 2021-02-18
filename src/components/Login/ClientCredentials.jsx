import { Paper, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { postFunction } from "../../functions/CRUDFunction";
import Join from "./Join";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./styles.scss";
import Welcome from "./Welcome";

const ClientCredentials = ({ setLogIn, setSignedIn }) => {
  const [welcome, setWelcome] = useState(true);
  const [form, setForm] = useState(false);

  const setCurrent = (form, welcome) => {
    setForm(form);
    setWelcome(welcome);
  };
  return (
    <div className='backdrop  position-fixed'>
      <Container className=''>
        <Paper className='w-50 m-auto text-center' elevation={3}>
          <IconButton aria-label='close' className='float-right' onClick={() => setLogIn(false)}>
            <CloseIcon />
          </IconButton>
          <div className='p-4'>
            <div className='mb-4 p-3'>
              {!form ? (
                welcome ? (
                  <Welcome setWelcome={setWelcome} setSignIn={setCurrent} />
                ) : (
                  <Join setWelcome={setWelcome} setSignUp={setCurrent} />
                )
              ) : welcome ? (
                <SignIn setSignedIn={setSignedIn} setCurrent={setCurrent} />
              ) : (
                <SignUp setSignedIn={setSignedIn} setCurrent={setCurrent} />
              )}
            </div>
            <small className='text-muted text-smaller'>
              Click “{welcome ? "Sign In" : "Sign Up"}” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.
            </small>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ClientCredentials;

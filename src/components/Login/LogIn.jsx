import { Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { postFunction } from "../../functions/CRUDFunction";
import "./styles.scss";

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState();
  const [error, setError] = useState("");
  const [login, setLogin] = useState(true);
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
  const signUp = async (e) => {
    e.preventDefault();
    const response = await postFunction("users/register", { name, surname, email, password, img: image });
    if (response._id) {
      logIn(e);
    }
  };
  return (
    <div className='backdrop px-5'>
      <Container className='px-5'>
        <Paper className='w-50 m-auto p-4 text-center'>
          {login ? (
            <>
              <h6>Sign in with email</h6>
              <form onSubmit={logIn} className='d-flex flex-column p-4'>
                {error.length > 0 && <i className='text-danger'>{error}</i>}
                <TextField className='m-3' value={email} onChange={(e) => setEmail(e.target.value)} label='Your email' type='email' required />
                <TextField className='m-3' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password' required />
                <div className='d-flex mb-4'>
                  <Button variant='light' className='m-3 w-50 rounded-0' onClick={() => props.setLogIn(false)} type='submit' color='gray'>
                    <small>Cancel</small>
                  </Button>
                  <Button variant='dark' className='m-3 w-50 rounded-0' type='submit' color='black'>
                    <small>Sign in</small>
                  </Button>
                </div>
                <small>
                  {" "}
                  No account?{" "}
                  <b className='text-success cursor-pointer' onClick={() => setLogin(!login)}>
                    Create One
                  </b>
                </small>
              </form>
            </>
          ) : (
            <>
              <h6>Join Medium</h6>
              <form onSubmit={signUp} className='d-flex flex-column p-4'>
                {error.length > 0 && <i className='text-danger'>{error}</i>}
                <TextField className='m-3' value={name} onChange={(e) => setName(e.target.value)} label='Your name' type='text' required />
                <TextField className='m-3' value={surname} onChange={(e) => setSurname(e.target.value)} label='Your Surname' type='text' required />
                <TextField className='m-3' value={email} onChange={(e) => setEmail(e.target.value)} label='Your email' type='email' required />
                <TextField className='m-3' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password' required />
                <TextField className='m-3' value={image} onChange={(e) => setImage(e.target.value)} label='Profile Image URL' type='url' />
                <div className='d-flex mb-4'>
                  <Button variant='light' className='m-3 w-50 rounded-0' onClick={() => props.setLogIn(false)} type='submit' color='gray'>
                    <small>Cancel</small>
                  </Button>
                  <Button variant='dark' className='m-3 w-50 rounded-0' type='submit' color='black'>
                    <small>Sign Up</small>
                  </Button>
                </div>
                <small>
                  {" "}
                  Already have an account?{" "}
                  <b className='text-success cursor-pointer' onClick={() => setLogin(!login)}>
                    Sign in
                  </b>
                </small>
              </form>{" "}
            </>
          )}
          <small className='text-muted text-smaller mt-4'>
            Click “{login ? "Sign In" : "Sign Up"}” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.
          </small>
        </Paper>
      </Container>
    </div>
  );
};

export default LogIn;

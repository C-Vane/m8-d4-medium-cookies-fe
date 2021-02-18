import React, { Component } from "react";
import { Navbar, Nav, Dropdown, Container, Image, Button } from "react-bootstrap";
import logo from "../../assets/medium_logo.svg";
import { IoNotificationsOutline, IoBookmarksOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getFunction, postFunction } from "../../functions/CRUDFunction";
import LogIn from "../Login/ClientCredentials";
export default class NavBar extends Component {
  state = {
    logIn: false,
    signedIn: false,
    user: {},
  };

  getUser = async () => {
    const user = await getFunction("users/me");
    if (user) {
      this.setState({ user, signedIn: true });
      this.setState({ signedId: true });
    } else {
      this.setState({ signedId: false });
    }
  };
  signOut = async () => {
    const response = await postFunction("users/logOut");
    if (response.ok) {
      console.log(response);
      this.setSignedIn(false);
      window.location.reload();
    }
  };
  setLogIn = (value) => this.setState({ logIn: value });

  setSignedIn = (value) => {
    value && this.getUser();
  };

  componentDidMount = () => {
    this.getUser();
  };
  render() {
    return (
      <>
        <Navbar style={{ paddingTop: 24 }}>
          <Container>
            <Navbar.Brand as={Link} to='/'>
              <img style={{ height: 54 }} alt='medium-logo' src={logo} />
            </Navbar.Brand>
            <h5 style={{ fontWeight: "bold", marginTop: "0.6em" }}>Good Morning</h5>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <Nav.Link as={Link} to='/search'>
                  <IoSearchOutline style={{ fontSize: 20 }} />
                </Nav.Link>
                <Nav.Link href='#home'>
                  <IoBookmarksOutline style={{ fontSize: 20 }} />
                </Nav.Link>
                <Nav.Link href='#link' className='medium-icon'>
                  <IoNotificationsOutline style={{ fontSize: 20 }} />
                </Nav.Link>
                <Nav.Link href='#link' className='medium-icon'>
                  <Button variant='outline-secondary'>Upgrade</Button>
                </Nav.Link>
                {this.state.signedIn ? (
                  <Dropdown>
                    <Dropdown.Toggle variant='success' as='div'>
                      <Image style={{ height: 30 }} src={this.state.user.img || "https://strive.school/favicon.ico"} roundedCircle />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to='/new-story'>
                        Write a story
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to='/stories'>
                        Stories
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to='/stats'>
                        Stats
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.signOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Nav.Link href='#link' className='medium-icon' onClick={() => this.setLogIn(true)}>
                    <Button variant='outline-secondary'>Sign In</Button>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {this.state.logIn && <LogIn setLogIn={this.setLogIn} setSignedIn={this.setSignedIn} />}
      </>
    );
  }
}

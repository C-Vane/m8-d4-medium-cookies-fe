import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";
import article from "./data.json";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions"
class Read extends Component {
  render() {
    return (
      <Container className="article-container">
        <h1>{article.title}</h1>
        <Row style={{ marginTop: 20, marginBottom: 20 }}>
          <Col xs={1}>
            <Image
              style={{ width: 50, height: 50 }}
              src="https://miro.medium.com/fit/c/96/96/1*xVwJ4C9D1sjrRc-sR_jO0w.jpeg"
              roundedCircle
            />
          </Col>
          <Col>
            {article.author.name}
            <p>Sep 23, 2018 · 3 min read</p>
          </Col>
          <Col>
            <div
              style={{
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IoLogoTwitter />
              <IoLogoLinkedin />
              <IoLogoFacebook />
              <IoBookmarkOutline />
            </div>
          </Col>
        </Row>
        <p>{article.content}</p>
        <p>{article.content}</p>
        <p>{article.content}</p>
        <p>{article.content}</p>
        <p>{article.content}</p>
        <p>{article.content}</p>
        <Reactions/>
      </Container>
    );
  }
}

export default withRouter(Read);

import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions";
import { getFunction } from "../../functions/CRUDFunction";
class Read extends Component {
  state = {
    article: {},
    msg: "",
  };
  getArticle = async () => {
    const article = await getFunction("articles/" + this.props.match.params.slug);
    console.log(article);
    if (article.author) this.setState({ article });
    else this.setState({ msg: "Error Occured Please refrash the page" });
  };
  componentDidMount = () => {
    this.getArticle();
  };
  render() {
    const { author, content, headLine, subHead, cover, createdAt, category } = this.state.article;
    return (
      <Container className='article-container'>
        {author ? (
          <>
            <h1>{headLine}</h1>
            <Row style={{ marginTop: 20, marginBottom: 20 }}>
              <Col xs={1}>
                <Image style={{ width: 50, height: 50, marginRight: 10 }} src={author.img || "https://miro.medium.com/fit/c/96/96/1*xVwJ4C9D1sjrRc-sR_jO0w.jpeg"} roundedCircle />
              </Col>
              <Col>
                {author.name}
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
            <p>{subHead}</p>
            <p>{content}</p>

            <Reactions article={this.state.article} />
          </>
        ) : (
          <div>Loading....</div>
        )}
      </Container>
    );
  }
}

export default withRouter(Read);

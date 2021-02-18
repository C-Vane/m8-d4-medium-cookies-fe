import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions";
import { deleteFunction, getFunction, postFunction, putFunction } from "../../functions/CRUDFunction";
import Moment from "react-moment";
class Read extends Component {
  state = {
    article: {},
    msg: "",
    user: {},
  };
  getArticle = async () => {
    const article = await getFunction("articles/" + this.props.match.params.slug);
    if (article) this.setState({ article });
    else this.setState({ msg: "Error Occured Please refrash the page" });
  };
  getUser = async () => {
    const user = await getFunction("users/me");
    if (user) {
      this.setState({ user });
    }
  };
  componentDidMount = () => {
    this.getArticle();
    this.getUser();
  };
  postReview = async (text) => {
    const review = {
      text,
      author: this.state.user._id,
    };
    const article = await postFunction("articles/" + this.props.match.params.slug + "/reviews", review);
    if (article) this.setState({ article });
    else this.setState({ msg: "Error Occured Please refrash the page" });
  };
  editResponse = async (id, text) => {
    const article = await putFunction("articles/" + this.props.match.params.slug + "/reviews/" + id, text);
    if (article) this.setState({ article });
    else this.setState({ msg: "Error Occured Please refrash the page" });
  };
  deleteResponse = async (id) => {
    const article = await deleteFunction("articles/" + this.props.match.params.slug + "/reviews/" + id);
    if (article) this.setState({ article, loading: true });
    else this.setState({ msg: "Error Occured Please refrash the page" });
  };
  componentDidUpdate = (prevProp, prevState) => {
    prevState.article !== this.state.article && this.setState({ loading: false });
  };
  postClaps = async () => {
    const article = await postFunction("articles/" + this.props.match.params.slug + "/clap", { _id: this.state.user._id });
    if (article) this.setState({ article });
    else this.setState({ msg: "Error Occured Please refrash the page" });
  };
  render() {
    const { author, content, headLine, subHead, cover, createdAt, category } = this.state.article;
    return (
      <Container className='article-container'>
        {author ? (
          <>
            <h1>{headLine}</h1>
            <Row style={{ marginTop: 20, marginBottom: 20 }}>
              <Col xs={1} className='pr-5'>
                <Image style={{ width: 50, height: 50, marginRight: 10 }} src={author.img || "https://miro.medium.com/fit/c/96/96/1*xVwJ4C9D1sjrRc-sR_jO0w.jpeg"} roundedCircle />
              </Col>
              <Col>
                {author.name}
                <p>{author.createdAt ? <Moment parse='MMM DD, YYYY HH:mm'>author.createdAt</Moment> : "Sep 23, 2018 · 3 min read"}</p>
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
            <div className='mb-3'>
              <b>{subHead}</b>
              <div className='article_text'>{content.includes("</") ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : content}</div>
              {cover && <img src={cover} className='contain w-100' />}
            </div>
            <Reactions
              reviews={this.state.article.reviews}
              claps={this.state.article.claps}
              postClaps={this.postClaps}
              editResponse={this.editResponse}
              deleteResponse={this.deleteResponse}
              user={this.state.user}
              postReview={this.postReview}
            />
          </>
        ) : (
          <div>Loading....</div>
        )}
      </Container>
    );
  }
}

export default withRouter(Read);

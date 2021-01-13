import React, { Component } from "react";
import { Alert, Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryPicker from "../../components/CategoryPicker";
import { deleteFunction, getFunction, putFunction } from "../../functions/CRUDFunction";

export default class Stories extends Component {
  state = {
    articles: [],
    currentArticle: {
      headLine: "",
      subHead: "",
      content: "",
      category: {
        name: "",
        img: "",
      },
      _id: "",
      author: {
        _id: "",
        name: "",
        img: "",
      },
      cover: "",
    },
    confirm: false,
    msg: [],
    loading: false,
  };
  getArticles = async () => {
    const articles = await getFunction("articles");
    console.log(articles);
    if (articles.length > 0) this.setState({ articles });
    else this.setState({ msg: "No articles Found" });
  };
  componentDidMount = () => {
    this.getArticles();
  };
  verify = () => {
    const { content, headLine, category, author } = this.state.article;
    return headLine.length < 1
      ? "Please add Title"
      : content.length < 1
      ? "Please add content"
      : category.name.length < 1
      ? "Please chose a category"
      : author.name.length < 1
      ? "Please log in to Post"
      : true;
  };
  updateArticle = async () => {
    const verified = this.verify();
    if (verified === true) {
      this.setState({ loading: true });
      const response = await putFunction("articles/" + this.state.currentArticle._id + "?author=1", this.state.currentArticle);
      if (response) {
        this.setState({ msg: "Article Updated" });
        this.getArticles();
        setTimeout(() => {
          this.setState({
            loading: false,
            msg: "",
            article: {
              headLine: "",
              subHead: "",
              content: "",
              _id: "",
              category: {
                name: "",
                img: "",
              },
              author: {
                _id: "",
                name: "",
                img: "",
              },
              cover: "",
            },
          });
        }, 1500);
      }
    } else {
      this.setState({ msg: verified });
      setTimeout(() => {
        this.setState({ msg: "" });
      }, 2500);
    }
  };
  deleteArticle = async () => {
    this.setState({ loading: true, confirm: false });
    const response = await deleteFunction("articles/" + this.state.currentArticle._id);
    if (response) {
      this.setState({ msg: "Article Deleted" });
      this.getArticles();
      setTimeout(() => {
        this.setState({
          loading: false,
          msg: "",
          currentArticle: {
            headLine: "",
            subHead: "",
            content: "",
            _id: "",
            category: {
              name: "",
              img: "",
            },
            author: {
              _id: "",
              name: "",
              img: "",
            },
            cover: "",
          },
        });
      }, 1500);
    }
  };
  render() {
    const { msg, loading, articles, currentArticle, confirm } = this.state;
    const { headLine, subHead, content, category, cover } = currentArticle;
    return loading ? (
      <div> loading... </div>
    ) : (
      <Container>
        {msg.length > 0 && (
          <Alert variant='warning' className='sticky-alert'>
            {msg}
          </Alert>
        )}
        {headLine && !confirm && (
          <Form onSubmit={this.updateArticle}>
            <Button className='justify-self-end' variant='light' onClick={() => this.setState({ currentArticle: {} })}>
              X
            </Button>
            <div className='category-container'>
              <CategoryPicker
                topic={category}
                onChange={(topic) => {
                  const currentArticle = { ...this.state.currentArticle };
                  currentArticle.category = topic;
                  this.setState({ currentArticle });
                }}
              />
            </div>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={headLine}
                onChange={(e) => {
                  const currentArticle = { ...this.state.currentArticle };
                  currentArticle.headLine = e.target.value;
                  this.setState({ currentArticle });
                }}
                placeholder='Title'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sub Header</Form.Label>
              <Form.Control
                type='text'
                value={subHead}
                as='textarea'
                rows={3}
                onChange={(e) => {
                  const currentArticle = { ...this.state.currentArticle };
                  currentArticle.subHead = e.target.value;
                  this.setState({ currentArticle });
                }}
                placeholder='Sub Header'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                type='text'
                value={content}
                as='textarea'
                rows={3}
                onChange={(e) => {
                  const currentArticle = { ...this.state.currentArticle };
                  currentArticle.content = e.target.value;
                }}
                placeholder='Tell your story'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type='text'
                value={cover}
                onChange={(e) => {
                  const currentArticle = { ...this.state.currentArticle };
                  currentArticle.cover = e.target.value;
                }}
                placeholder='Cover link e.g : https://picsum.photos/800'
              />
            </Form.Group>
            <Button variant='success' type='submit' className='post-btn'>
              Update Post
            </Button>
          </Form>
        )}
        {articles.length > 0 ? (
          <div>
            <h3>Your Articles</h3>
            <Container>
              {articles.map((article, i) => (
                <Row key={i} className=' border-bottom m-2 pb-3 hover'>
                  <Col sm={1} className='d-none d-md-block'>
                    {i + 1}
                  </Col>
                  <Col xs={8} sm={2}>
                    {" "}
                    <Link to={"/read/" + article._id}>
                      <b>{article.headLine} </b>{" "}
                    </Link>
                  </Col>
                  <Col xs={8} sm={2}>
                    {article.subHead || ""}
                  </Col>
                  <Col sm={2} className='d-none d-md-block'>
                    {article.category.name}
                  </Col>
                  <Col xs={12} sm={3}>
                    {article.content}
                  </Col>
                  <Col xs={4} sm={2} className='d-flex'>
                    <Button
                      variant='outline-warning'
                      className='text-nowrap mr-3'
                      onClick={() => {
                        this.setState({ currentArticle: article });
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Edit Post
                    </Button>
                    <Button variant='outline-danger' className='text-nowrap' onClick={() => this.setState({ currentArticle: article, confirm: true })}>
                      Delete Post
                    </Button>
                  </Col>
                </Row>
              ))}
            </Container>
          </div>
        ) : (
          <div>
            <b>No articles Posted yet!</b>{" "}
            <Link to='/new-story'>
              <div>Post your first Article</div>
            </Link>
          </div>
        )}
        {
          <Modal show={confirm} onHide={() => this.setState({ confirm: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => this.setState({ confirm: false })}>
                No
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  this.deleteArticle();
                  this.setState({ confirm: false });
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </Container>
    );
  }
}

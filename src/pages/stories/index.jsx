import React, { Component } from "react";
import { Alert, Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
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
      author: "",
      cover: "",
    },
    user: {},
    confirm: false,
    msg: [],
    loading: false,
  };
  getArticles = async () => {
    const user = await getFunction("users/me");
    if (user) this.setState({ articles: user.articles, user: user });
    else this.setState({ msg: "No articles Found" });
  };
  componentDidMount = () => {
    this.getArticles();
  };
  verify = () => {
    const { content, headLine, category } = this.state.currentArticle;
    return headLine.length < 1 ? "Please add Title" : content.length < 1 ? "Please add content" : category.name.length < 1 ? "Please chose a category" : true;
  };
  updateArticle = async (e) => {
    e.preventDefault();
    const verified = this.verify();
    if (verified === true) {
      this.setState({ loading: true });
      const response = await putFunction("articles/" + this.state.currentArticle._id, this.state.currentArticle);
      if (response) {
        this.setState({ msg: "Article Updated" });
        this.getArticles();
        setTimeout(() => {
          this.setState({
            loading: false,
            msg: "",
            currentArticle: {},
            article: {},
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
    this.setState({ loading: true });
    const response = await deleteFunction("articles/" + this.state.currentArticle._id);
    if (response.ok) {
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
            author: "",
            cover: "",
            loading: false,
          },
        });
      }, 1500);
    } else {
      console.log(response);
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

            <Form.Label>Content</Form.Label>
            <ReactQuill
              modules={Stories.modules}
              id='content'
              value={content}
              formats={Stories.formats}
              ref={this.editor}
              theme='bubble'
              onChange={(html) => {
                const { currentArticle } = this.state;
                currentArticle.content = html;
                this.setState({ currentArticle });
              }}
              placeholder='Tell your story...'
            />

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
                <Row key={i} className=' border-bottom m-2 pb-3 hover' style={{ height: "200px", overflowX: "hidden" }}>
                  <Col xs={10} sm={8}>
                    <b>No.</b> {i + 1}
                    <Link to={"/read/" + article._id}>
                      <h2>{article.headLine} </h2>{" "}
                    </Link>
                    <h5> {article.subHead || ""}</h5>
                    {article.content.includes("</") ? <div dangerouslySetInnerHTML={{ __html: article.content }}></div> : <div> {article.content}</div>}
                    {article.img && <img src={article.img} className='img-fluid' />}
                  </Col>
                  <Col sm={2} className='d-none d-md-block' className='d-none d-sm-block'>
                    <div>
                      <img src={article.category.img} className='img-fluid w-50 mr-3' />
                      {article.category.name}
                    </div>
                  </Col>
                  <div xs={4} sm={2} className=''>
                    <Button
                      variant='outline-warning'
                      className='text-nowrap w-100 mb-3'
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
                    <Button variant='outline-danger' className='text-nowrap w-100' onClick={() => this.setState({ currentArticle: article, confirm: true })}>
                      Delete Post
                    </Button>
                  </div>
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
                  this.setState({ confirm: false });
                  this.deleteArticle();
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

Stories.modules = {
  toolbar: [[{ header: "1" }, { header: "2" }], ["bold", "italic", "blockquote"], [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }], ["link", "image"], ["clean"]],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Stories.formats = ["header", "bold", "italic", "blockquote", "align", "link", "image"];

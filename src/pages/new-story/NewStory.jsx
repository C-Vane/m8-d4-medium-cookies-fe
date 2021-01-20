import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Alert, Container } from "react-bootstrap";
import "react-quill/dist/quill.bubble.css";
import { Button } from "react-bootstrap";
import "./styles.scss";
import CategoryPicker from "../../components/CategoryPicker";
import { postFunction } from "../../functions/CRUDFunction";

export default class NewStory extends Component {
  state = {
    article: {
      headLine: "",
      subHead: "",
      content: "",
      category: {
        name: "",
        img: "",
      },
      author: "6000abec6be406061cbda560",
      cover: "",
    },
    msg: "",
    loading: false,
  };
  editor = React.createRef();
  onChange = (e) => {
    const article = { ...this.state.article };
    if (typeof e === "string") {
      console.log(e);
      article.content = e;
      this.setState({ article });
    } else {
      article[e.target.id] = e.target.value;
      this.setState({ article });
    }
  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.editor && this.editor.current.focus();
    }
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
  postArticle = async () => {
    const verified = this.verify();
    if (verified === true) {
      this.setState({ loading: true });
      const response = await postFunction("articles", this.state.article);
      if (response) {
        this.setState({ msg: "Article Posted" });
        setTimeout(() => {
          this.setState({
            loading: false,
            msg: "",
            article: {
              headLine: "",
              subHead: "",
              content: "",
              category: {
                name: "",
                img: "",
              },
              author: {
                _id: "6000abec6be406061cbda560",
                name: "Vanessa",
                img: "https://myworkspace.matrix42.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
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
  render() {
    const { msg, loading, article } = this.state;
    const { content, headLine, subHead, cover } = article;
    return (
      <Container className='new-story-container' expand='md'>
        {msg.length > 0 && (
          <Alert variant='warning' className='sticky-alert'>
            {msg}
          </Alert>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className='category-container'>
              <CategoryPicker
                onChange={(topic) => {
                  const article = { ...this.state.article };
                  article.category = topic;
                  this.setState({ article });
                }}
              />
            </div>
            <input onKeyDown={this.onKeyDown} value={headLine} id='headLine' onChange={this.onChange} placeholder='Title' className='article-title-input' />
            <input onKeyDown={this.onKeyDown} value={subHead} id='subHead' onChange={this.onChange} placeholder='Sub header' className='article-subHeader-input mt-0 pt-0' />

            <ReactQuill modules={NewStory.modules} id='content' value={content} formats={NewStory.formats} ref={this.editor} theme='bubble' onChange={this.onChange} placeholder='Tell your story...' />
            <input onKeyDown={this.onKeyDown} id='cover' value={cover} onChange={this.onChange} placeholder='Cover link e.g : https://picsum.photos/800' className='article-cover-input' />

            <Button variant='success' onClick={this.postArticle} className='post-btn'>
              Post
            </Button>
          </>
        )}
      </Container>
    );
  }
}

NewStory.modules = {
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
NewStory.formats = ["header", "bold", "italic", "blockquote", "align", "link", "image"];

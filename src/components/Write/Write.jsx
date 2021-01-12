import React, { Component } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default class Write extends Component {
  state = {
    html: "",
  };
  onChange = (html) => this.setState({ html });
  render() {
    const { html } = this.state;
    return (
      <div>
        <ReactQuill theme="snow" value={html} onChange={this.onChange}   />
      </div>
    );
  }
}

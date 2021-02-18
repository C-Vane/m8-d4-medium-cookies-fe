import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
class ArticleItemDetails extends React.Component {
  render() {
    return (
      <div className={"pr-3"}>
        <div className={"d-flex align-center mb-2"}>
          <Link to={"/read/" + this.props.article._id}>
            <img alt='cover' style={{ width: "20px", height: "20px" }} src={"https://miro.medium.com/fit/c/20/20/1*xF11-TSkpJSCgLc75f-DFw.jpeg"} />
          </Link>
          <span className={"author"}>
            <Link to={"/read/" + this.props.article._id}>
              <b>{this.props.article.author.name} </b> in <b>Better Advice</b>
            </Link>
          </span>
        </div>
        <Link to={"/read/" + this.props.article._id}>
          <span
            className={"heading"}
            style={{
              fontSize: this.props.headingFont === "small" ? "16px" : "22px",
              lineHeight: this.props.headingFont === "small" ? "20px" : "28px",
            }}
          >
            {this.props.article.headLine}
          </span>
        </Link>

        {this.props.subheading && (
          <div className={"subheading"}>
            <p>
              <Link to={"/read/" + this.props.article._id}>{this.props.article.subHead}</Link>
            </p>
          </div>
        )}
        <div className={"d-flex align-baseline justify-between mt-2"}>
          <h4 className={"date"}>
            <div className={"d-flex"}>
              <span>Oct 16, 2020</span>
              <div>
                <span>
                  <span>·</span>
                </span>
              </div>

              <span>
                <span>4 min read</span>
              </span>
            </div>
          </h4>
        </div>
      </div>
    );
  }
}

export default ArticleItemDetails;

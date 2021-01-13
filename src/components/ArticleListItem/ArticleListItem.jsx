import React from "react";
import { Link } from "react-router-dom";
import ArticleItemDetails from "../ArticleItemDetails/ArticleItemDetails";
import "./styles.scss";
class ArticleListItem extends React.Component {
  render() {
    console.log(this.props.article._id);
    return (
      <div className={`w-100 d-flex mb-auto justify-content-between align-start  pb-4 ${this.props.articleImg === "top" && "flex-column-reverse"}`}>
        <ArticleItemDetails {...this.props} />
        {this.props.articleImg && (
          <Link to={"/read/" + this.props.article._id}>
            <img alt='cover' className={this.props.articleImg === "top" ? "img-large" : "img-small"} src={this.props.article.cover} />
          </Link>
        )}
      </div>
    );
  }
}

export default ArticleListItem;

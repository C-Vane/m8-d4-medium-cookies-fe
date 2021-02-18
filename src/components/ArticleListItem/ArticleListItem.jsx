import React from "react";
import { Link } from "react-router-dom";
import ArticleItemDetails from "../ArticleItemDetails/ArticleItemDetails";
import "./styles.scss";
class ArticleListItem extends React.Component {
  render() {
    return (
      <div className={`w-100 d-flex mb-auto justify-content-between align-start  pb-4 ${this.props.articleImg === "top" && "flex-column-reverse"}`}>
        {this.props.article && (
          <>
            {" "}
            <ArticleItemDetails {...this.props} />
            {this.props.article.cover && (
              <Link to={"/read/" + this.props.article._id}>
                <img alt='cover' className={this.props.articleImg === "top" ? "img-large" : "img-small"} src={this.props.article.cover} />
              </Link>
            )}
          </>
        )}
      </div>
    );
  }
}

export default ArticleListItem;

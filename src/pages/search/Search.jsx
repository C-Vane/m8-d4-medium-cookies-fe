import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import "./styles.scss";
import TagsList from "../../components/TagsList/TagsList";
import queryString from "query-string";
import { getFunction } from "../../functions/CRUDFunction";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    const search = queryString.parse(props.location.search);

    this.state = {
      selected: search.topic ? "topics" : "articles",
      query: search.topic || search.article || "",
      articles: [],
    };
  }

  componentDidMount = () => {
    this.getArticles();
    this.queryDidChange(this.state.query);
  };

  getArticles = async (search, page) => {
    const articles = await getFunction(search ? "articles?search=" + search : "articles");
    if (articles) this.setState({ articles });
  };
  queryDidChange = (newQuery) => {
    const query = newQuery.toLocaleLowerCase();
    this.setState({ query: newQuery });
    query.length > 3 && this.getArticles(query);
    query.length === 0 && this.getArticles();
  };

  setSelected = (selection) => {
    this.state.selected !== selection && this.setState({ selected: selection }, () => this.queryDidChange(this.state.query));
  };

  render() {
    return (
      <Container id='search-page'>
        <Row>
          <Col xs={12}>
            <input type='search' placeholder='Search...' className='my-3' value={this.state.query} onChange={({ target }) => this.queryDidChange(target.value)} />
            {["Articles", "Topics"].map((option) => {
              const _ = option.toLocaleLowerCase();
              return (
                <span onClick={() => this.setSelected(_)} className={`pr-3 m-2 user-select-none cursor-pointer ${this.state.selected === _ ? "selected" : ""}`}>
                  {option}
                </span>
              );
            })}
          </Col>

          <Col xs={12} md={4} className='order-md-2'>
            <TagsList />
          </Col>
          <Col xs={12} md={8} className='mt-4'>
            {this.state.articles.map((article) => (
              <ArticleListItem article={article} articleImg={"top"} headingFont={"large"} subheading />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

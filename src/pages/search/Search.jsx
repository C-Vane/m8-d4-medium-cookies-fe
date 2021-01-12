import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";

import './styles.scss'
import articles from '../home/articles.json'
import TagsList from '../../components/TagsList/TagsList';
import queryString from 'query-string'

export default class Search extends React.Component {

    constructor(props) {
        super(props)
        const search = queryString.parse(props.location.search)
        
        this.state = { 
            selected: search.topic ? 'topics' : 'articles',
            query: search.topic || search.article || '',
            articles
        }
    }

    componentDidMount = () => this.queryDidChange(this.state.query)

    queryDidChange = (newQuery) => {
        const query = newQuery.toLocaleLowerCase()
        this.setState({
            query,
            articles: query 
                        ? this.state.selected === 'articles' 
                            ? articles.filter( article => article.headLine.toLocaleLowerCase().includes(query) ) 
                            : articles.filter( article => article.category && article.category.toLocaleLowerCase().includes(query))
                        : articles
        })
    }

    setSelected = (selection) => {
        this.state.selected !== selection && this.setState({selected: selection}, () => this.queryDidChange(this.state.query))
    }

    render () {
        return <Container id="search-page">
            <Row>
                <Col xs={12} >
                    <input type="search" placeholder="Search..."
                        className="my-3" 
                        value={this.state.query} 
                        onChange={({target}) => this.queryDidChange(target.value)}/>
                    {
                        ['Articles', 'Topics'].map( option => {
                            const _ = option.toLocaleLowerCase()
                            return (
                                <span onClick={() => this.setSelected(_)} 
                                    className={`pr-3 m-2 user-select-none cursor-pointer ${this.state.selected === _ ? 'selected': ''}`}
                                    >
                                    {option}
                                </span>
                            )
                        } )
                    }
                </Col>

                <Col xs={12} md={4} className="order-md-2">
                    <TagsList />
                </Col>
                <Col xs={12} md={8} className="mt-4">
                    {
                        this.state.articles.map( article => <ArticleListItem
                            article={article}
                            articleImg={"top"}
                            headingFont={"large"}
                            subheading
                            />)
                    }
                </Col>
            </Row>
        </Container>
    }
}
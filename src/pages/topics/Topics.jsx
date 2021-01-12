import React from "react";
import { Container, Row, Button, Col, Card } from "react-bootstrap";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import './styles.scss'

import topics from './data'

export default class Topics extends React.Component {
  render = () => (
    <Container id="topics-page">
      <CategoriesBar />
      <Row className="px-3">
        <Col xs={12}>
          <h2>Explore Topics</h2>
          
        </Col>
      </Row>
      {
        Object.entries(topics).map(([topic, subs]) => (
          <>
            <Col xs={12}>
              <div className="subject-wrapper">
                <div className="d-flex">
                  <h4>{topic}</h4>
                </div>
              </div>
            </Col>
            <Row className="px-5">
            {
              Object.entries(subs).map(([title, image]) => (
                <Col xs={12} md={6} lg={4} className="my-4 ">
                  <Card>
                    <Card.Body>
                      <Card.Title className="topic-title">
                        {title}
                        <Button variant="outline-dark" className="rounded-pill">
                          <span>
                            <svg width="25" height="25">
                              <path d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7" fill-rule="evenodd" />
                            </svg>
                          </span>
                        </Button>
                      </Card.Title>
                    </Card.Body>
                    <Card.Img variant="top" src={image} />
                  </Card>
                </Col>
              ))
            }
            </Row>
          </>)
        )
      }
    </Container>
  );
}
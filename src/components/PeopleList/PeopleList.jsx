import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFunction } from "../../functions/CRUDFunction";
import "./styles.scss";

export default class PeopleList extends React.Component {
  state = { people: [] };

  componentDidMount = async () => {
    const users = await getFunction("users");
    if (users) {
      const people = users
        .map((person) => ({
          ...person,
          newStories: Math.random() > 0.5 ? Math.floor(Math.random() * 20) : 0,
        }))
        .sort((a, b) => b.newStories - a.newStories);
      this.setState({ people });
    }
  };

  render = () => (
    <div className='people-container'>
      {this.state.people.map((person, key) => (
        <Card key={key} style={{ border: "none", margin: "2px", position: "relative" }}>
          <Card.Img variant='top' src={person.img} className='rounded-circle' />
          {person.newStories > 0 && (
            <Badge
              pill
              variant='dark'
              className='position-absolute'
              style={{
                right: 0,
                padding: "0.3em 0.5em",
                border: "2px solid white",
              }}
            >
              {" "}
              {person.newStories > 9 ? "9+" : person.newStories}{" "}
            </Badge>
          )}
          <Card.Body className='p-0 text-center'>
            <Link to='#' className='text-decoration-none' style={{ color: "#292929" }}>
              <span style={{ fontSize: "0.7em", display: "inline-block" }}>
                {person.name} {person.surname}
              </span>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

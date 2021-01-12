import React, { useState } from "react";

import { FormControl, Dropdown, Row, Col } from "react-bootstrap";
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu

import topics from "../../pages/topics/data.json";
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer", marginBottom: "1em" }}
  >
    {children}
  </span>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <div
          style={{
            position: "sticky",
            top: -10,
            background: "white",
            zIndex: 2,
            marginBottom: 50,
            border: "1px solid white",
          }}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Filter topics"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>

        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value ||
              child.props.children.props.id
                .toLowerCase()
                .startsWith(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);

export default function CategoryPicker(props) {
  const [allTopics, setAllTopics] = React.useState([]);
  const [topic, setTopic] = React.useState({
    name: "Select a topic",
    img: "https://picsum.photos/200",
  });
  React.useEffect(() => {
    const mainTopics = Object.values(topics);
    const allTopics = mainTopics.reduce((acc, curr) => {
      const entries = Object.entries(curr);
      const subTopics = entries.map(([name, img]) => ({ name, img }));
      return [...acc, ...subTopics];
    }, []);
    setAllTopics(allTopics);
  }, []);
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {topic && (
          <div>
            <img alt="topic" src={topic.img} width={30} height={30} />

            <span style={{ marginLeft: "1em" }}>{topic.name} </span>
          </div>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ height: 400, overflowY: "auto" }} as={CustomMenu}>
        {allTopics.map((topic, index) => (
          <Dropdown.Item
            onClick={() => {
              setTopic(topic);
              props.onChange && props.onChange(topic);
            }}
            key={index}
            eventKey={index.toString()}
          >
            <Row id={topic.name}>
              <Col xs={2}>
                <img alt="topic" src={topic.img} width={30} height={30} />
              </Col>
              <Col>{topic.name}</Col>
            </Row>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

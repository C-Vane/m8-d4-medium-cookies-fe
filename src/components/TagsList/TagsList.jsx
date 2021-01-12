import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
class TagsList extends React.Component {
  state = {
    tags: [
      "React",
      "JavaScript",
      "Web Development",
      "Programming",
      "React Native",
      "React.js",
      "Redux",
      "Front End Development",
      "Technology",
      "Startup",
    ],
  };
  render() {
    return (
      <div className={"w-100 px-5"}>
        <div className={"w-100 header"}>
          <span>tags</span>
        </div>
        <ul className={"tags-list "}>
          {this.state.tags.map((tag) => (
            <li>
              <Link to={"/"}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TagsList;

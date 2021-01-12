import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import './styles.scss'

export default class CategoriesBar extends React.Component {
  state = {
    scroll: 0,
  };

  scrollContent = React.createRef(null);
  scrollContentWrapper = React.createRef(null);

  render() {
    const topics = [
      "POPULAR",
      "MOMENTUM",
      "CORONAVIRUS",
      "ONEZERO",
      "ELEMENTAL",
      "GEN",
      "ZORA",
      "FORGE",
      "HUMAN PARTS",
      "MARKER",
      "LEVEL",
      "HEATED",
    ];
    return (
      <nav id="navbar-categories">
        <div
          className={`arrow-wrapper ${
            this.state.scroll < 0 ? "cursor-pointer" : ""
          }`}
        >
          <IoChevronBackOutline
            style={{ fontSize: 20 }}
            onClick={() => {
              this.setState({ scroll: 0 });
            }}
          />
        </div>
        <div className="scroll-content-wrapper" ref={this.scrollContentWrapper}>
          <div
            style={{
              transform: `translateX(${this.state.scroll}px)`,
            }}
            className="scroll-content"
            ref={this.scrollContent}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {topics.map((topic) => (
              <li key={uniqid()}>
                <Link to={`/topics/${topic.toLocaleLowerCase()}`}>{topic}</Link>
              </li>
            ))}
            <li>
              <Link to="/">More</Link>
            </li>
          </div>
        </div>
        <div
          className={`arrow-wrapper ${
            this.state.scroll === 0 ? "cursor-pointer" : ""
          }`}
          onClick={() => {
            this.setState({
              scroll:
                this.scrollContentWrapper.current.offsetWidth -
                this.scrollContent.current.scrollWidth,
            });
          }}
        >
          <IoChevronForwardOutline style={{ fontSize: 20 }} />
        </div>
      </nav>
    );
  }
}

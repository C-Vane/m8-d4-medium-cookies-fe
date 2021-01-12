import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
function Footer(props) {
  return (
    <div className={"d-flex flex-wrap  pt-4"}>
      <Link className={"footer-link"} to={"/"}>
        Help
      </Link>
      <Link className={"footer-link"} to={"/"}>
        Status
      </Link>
      <Link className={"footer-link"} to={"/"}>
        Writers
      </Link>
      <Link className={"footer-link"} to={"/"}>
        Blog
      </Link>
      <Link className={"footer-link"} to={"/"}>
        Careers
      </Link>
      <Link className={"footer-link"} to={"/"}>
        Privacy
      </Link>
      <Link className={"footer-link"} to={"/"}>
        Terms
      </Link>
      <Link className={"footer-link"} to={"/"}>
        About
      </Link>
    </div>
  );
}

export default Footer;

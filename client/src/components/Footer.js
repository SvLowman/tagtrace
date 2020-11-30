import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <hr />
    <h2>- Footer -</h2>
    <div>
      <Link to="/gallery">
        <Link to="/">
          <Button label="➕" />
        </Link>
        <Button label="👁" />
      </Link>
      <Link to="/tagging">
        <Button label="🏷" />
      </Link>
    </div>
  </footer>
);

export default Footer;

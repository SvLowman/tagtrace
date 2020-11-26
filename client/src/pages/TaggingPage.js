import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const TaggingPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Tagging-Seite 🤔</h2>
    </section>
    <div>
      <Link to="/">
        <Button label="➕" />
      </Link>
      <Link to="/album">
        <Button label="👁" />
      </Link>
    </div>
  </div>
);

export default TaggingPage;

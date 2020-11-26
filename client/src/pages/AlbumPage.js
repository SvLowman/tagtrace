import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const AlbumPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Album-Seite 🤩</h2>
    </section>
    <div>
      <Link to="/">
        <Button label="➕" />
      </Link>
      <Link to="/tagging">
        <Button label="🏷" />
      </Link>
    </div>
  </div>
);

export default AlbumPage;

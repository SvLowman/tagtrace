import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import styled from "styled-components";

const Display = styled.div`
  border: solid 1px lightgray;
`;

const AlbumPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Album-Seite 🤩</h2>
    </section>
    <Display>
      <img src="" alt="testImage" />
      <p>Display für Response der GET-Route</p>
    </Display>
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

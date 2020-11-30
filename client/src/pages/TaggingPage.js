import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import styled from "styled-components";

const Display = styled.div`
  border: solid 1px lightgray;
`;

const TaggingPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Tagging-Seite 🤔</h2>
    </section>
    <Display>
      <img src="" alt="testImage" />
      <p>Display für Response der GET-Route</p>
    </Display>
    <div>
      <Button
        label="Zur UPDATE-Route"
        onClick={() => {
          alert("Der Button funktioniert.");
        }}
      />
      <Button
        label="Zur DELETE-Route"
        onClick={() => {
          alert("Der Button funktioniert.");
        }}
      />
    </div>
    <div>
      <Link to="/">
        <Button label="➕" />
      </Link>
      <Link to="/gallery">
        <Button label="👁" />
      </Link>
    </div>
  </div>
);

export default TaggingPage;

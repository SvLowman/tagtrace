import React from "react";
import { Button } from "../components/Button";
import styled from "styled-components/macro";

const Display = styled.div`
  border: solid 1px lightgray;
`;

const TaggingPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Tagging-Seite 🤔</h2>
    </section>
    <Display>
      <p>Hier soll ein ausgewähltes Bild stehen</p>
      <img
        src="https://res.cloudinary.com/tagtrace/image/upload/v1606822076/TagTrace/wmcwfmhypvc06pnjtcpg.jpg"
        alt="testImage"
      />
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
  </div>
);

export default TaggingPage;

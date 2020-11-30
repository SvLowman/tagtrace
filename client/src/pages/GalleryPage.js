import React from "react";
import styled from "styled-components";

const Display = styled.div`
  border: solid 1px lightgray;
`;

const GalleryPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Album-Seite 🤩</h2>
    </section>
    <Display>
      <img src="" alt="testImage" />
      <p>Display für Response der GET-Route</p>
    </Display>
  </div>
);

export default GalleryPage;

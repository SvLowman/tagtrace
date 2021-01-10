import React from "react";
import styled from "styled-components/macro";

const TopElementContainer = styled.div`
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  font-family: var(--tagfont);
  background: var(--header);
  height: 3rem;
`;

const TopElement = () => (
  <TopElementContainer>
    <section>
      <p>TagTrace</p>
    </section>
  </TopElementContainer>
);

export default TopElement;

import React from "react";
import styled from "styled-components/macro";

const TopElementContainer = styled.div`
  border-bottom: solid 1px black;
`;

const TopElement = () => (
  <TopElementContainer>
    <section>
      <h4>Trace your Tags</h4>
    </section>
  </TopElementContainer>
);

export default TopElement;

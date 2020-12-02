import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  border-bottom: solid 1px black;
`;

const Page = () => (
  <HeaderContainer>
    <section>
      <h2>- This serves as a header -</h2>
    </section>
  </HeaderContainer>
);

export default Page;

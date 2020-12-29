import React from "react";
import styled from "styled-components/macro";

const LogoContainer = styled.div`
  border-bottom: solid 1px lightgray;
`;

const SplashPage = () => (
  <LogoContainer>
    <section>
      <h2>Trace your Tags! 😛</h2>
    </section>
  </LogoContainer>
);

export default SplashPage;

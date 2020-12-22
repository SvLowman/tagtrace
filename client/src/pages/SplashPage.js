import React from "react";
import styled from "styled-components/macro";

const LogoContainer = styled.div`
  border-bottom: solid 1px lightgray;
`;

const SplashPage = () => (
  <LogoContainer>
    <section>
      <h2>Das hier ist die Splash-Page 😛</h2>
    </section>
  </LogoContainer>
);

export default SplashPage;

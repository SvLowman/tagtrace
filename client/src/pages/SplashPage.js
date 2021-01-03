import React from "react";
import styled from "styled-components/macro";

const LogoContainer = styled.div`
  border: solid 1px lightgray;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoGridContainer = styled.div`
  margin-bottom: 3rem;
  display: grid;
  grid-template-rows: 4rem 4rem 4rem 4rem;
  grid-template-columns: 4rem 4rem 4rem 4rem;
  div {
    font-family: var(--tagfont);
    font-size: 2rem;
    display: grid;
    align-content: center;
  }
`;
const SecondSquare = styled.div`
  border: solid 1px transparent;
  border-left: solid 1px var(--light);
  grid-column: 2;
  grid-row: 1;
`;
const SixthSquare = styled.div`
  border: solid 1px transparent;
  border-left: solid 1px var(--light);
  grid-column: 2;
  grid-row: 2;
`;
const NinthSquare = styled.div`
  border: solid 1px transparent;
  border-top: solid 1px var(--light);
  grid-column: 1;
  grid-row: 3;
`;
const TenthSquare = styled.div`
  border: solid 1px transparent;
  background: linear-gradient(160deg, var(--active), var(--active-gradient));
  border-top: solid 1px var(--light);
  border-right: solid 1px var(--light);
  grid-column: 2;
  grid-row: 3;
`;
const EleventhSquare = styled.div`
  border: solid 1px transparent;
  border-bottom: solid 1px var(--light);
  grid-column: 3;
  grid-row: 3;
`;
const TwelvethSquare = styled.div`
  border: solid 1px transparent;
  border-bottom: solid 1px var(--light);
  grid-column: 4;
  grid-row: 3;
`;
const FourteenthSquare = styled.div`
  border: solid 1px transparent;
  border-right: solid 1px var(--light);
  grid-column: 2;
  grid-row: 4;
`;

const SplashPage = () => (
  <LogoContainer>
    <LogoGridContainer>
      <SecondSquare>T</SecondSquare>
      <SixthSquare>R</SixthSquare>
      <NinthSquare>T</NinthSquare>
      <TenthSquare>A</TenthSquare>
      <EleventhSquare>C</EleventhSquare>
      <TwelvethSquare>E</TwelvethSquare>
      <FourteenthSquare>G</FourteenthSquare>
    </LogoGridContainer>
    <section>
      <h2>Trace your Tags! 😛</h2>
    </section>
  </LogoContainer>
);

export default SplashPage;

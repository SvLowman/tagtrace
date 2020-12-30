import React from "react";
// import { Button } from "./Button";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const NavButton = styled.button`
  border: solid 1px lightgray;
`;

const NavContainer = styled.nav`
  background: var(--header);
  border-top: solid 1px black;
  position: fixed;
  bottom: 0;
  width: 100vw;
`;

const BottomNavContainer = () => (
  <NavContainer>
    <div>
      <Link to="/">
        <NavButton label="➕ Hinzufügen">➕ Hinzufügen</NavButton>
      </Link>
      <Link to="/tagging">
        <NavButton label="🖍 Bearbeiten">🖍 Bearbeiten</NavButton>
      </Link>
      <Link to="/gallery">
        <NavButton label="👁 Ankucken">👁 Ankucken</NavButton>
      </Link>
    </div>
  </NavContainer>
);

export default BottomNavContainer;

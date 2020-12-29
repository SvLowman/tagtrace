import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const NavContainer = styled.nav`
  border-top: solid 1px black;
`;

const BottomNavContainer = () => (
  <NavContainer>
    <div>
      <Link to="/">
        <Button label="➕ Hinzufügen" />
      </Link>
      <Link to="/tagging">
        <Button label="🖍 Bearbeiten" />
      </Link>
      <Link to="/gallery">
        <Button label="👁 Ankucken" />
      </Link>
    </div>
  </NavContainer>
);

export default BottomNavContainer;

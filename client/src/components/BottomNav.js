import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  border-top: solid 1px black;
`;

const BottomNavContainer = () => (
  <NavContainer>
    <h2>- BottomNav -</h2>
    <div>
      <Link to="/">
        <Button label="➕" />
      </Link>
      <Link to="/gallery">
        <Button label="👁" />
      </Link>
      <Link to="/tagging">
        <Button label="🏷" />
      </Link>
    </div>
  </NavContainer>
);

export default BottomNavContainer;

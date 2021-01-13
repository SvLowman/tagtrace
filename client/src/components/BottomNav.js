import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";

const NavButton = styled.button`
  border: none;
  color: ${(props) => (props.active ? "var(--active)" : "var(--light)")};
`;

const NavContainer = styled.nav`
  background: var(--header);
  border-top: solid 1px black;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const BottomNavContainer = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <Link to="/">
        <NavButton active={location.pathname === "/"}>+ Hinzufügen</NavButton>
      </Link>
      <Link to="/tagging">
        <NavButton active={location.pathname === "/tagging"}>
          🖍 Bearbeiten
        </NavButton>
      </Link>
      <Link to="/gallery">
        <NavButton active={location.pathname === "/gallery"}>
          👁 Ankucken
        </NavButton>
      </Link>
    </NavContainer>
  );
};

export default BottomNavContainer;

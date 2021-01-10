import styled from "styled-components/macro";

export const ImageDisplay = styled.div``;

export const ImageContainer = styled.div`
  background: var(--image-container);
  width: 100%;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  @media (min-width: 1000px) and (orientation: landscape) {
    height: calc(100vh - 6.3rem);
    width: calc(100vh - 6.3rem);
    position: relative;
  }
`;

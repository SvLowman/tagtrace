import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Display = styled.div`
  height: 50vw;
  width: 50vw;
  background: var(--image-container);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 2rem;
`;
const PreviewImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const UploadPreview = ({ src, alt }) => {
  return (
    <Display>
      <PreviewImage src={src} alt={alt} />
    </Display>
  );
};

export default UploadPreview;

UploadPreview.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

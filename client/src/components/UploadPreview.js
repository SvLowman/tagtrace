import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Display = styled.div`
  height: 50vw;
  width: 50vw;
  border: solid 1px lightgray;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
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

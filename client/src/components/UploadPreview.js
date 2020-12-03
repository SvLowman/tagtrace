import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Display = styled.div`
  height: 10rem;
  width: 10rem;
  border: solid 1px black;
  margin: 0 auto;
`;
const PreviewImage = styled.img`
  height: 10rem;
  width: 10rem;
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

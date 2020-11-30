import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Display = styled.div`
  height: 10rem;
  width: 10rem;
  border: solid 1px black;
  margin-left: auto;
  margin-right: auto;
`;
const IMG = styled.img`
  height: 10rem;
  width: 10rem;
`;

const UploadPreview = ({ src, alt }) => {
  return (
    <Display>
      <IMG src={src} alt={alt} />
    </Display>
  );
};

export default UploadPreview;

UploadPreview.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

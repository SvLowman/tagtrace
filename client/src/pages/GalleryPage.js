import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
// import { Button } from "../components/Button";
import { ImageContainer } from "../components/Display";
import { getImageObj } from "../utils/api";
import { useQuery } from "react-query";

const TagDisplay = styled.div`
  border: solid 1px lightgray;
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const NextImageButton = styled.button`
  border: solid 1px lightgray;
  position: absolute;
  align-self: flex-end;
  right: 0;
`;

const PreviousImageButton = styled.button`
  border: solid 1px lightgray;
  position: absolute;
  align-self: flex-end;
  left: 0;
`;

const TagButton = styled.button`
  border: solid 1px lightgray;
`;

const GalleryPage = ({ selectedImage, setSelectedImage }) => {
  const userName = "sven";
  const { data: userData, isLoading, isError, error } = useQuery(
    "allImages",
    () => getImageObj(userName)
  );

  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (userData) {
      setAllImages(userData.images);
    }
  }, [userData, setAllImages]);

  const [selectedTag, setSelectedTag] = useState("");

  const filteredImages = selectedTag
    ? allImages.filter((image) => image.tags.includes(selectedTag))
    : allImages;

  const indexOfSelectedImage = filteredImages.indexOf(selectedImage);
  const nextImage = filteredImages[indexOfSelectedImage + 1];
  const loadNextImage = () => {
    setSelectedImage(nextImage);
  };

  const previousImage = filteredImages[indexOfSelectedImage - 1];
  const loadPreviousImage = () => {
    setSelectedImage(previousImage);
  };

  return (
    <>
      {allImages && (
        <div>
          <ImageContainer>
            <PreviousImageButton
              label="◀"
              type="submit"
              onClick={loadPreviousImage}
              disabled={!previousImage}
            >
              ◀
            </PreviousImageButton>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error}</p>}
            {selectedImage && <Image src={selectedImage.url} alt="" />}
            <NextImageButton
              label="▶"
              type="submit"
              onClick={loadNextImage}
              disabled={!nextImage}
            >
              ▶
            </NextImageButton>
          </ImageContainer>
          <TagDisplay>
            {selectedImage &&
              selectedImage.tags.map((tag) => (
                <TagButton
                  key={tag}
                  label={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                  }}
                >
                  {tag}
                </TagButton>
              ))}
          </TagDisplay>
        </div>
      )}
    </>
  );
};

export default GalleryPage;

GalleryPage.propTypes = {
  selectedImage: PropTypes.any,
  setSelectedImage: PropTypes.any,
};

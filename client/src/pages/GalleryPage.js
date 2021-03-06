import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ImageContainer } from "../components/Display";
import { getImageObj } from "../utils/api";
import { useQuery } from "react-query";

const GalleryPageContainer = styled.div`
  @media (min-width: 1000px) and (orientation: landscape) {
    height: calc(100vh - 6.3rem);
    display: grid;
    grid-template-columns: auto calc(100vh - 6.3rem) 33%;
  }
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const NextImageButton = styled.button`
  color: ${(props) =>
    props.disabled ? "rgba(220, 228, 204, 0.3)" : "var(--light)"};
  border-radius: 50%;
  border: ${(props) =>
    props.disabled
      ? "solid 1px rgba(220, 228, 204, 0.3)"
      : "solid 1px rgba(220, 228, 204, 0.6)"};
  padding: 0.5rem 0.8rem;
  margin: 0 2% 2% 0;
  position: absolute;
  align-self: flex-end;
  right: 0;
`;

const PreviousImageButton = styled.button`
  color: ${(props) =>
    props.disabled ? "rgba(220, 228, 204, 0.3)" : "var(--light)"};
  border-radius: 50%;
  border: ${(props) =>
    props.disabled
      ? "solid 1px rgba(220, 228, 204, 0.3)"
      : "solid 1px rgba(220, 228, 204, 0.5)"};
  padding: 0.5rem 0.8rem;
  margin: 0 0 2% 2%;
  position: absolute;
  align-self: flex-end;
  left: 0;
`;

const TagDisplay = styled.div`
  margin: 2% 2% 5rem;
  @media (min-width: 1000px) and (orientation: landscape) {
    margin: 2% 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const TagButton = styled.button`
  border: solid 1px rgba(220, 228, 204, 0.5);
  border-radius: 0;
  font-family: var(--tagfont);
  font-size: 1.2rem;
  padding: 0.8rem 1rem 0.6rem 1rem;
  margin: 0.1rem;
  width: fit-content;
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
    if (!nextImage) {
      setSelectedImage(filteredImages[0]);
    }
  };

  const previousImage = filteredImages[indexOfSelectedImage - 1];
  const loadPreviousImage = () => {
    setSelectedImage(previousImage);
    if (!previousImage) {
      setSelectedImage(filteredImages[filteredImages.length - 1]);
    }
  };

  return (
    <>
      {allImages && (
        <GalleryPageContainer>
          <div></div>
          <ImageContainer>
            <PreviousImageButton
              type="submit"
              onClick={loadPreviousImage}
              disabled={!filteredImages[1]}
            >
              ◀
            </PreviousImageButton>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error}</p>}
            {selectedImage && <Image src={selectedImage.url} alt="" />}
            <NextImageButton
              type="submit"
              onClick={loadNextImage}
              disabled={!filteredImages[1]}
            >
              ▶
            </NextImageButton>
          </ImageContainer>
          <TagDisplay>
            {selectedImage &&
              selectedImage.tags.map((tag) => (
                <TagButton
                  key={tag}
                  onClick={() => {
                    if (!selectedTag || selectedTag !== tag) {
                      setSelectedTag(tag);
                    } else {
                      setSelectedTag("");
                    }
                  }}
                  style={{
                    background:
                      selectedTag === tag
                        ? "linear-gradient(160deg, var(--active), var(--active-gradient))"
                        : "transparent",
                  }}
                >
                  {tag}
                </TagButton>
              ))}
          </TagDisplay>
        </GalleryPageContainer>
      )}
    </>
  );
};

export default GalleryPage;

GalleryPage.propTypes = {
  selectedImage: PropTypes.any,
  setSelectedImage: PropTypes.any,
};

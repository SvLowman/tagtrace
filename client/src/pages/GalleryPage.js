import React, { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Button } from "../components/Button";
import { ImageDisplay } from "../components/Display";
import { ImageContainer } from "../components/Display";
import { getImageObj } from "../utils/api";
import { useQuery } from "react-query";

const TagDisplay = styled.div`
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
      {" "}
      {allImages && (
        <div>
          <section>
            <h2>Das hier ist die Album-Seite 🤩</h2>
          </section>
          <ImageDisplay>
            <ImageContainer>
              <Button
                label="◀"
                type="submit"
                onClick={loadPreviousImage}
                disabled={!previousImage}
              />
              {isLoading && <p>Loading...</p>}
              {isError && <p>{error}</p>}
              {selectedImage && <img src={selectedImage.url} alt="" />}
              <Button
                label="▶"
                type="submit"
                onClick={loadNextImage}
                disabled={!nextImage}
              />
            </ImageContainer>
          </ImageDisplay>
          <TagDisplay>
            <p>Tag-Display</p>
            {selectedImage &&
              selectedImage.tags.map((tag) => (
                <Button
                  key={tag}
                  label={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                  }}
                />
              ))}
          </TagDisplay>
        </div>
      )}{" "}
    </>
  );
};

export default GalleryPage;

GalleryPage.propTypes = {
  selectedImage: PropTypes.any,
  setSelectedImage: PropTypes.any,
};

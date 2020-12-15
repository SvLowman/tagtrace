import React, { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { useEffect } from "react";
// import { getImageObj } from "../utils/api";
// import useAsync from "../utils/useAsync";
import { Button } from "../components/Button";
import { ImageDisplay } from "../components/Display";
import { ImageContainer } from "../components/Display";

const TagDisplay = styled.div`
  border: solid 1px lightgray;
`;

const GalleryPage = ({
  selectedImage,
  setSelectedImage,
  allImages,
  setAllImages,
}) => {
  // const userName = "sven";
  // const { data: userData, loading, error, doFetch } = useAsync(() =>
  //   getImageObj(userName)
  // );

  // useEffect(() => {
  //   doFetch();
  // }, []);

  // const [currentImage, setCurrentImage] = useState(null);
  // useEffect(() => {
  //   if (userData) {
  //     setCurrentImage(userData.images[0]);
  //   }
  // }, [userData]);

  const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(null);
  useEffect(() => {
    if (selectedImage) {
      setIndexOfSelectedImage(allImages.indexOf(selectedImage));
    }
  }, [selectedImage, allImages]);

  const nextImage = () => {
    const indexOfSelectedImage = allImages.indexOf(selectedImage);
    setSelectedImage(allImages[indexOfSelectedImage + 1]);
  };

  const previousImage = () => {
    const indexOfSelectedImage = allImages.indexOf(selectedImage);
    setSelectedImage(allImages[indexOfSelectedImage - 1]);
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
                onClick={previousImage}
                disabled={indexOfSelectedImage === 0}
              />
              {/* {loading && <p>Loading...</p>}
              {error && <p>{error.message}</p>} */}
              {selectedImage && <img src={selectedImage.url} alt="" />}
              <Button
                label="▶"
                type="submit"
                onClick={nextImage}
                disabled={indexOfSelectedImage === allImages.length - 1}
              />
            </ImageContainer>
          </ImageDisplay>
          <TagDisplay>
            <p>Tag-Display</p>
            {selectedImage &&
              selectedImage.tags.map((tag, index) => (
                <Button key={index} label={tag} />
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
  allImages: PropTypes.array,
  setAllImages: PropTypes.array,
};

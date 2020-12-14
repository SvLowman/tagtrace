import React, { useState } from "react";
import styled from "styled-components/macro";
import { useEffect } from "react";
import { getImageObj } from "../utils/api";
import useAsync from "../utils/useAsync";
import { Button } from "../components/Button";
import { ImageDisplay } from "../components/Display";
import { ImageContainer } from "../components/Display";

const TagDisplay = styled.div`
  border: solid 1px lightgray;
`;

const GalleryPage = () => {
  const userName = "sven";
  const { data: userData, loading, error, doFetch } = useAsync(() =>
    getImageObj(userName)
  );

  useEffect(() => {
    doFetch();
  }, []);

  const [currentImage, setCurrentImage] = useState(null);
  useEffect(() => {
    if (userData) {
      setCurrentImage(userData.images[0]);
    }
  }, [userData]);

  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState(null);
  useEffect(() => {
    if (currentImage) {
      setIndexOfCurrentImage(userData.images.indexOf(currentImage));
    }
  }, [currentImage]);

  const nextImage = () => {
    const indexOfCurrentImage = userData.images.indexOf(currentImage);
    setCurrentImage(userData.images[indexOfCurrentImage + 1]);
  };

  const previousImage = () => {
    const indexOfCurrentImage = userData.images.indexOf(currentImage);
    setCurrentImage(userData.images[indexOfCurrentImage - 1]);
  };

  return (
    <>
      {" "}
      {userData && (
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
                disabled={indexOfCurrentImage === 0}
              />
              {loading && <p>Loading...</p>}
              {error && <p>{error.message}</p>}
              {currentImage && <img src={currentImage.url} alt="" />}
              <Button
                label="▶"
                type="submit"
                onClick={nextImage}
                disabled={indexOfCurrentImage === userData.images.length - 1}
              />
            </ImageContainer>
          </ImageDisplay>
          <TagDisplay>
            <p>Tag-Display</p>
            {currentImage &&
              currentImage.tags.map((tag, index) => (
                <Button key={index} label={tag} />
              ))}
          </TagDisplay>
        </div>
      )}{" "}
    </>
  );
};

export default GalleryPage;

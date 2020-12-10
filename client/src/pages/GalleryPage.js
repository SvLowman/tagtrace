import React, { useState } from "react";
import styled from "styled-components/macro";
import { useEffect } from "react";
import { getImageObj } from "../utils/api";
import useAsync from "../utils/useAsync";
import { Button } from "../components/Button";

const ImageDisplay = styled.div`
  border: solid 1px lightgray;
  display: flex;
  justify-content: center;
`;
const Display = styled.div`
  border: solid 1px lightgray;
  display: flex;
  justify-content: center;
`;
const ImageContainer = styled.div`
  height: 800px;
  width: 800px;
  border: solid 1px lightgray;
`;
const Thumbnail = styled.img`
  width: 10vw;
  margin: 0 0.5rem;
`;
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
  console.log(currentImage);

  return (
    <>
      <div>
        <section>
          <h2>Das hier ist die Album-Seite 🤩</h2>
        </section>
        <ImageDisplay>
          <ImageContainer>
            <Button label="◀" type="submit" />
            {currentImage && <img src={currentImage.url} alt="" />}
            <Button label="▶" type="submit" />
          </ImageContainer>
        </ImageDisplay>
        <Display>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {userData &&
            userData.images.map((image) => (
              <Thumbnail key={image.url} src={image.url} alt="alt" />
            ))}
        </Display>
        <TagDisplay>
          <p>Tag-Display</p>
          {currentImage &&
            currentImage.tags.map((tag, index) => (
              <Button key={index} label={tag} />
            ))}
        </TagDisplay>
      </div>
    </>
  );
};

export default GalleryPage;

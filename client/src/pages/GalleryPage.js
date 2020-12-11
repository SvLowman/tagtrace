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
// const Display = styled.div`
//   border: solid 1px lightgray;
//   display: flex;
//   justify-content: center;
// `;
const ImageContainer = styled.div`
  height: 800px;
  width: 800px;
  border: solid 1px lightgray;
`;
// const Thumbnail = styled.img`
//   width: 10vw;
//   margin: 0 0.5rem;
// `;
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
  console.log("currentImage:", currentImage);

  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState(null);
  useEffect(() => {
    if (currentImage) {
      setIndexOfCurrentImage(userData.images.indexOf(currentImage));
    }
  }, [currentImage]);
  console.log("indexOfCurrentImage:", indexOfCurrentImage);
  // console.log(userData.images.length);

  // if (userData && currentImage) {
  //   console.log(userData.images.indexOf(currentImage));
  //   const indexOfCurrentImage = userData.images.indexOf(currentImage);
  //   console.log(indexOfCurrentImage + 1);
  // }

  // console.log(indexOfCurrentImage);

  // const testArray = ["a", "b", "c"];
  // console.log(testArray.indexOf("b"));

  const nextPlease = () => {
    const indexOfCurrentImage = userData.images.indexOf(currentImage);
    setCurrentImage(userData.images[indexOfCurrentImage + 1]);
  };

  const previousPlease = () => {
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
                onClick={previousPlease}
                disabled={indexOfCurrentImage === 0}
              />
              {loading && <p>Loading...</p>}
              {error && <p>{error.message}</p>}
              {currentImage && <img src={currentImage.url} alt="" />}
              <Button
                label="▶"
                type="submit"
                onClick={nextPlease}
                disabled={indexOfCurrentImage === userData.images.length - 1}
              />
            </ImageContainer>
          </ImageDisplay>
          {/* <Display>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {userData &&
            userData.images.map((image) => (
              <Thumbnail key={image.url} src={image.url} alt="alt" />
            ))}
        </Display> */}
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

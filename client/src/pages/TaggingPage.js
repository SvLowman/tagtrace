import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { Button } from "../components/Button";
import { addNewTag } from "../utils/api";
import { getImageObj } from "../utils/api";
import { ImageDisplay } from "../components/Display";
import { ImageContainer } from "../components/Display";
import { useQuery } from "react-query";

const ImageSlide = styled.div`
  border: solid 1px lightgray;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;
const Thumbnail = styled.img`
  width: 10vw;
  margin: 0 0.5rem;
`;
const TagForm = styled.form`
  border: solid 1px lightgray;
`;
const TagNotifier = styled.div`
  border: solid 1px lightgray;
`;

const TaggingPage = ({
  selectedImage,
  setSelectedImage,
  allImages,
  setAllImages,
}) => {
  const userName = "sven";

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("allImages", () => getImageObj(userName));

  // const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (userData) {
      setAllImages(userData.images);
    }
  }, [userData, setAllImages]);

  const [tagName, setTagName] = useState("");

  // const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (userData) {
      setSelectedImage(allImages[allImages.length - 1]);
    }
  }, [userData, allImages, setSelectedImage]);

  const [imgNr, setImgNr] = useState("");
  useEffect(() => {
    if (selectedImage) {
      setImgNr(selectedImage.imgNr);
    }
  }, [selectedImage]);

  const [tagArray, setTagArray] = useState([]);
  useEffect(() => {
    if (selectedImage) {
      setTagArray(selectedImage.tags);
    }
  }, [selectedImage]);

  useEffect(() => {
    refetch();
  }, [tagArray, refetch]);

  const handleTagNameChange = (event) => {
    setTagName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTagArray([...tagArray, tagName]);
    addNewTag(userName, imgNr, tagName);
    setTagName("");
  };

  return (
    <>
      <div>
        <section>
          <h2>Das hier ist die Tagging-Seite 🤔</h2>
        </section>
        <ImageDisplay>
          <ImageContainer>
            {selectedImage && <img src={selectedImage.url} alt="" />}
          </ImageContainer>
        </ImageDisplay>
        <ImageSlide>
          {isLoading && <p>Loading...</p>}
          {isError && <p>{error}</p>}
          {userData &&
            allImages.map((image) => (
              <Thumbnail
                style={{
                  border: selectedImage === image ? "2px solid red" : "",
                }}
                key={image.imgNr}
                src={image.url}
                alt="alt"
                onClick={() => setSelectedImage(image)}
              />
            ))}
        </ImageSlide>
        <TagForm onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tag setzen"
            value={tagName}
            onChange={handleTagNameChange}
          ></input>
          <Button label="Darf ich button?" type="submit" />
        </TagForm>
        <TagNotifier>
          {selectedImage && <p>Diese Tags hat das Bild schon:</p>}
          {selectedImage &&
            tagArray.map((tag, index) => <p key={index}>{tag}</p>)}
        </TagNotifier>
      </div>
    </>
  );
};

export default TaggingPage;

TaggingPage.propTypes = {
  selectedImage: PropTypes.any,
  setSelectedImage: PropTypes.any,
  allImages: PropTypes.any,
  setAllImages: PropTypes.any,
};

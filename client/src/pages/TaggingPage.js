import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { Button } from "../components/Button";
import {
  getImageObj,
  addNewTag,
  deleteImageObj,
  deleteTagItem,
} from "../utils/api";
import { ImageDisplay, ImageContainer } from "../components/Display";
import { useQuery } from "react-query";

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

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

const TaggingPage = ({ selectedImage, setSelectedImage }) => {
  const userName = "sven";

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("allImages", () => getImageObj(userName));

  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (userData) {
      setAllImages(userData.images);
    }
  }, [userData, setAllImages]);

  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (userData) {
      setSelectedImage(allImages[allImages.length - 1]);
    }
  }, [userData, allImages, setSelectedImage]);

  const [imgNr, setImgNr] = useState("");
  const [tagArray, setTagArray] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      setImgNr(selectedImage.imgNr);
      setTagArray(selectedImage.tags);
    }
  }, [selectedImage]);

  useEffect(() => {
    refetch();
  }, [tagArray, allImages, refetch]);

  const handleImageDelete = async () => {
    await deleteImageObj(userName, imgNr);
    setAllImages([...allImages]);
  };

  const handleTagDelete = async (tag) => {
    await deleteTagItem(userName, imgNr, tag);
    setTagArray([...tagArray]);
  };

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
            {selectedImage && <Image src={selectedImage.url} alt="" />}
            <Button label="❌" onClick={handleImageDelete}></Button>
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
            required="required"
            value={tagName}
            onChange={handleTagNameChange}
          ></input>
          <Button label="Darf ich button?" type="submit" />
        </TagForm>
        <TagNotifier>
          {selectedImage && <p>Diese Tags hat das Bild schon:</p>}
          {selectedImage &&
            tagArray.map((tag, index) => (
              <div key={index}>
                {tag}
                <Button label="❌" onClick={() => handleTagDelete(tag)} />
              </div>
            ))}
        </TagNotifier>
      </div>
    </>
  );
};

export default TaggingPage;

TaggingPage.propTypes = {
  selectedImage: PropTypes.any,
  setSelectedImage: PropTypes.any,
};

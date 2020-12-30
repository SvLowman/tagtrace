import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
// import { Button } from "../components/Button";
import {
  getImageObj,
  addNewTag,
  deleteImageObj,
  deleteTagItem,
} from "../utils/api";
import { ImageContainer } from "../components/Display";
import { useQuery } from "react-query";

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  position: relative;
`;
const ImageDeleteButton = styled.button`
  border: solid 1px lightgray;
  position: absolute;
  align-self: flex-start;
  right: 0;
`;

const ImageSlide = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 0.5rem;
  padding: 1rem;
`;
const ThumbnailContainer = styled.div`
  background: var(--image-container);
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Thumbnail = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const TagSubmitButton = styled.button`
  border: solid 1px lightgray;
`;
const TagForm = styled.form``;

const TagNotifier = styled.div``;
const TagElement = styled.div`
  border: solid 1px teal;
  display: flex;
  width: fit-content;
  margin: 0 auto;
`;
const TagCard = styled.div`
  border: solid 1px red;
  font-family: var(--tagfont);
  font-size: 1.2rem;
  width: fit-content;
  display: flex;
  align-items: center;
`;
const TagDeleteButton = styled.button`
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
    if (userData && selectedImage === null) {
      setSelectedImage(allImages[allImages.length - 1]);
    }
  }, [userData, allImages, selectedImage, setSelectedImage]);

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
        <ImageSlide>
          {isLoading && <p>Loading...</p>}
          {isError && <p>{error}</p>}
          {userData &&
            allImages
              .slice(0)
              .reverse()
              .map((image) => (
                <ThumbnailContainer key={image.imgNr}>
                  <Thumbnail
                    style={{
                      border:
                        selectedImage === image
                          ? "2px solid var(--active)"
                          : "",
                    }}
                    key={image.imgNr}
                    src={image.url}
                    alt="alt"
                    onClick={() => setSelectedImage(image)}
                  />
                </ThumbnailContainer>
              ))}
        </ImageSlide>
        <ImageContainer>
          {selectedImage && <Image src={selectedImage.url} alt="" />}
          <ImageDeleteButton label="❌" onClick={handleImageDelete}>
            ❌
          </ImageDeleteButton>
        </ImageContainer>
        <TagForm onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tag setzen"
            required="required"
            value={tagName}
            onChange={handleTagNameChange}
          ></input>
          <TagSubmitButton label="Darf ich button?" type="submit">
            Darf ich button?
          </TagSubmitButton>
        </TagForm>
        <TagNotifier>
          {selectedImage && <p>Diese Tags hat das Bild schon:</p>}
          {selectedImage &&
            tagArray.map((tag, index) => (
              <TagElement key={index}>
                <TagCard>{tag}</TagCard>
                <TagDeleteButton
                  label="❌"
                  onClick={() => handleTagDelete(tag)}
                >
                  ❌
                </TagDeleteButton>
              </TagElement>
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

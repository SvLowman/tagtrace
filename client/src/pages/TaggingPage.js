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
  border-radius: 50%;
  padding: 0.5rem;
  margin: 2% 2% 0 0;
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

const TagForm = styled.form`
  padding: 2rem 0;
`;
const TagInput = styled.input`
  background: var(--light);
  color: var(--header);
  width: 55%;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-top: solid 1px var(--light);
  border-bottom: none;
  padding: 0.5rem 0.8rem;
  font-family: var(--tagfont);
  font-size: 1.1rem;
`;
const TagSubmitButton = styled.button`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  background: linear-gradient(160deg, var(--active), var(--active-gradient));
`;

const TagNotifier = styled.div`
  margin-bottom: 5rem;
`;
const TagElementContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const TagElement = styled.div`
  display: flex;
  width: fit-content;
  margin: 0.5rem;
`;
const TagCard = styled.div`
  border: solid 1px rgba(220, 228, 204, 0.3);
  border-bottom-left-radius: 1.3rem;
  border-top-left-radius: 1.3rem;
  border-right: none;
  font-family: var(--tagfont);
  font-size: 1rem;
  padding: 0.5rem 0.7rem 0.5rem 0.8rem;
  width: fit-content;
  display: flex;
  align-items: center;
`;
const TagDeleteButton = styled.button`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 1.3rem;
  border-top-right-radius: 1.3rem;
  border: solid 1px rgba(220, 228, 204, 0.3);
  border-left: none;
  background: var(--header);
  padding: 0.5rem 0.7rem 0.5rem 0.5rem;
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
          <TagInput
            type="text"
            placeholder="Tag setzen"
            required="required"
            value={tagName}
            onChange={handleTagNameChange}
          ></TagInput>
          <TagSubmitButton label="Darf ich button?" type="submit">
            Darf ich button?
          </TagSubmitButton>
        </TagForm>
        <TagNotifier>
          {selectedImage && <p>Diese Tags hat das Bild schon:</p>}
          <TagElementContainer>
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
          </TagElementContainer>
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

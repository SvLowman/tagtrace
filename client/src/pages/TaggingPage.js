import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { addNewTag, deleteImageObj, deleteTagItem } from "../utils/api";
import { ImageContainer } from "../components/Display";

const TaggingPageContainer = styled.div`
  @media (min-width: 1000px) and (orientation: landscape) {
    height: calc(100vh - 6.3rem);
    display: grid;
  }
  @media (min-width: 1000px) and (orientation: landscape) {
    grid-template-columns: 6rem calc(100vh - 6.3rem) auto;
  }
  @media (min-width: 1180px) and (orientation: landscape) {
    grid-template-columns: 11rem calc(100vh - 6.3rem) auto;
  }
  @media (min-width: 1260px) and (orientation: landscape) {
    grid-template-columns: 15rem calc(100vh - 6.3rem) auto;
  }
  @media (min-width: 1340px) and (orientation: landscape) {
    grid-template-columns: 20rem calc(100vh - 6.3rem) auto;
  }
  @media (min-width: 1420px) and (orientation: landscape) {
    grid-template-columns: 24rem calc(100vh - 6.3rem) auto;
  }
  @media (min-width: 1500px) and (orientation: landscape) {
    grid-template-columns: 29rem calc(100vh - 6.3rem) auto;
  }
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  position: relative;
  @media (min-width: 1000px) and (orientation: landscape) {
    position: absolute;
    z-index: 1;
  }
`;
const ImageDeleteButton = styled.button`
  border-radius: 50%;
  border: solid 1px rgba(220, 228, 204, 0.3);
  padding: 0.5rem;
  margin: 2% 2% 0 0;
  position: absolute;
  align-self: flex-start;
  right: 0;
  @media (min-width: 1000px) and (orientation: landscape) {
    z-index: 2;
    justify-self: flex-start;
  }
`;

const ImageSlide = styled.div`
  padding: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  @media (min-width: 1000px) and (orientation: landscape) {
    padding: 1rem;
    height: 100;
    flex-flow: row wrap;
    align-content: flex-start;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0 !important;
      background-color: transparent;
    }
  }
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
  cursor: pointer;
`;

const TaggingFormContainer = styled.div``;
const TagForm = styled.form`
  padding: 3.2rem 0 2rem;
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

const TaggingPage = ({
  selectedImage,
  setSelectedImage,
  userData,
  isLoading,
  error,
  isError,
  refetch,
}) => {
  TaggingPage.propTypes = {
    selectedImage: PropTypes.any,
    setSelectedImage: PropTypes.any,
    userData: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.string,
    refetch: PropTypes.func,
  };

  const userName = "sven";

  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (userData) {
      setAllImages(userData.images);
    }
  }, [userData, setAllImages]);

  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (userData && !selectedImage) {
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
    setSelectedImage(allImages[allImages.indexOf(selectedImage) + 1]);
    setAllImages([...allImages]);
  };

  const handleTagDelete = async (tag) => {
    await deleteTagItem(userName, imgNr, tag);
    setTagArray(tagArray.filter((singleTag) => singleTag !== tag));
  };

  const handleTagNameChange = (event) => {
    setTagName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTagArray([...tagArray, tagName]);
    await addNewTag(userName, imgNr, tagName);
    // refetch();
    setTagName("");
  };

  return (
    <>
      <TaggingPageContainer>
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
                    alt=""
                    onClick={() => setSelectedImage(image)}
                  />
                </ThumbnailContainer>
              ))}
        </ImageSlide>
        <ImageContainer>
          {selectedImage && <Image src={selectedImage.url} alt="" />}
          <ImageDeleteButton onClick={handleImageDelete}>❌</ImageDeleteButton>
        </ImageContainer>
        <TaggingFormContainer>
          <TagForm onSubmit={handleSubmit}>
            <TagInput
              type="text"
              placeholder="Tag"
              required="required"
              value={tagName}
              onChange={handleTagNameChange}
            />
            <TagSubmitButton type="submit">Setzen</TagSubmitButton>
          </TagForm>
          <TagNotifier>
            {tagArray[0] && <p>Diese Tags hat das Bild schon:</p>}
            <TagElementContainer>
              {selectedImage &&
                tagArray.map((tag, index) => (
                  <TagElement key={index}>
                    <TagCard>{tag}</TagCard>
                    <TagDeleteButton onClick={() => handleTagDelete(tag)}>
                      ❌
                    </TagDeleteButton>
                  </TagElement>
                ))}
            </TagElementContainer>
          </TagNotifier>
        </TaggingFormContainer>
      </TaggingPageContainer>
    </>
  );
};

export default TaggingPage;

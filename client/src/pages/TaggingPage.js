import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components/macro";
import { Button } from "../components/Button";
import { addNewTag } from "../utils/api";
import { getImageObj } from "../utils/api";
import useAsync from "../utils/useAsync";

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

const TaggingPage = () => {
  const userName = "sven";
  // const imgNr = "3708dab5d7ffaf9e7193a15e98ad3cff";

  const { data: userData, loading, error, doFetch } = useAsync(() =>
    getImageObj(userName)
  );
  useEffect(() => {
    doFetch();
  }, []);

  if (userData) {
    // console.log(userData.images[userData.images.length - 1].url);
    // const selectedImage = userData.images[userData.images.length - 1];
    // console.log(selectedImage.url);
    // console.log(selectedImage.tags);
  }
  const [tagName, setTagName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (userData) {
      setSelectedImage(userData.images[userData.images.length - 1]);
    }
  }, [userData]);
  console.log(selectedImage);
  const [imgNr, setImgNr] = useState("");
  useEffect(() => {
    if (selectedImage) {
      setImgNr(selectedImage.imgNr);
    }
  }, [selectedImage]);
  console.log(imgNr);

  const handleTagNameChange = (event) => {
    setTagName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!tagName) {
      console.log("No tag name");
    } else {
      console.log("The fabulous tagName is:", tagName);
    }
    addNewTag(userName, imgNr, tagName);
  };

  return (
    <>
      <div>
        <section>
          <h2>Das hier ist die Tagging-Seite 🤔</h2>
        </section>
        <Display>
          <ImageContainer>
            {/* <img
              src="https://res.cloudinary.com/tagtrace/image/upload/v1607532604/TagTrace/sfa2ekyqkrpfzex3lmv5.jpg"
              alt=""
            /> */}
            {/* <img src={userData.images[userData.images.length - 1].url} alt="" /> */}
            {selectedImage && <img src={selectedImage.url} alt="" />}
          </ImageContainer>
        </Display>
        <ImageSlide>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {/* {userData && userData.images.reverse()} */}
          {userData &&
            userData.images.map((image) => (
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
            selectedImage.tags.map((tag) => <p key={tag.index}>{tag}</p>)}
          {/* {selectedImage.tags === [] && <p>Noch keine Tags vergeben</p>} */}
        </TagNotifier>
      </div>
    </>
  );
};

export default TaggingPage;

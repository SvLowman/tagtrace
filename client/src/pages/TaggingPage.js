import React, { useState } from "react";
import { Button } from "../components/Button";
import styled from "styled-components/macro";
import { addNewTag } from "../utils/api";

const Display = styled.div`
  border: solid 1px lightgray;
`;
const TagForm = styled.form`
  border: solid 1px lightgray;
`;

const TaggingPage = () => {
  const url =
    "https://res.cloudinary.com/tagtrace/image/upload/v1606822076/TagTrace/wmcwfmhypvc06pnjtcpg.jpg";
  const imgNr = "001";
  const userName = "sven";
  const [tagName, setTagName] = useState("");

  const handleTagNameChange = (event) => {
    const tagName = event.target.value;
    console.log("tagName:", tagName);
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
          <p>Hier soll ein ausgewähltes Bild stehen</p>
          <img src={url} alt="testImage" />
        </Display>
        <TagForm onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tag setzen"
            value={tagName}
            onChange={handleTagNameChange}
          ></input>
          <Button label="Darf ich button?" type="submit" />
        </TagForm>
      </div>
    </>
  );
};

export default TaggingPage;

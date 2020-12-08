import React from "react";
// import { Button } from "../components/Button";
import styled from "styled-components/macro";

const Display = styled.div`
  border: solid 1px lightgray;
`;
// const TagForm = styled.form`
//   border: solid 1px lightgray;
// `;

const TaggingPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Tagging-Seite 🤔</h2>
    </section>
    <Display>
      <p>Hier soll ein ausgewähltes Bild stehen</p>
      <img
        src="https://res.cloudinary.com/tagtrace/image/upload/v1606822076/TagTrace/wmcwfmhypvc06pnjtcpg.jpg"
        alt="testImage"
      />
    </Display>
    {/* <TagForm onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tag setzen"
        value={tagName}
        onChange={handleInputChange}
      ></input>
      <Button
        label="Darf ich button?"
        type="submit"
        onClick={() => {
          alert("Der Button funktioniert.");
        }}
      />
    </TagForm> */}
  </div>
);

export default TaggingPage;

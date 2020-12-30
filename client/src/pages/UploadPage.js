import React from "react";
import styled from "styled-components/macro";
import UploadImage from "../utils/UploadImage";

const UploadPageContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UploadPage = () => (
  <UploadPageContainer>
    <section>
      <h2>Das hier ist die Upload-Seite 🤗</h2>
    </section>
    <div>
      <UploadImage />
    </div>
  </UploadPageContainer>
);

export default UploadPage;

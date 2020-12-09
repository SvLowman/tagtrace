import React from "react";
import styled from "styled-components/macro";
import { useEffect } from "react";
import { getImageObj } from "../utils/api";
import useAsync from "../utils/useAsync";

const Display = styled.div`
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

  return (
    <>
      <div>
        <section>
          <h2>Das hier ist die Album-Seite 🤩</h2>
        </section>
        <Display>
          <p>Display für Cloudinary-Links von MongoDB</p>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {userData &&
            userData.images.map((image) => (
              <img key={image.url} src={image.url} alt="alt" />
            ))}
        </Display>
      </div>
    </>
  );
};

export default GalleryPage;

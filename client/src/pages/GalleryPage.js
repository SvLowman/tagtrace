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
  //const tag = "2";
  const { data, loading, error, doFetch } = useAsync(() =>
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
          <img src="" alt="testImage" />
          <p>Display für Cloudinary-Links von MongoDB</p>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {data &&
            data.map((image) => (
              <img key={image._id} src={image.url} alt={image.title} />
            ))}
          {data && console.log(data)}
        </Display>
      </div>
    </>
  );
};

export default GalleryPage;

import React, { useState } from "react";
// import { Button } from "../components/Button";
import styled from "styled-components/macro";
import UploadPreview from "../components/UploadPreview";
import { useHistory } from "react-router-dom";

const UploadButton = styled.button`
  border: solid 1px var(--light);
  background: linear-gradient(160deg, var(--active), var(--active-gradient));
`;

export default function UploadImage() {
  const [uploadInput, setUploadInput] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const history = useHistory();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    previewFile(file);
    setUploadInput(event.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      console.log(reader.result);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!previewSrc) {
      console.log("No preview file");
    }
    await uploadImage(previewSrc);
    history.push("/tagging");
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: base64EncodedImage, userName: "sven" }),
        headers: { "Content-Type": "application/json" },
      });
      setUploadInput("");
      setPreviewSrc("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" value={uploadInput} onChange={handleImageChange} />
      {previewSrc && <UploadPreview src={previewSrc} alt="" />}
      <div>
        {previewSrc && (
          <UploadButton type="submit" label="Bild hochladen">
            Bild hochladen
          </UploadButton>
        )}
      </div>
    </form>
  );
}

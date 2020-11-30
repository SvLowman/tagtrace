import React from "react";
import { Button } from "../components/Button";
import UploadPreview from "../components/UploadPreview";

const UploadPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Upload-Seite 🤗</h2>
    </section>
    <div>
      <Button
        label="Bild auswählen"
        onClick={() => {
          alert("Der Button funktioniert.");
        }}
      />
    </div>
    <UploadPreview />
    <div>
      <Button
        label="Dieses Bild hochladen"
        onClick={() => {
          alert("Der Button funktioniert.");
        }}
      />
    </div>
  </div>
);

export default UploadPage;

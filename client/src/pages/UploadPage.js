import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const UploadPage = () => (
  <div>
    <section>
      <h2>Das hier ist die Upload-Seite 🤗</h2>
    </section>
    <div>
      <Link to="/album">
        <Button label="👁" />
      </Link>
      <Link to="/tagging">
        <Button label="🏷" />
      </Link>
    </div>
  </div>
);

export default UploadPage;

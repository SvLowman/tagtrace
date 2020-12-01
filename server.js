const { cloudinary } = require("./lib/cloudinary");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3047;

// For connection to Cloudinary
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

app.post("/api/upload", async (request, response) => {
  try {
    const fileStr = request.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "TagTrace",
    });
    response.status(201).json(uploadedResponse);
    console.log(uploadedResponse);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error 500");
  }
});

// Serve any static files
app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

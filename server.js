require("dotenv").config();

const { cloudinary } = require("./lib/cloudinary");
const express = require("express");
const path = require("path");

const { getImageDataOfUser } = require("./lib/data");
const { setImage } = require("./lib/data");
const { connect } = require("./lib/database");
const { request } = require("express");

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

// GET-Route from MongoDB
app.get("/api/users/:userName", async (request, response) => {
  const { userName } = request.params;
  try {
    const entryValue = await getImageDataOfUser(userName);
    if (!entryValue) {
      response.status(404).send("Not found");
      return;
    }
    response.status(200).send(entryValue);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error 500 occured");
  }
});

// POST-Route to MongoDB
app.post("/api/users/:userName", async (request, response) => {
  const imageObj = request.body;

  try {
    await setImage(imageObj);
    response.send(`Image ${imageObj.url} posted`);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error 500 occured.");
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

// Connection to mongoDB
async function run() {
  console.log("Connecting to database");
  await connect(process.env.DB_USER_PASSWORD, process.env.DB_NAME);
  console.log("Connected to database");
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

run();

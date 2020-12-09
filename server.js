require("dotenv").config();

const express = require("express");
const path = require("path");

const { getImageDataOfUser } = require("./lib/data");
const { setImage, setTag } = require("./lib/data");
const { connect } = require("./lib/database");

const app = express();
const port = process.env.PORT || 3047;

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

app.post("/api/upload", async (request, response) => {
  try {
    const { image, userName } = request.body;
    await setImage(image, userName);
    response.status(201).send("Upload successful");
  } catch (error) {
    console.error(error);
    response.status(500).send("Error 500");
  }
});

// GET-Routes from MongoDB
app.get("/api/users/:userName", async (request, response) => {
  const { userName } = request.params;
  try {
    const userEntry = await getImageDataOfUser(userName);
    if (!userEntry) {
      response.status(404).send("Not found");
      return;
    }
    response.status(200).send(userEntry);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error 500 occured");
  }
});

// POST-Routes to MongoDB
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

app.post(
  "/api/users/:userName/images/:imgNr/tags",
  async (request, response) => {
    const { tagName } = request.body;
    const { imgNr } = request.params;

    try {
      const updated = await setTag(tagName, imgNr);
      if (updated.modifiedCount == 0) {
        response.status(400).send(`No modifications.`);
      } else {
        response.status(200).send(`Modification applied.`);
      }
      console.log("Modified count:", updated.modifiedCount);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error 500 occured trying POST.");
    }
  }
);

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

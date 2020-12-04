const { collection } = require("./database");

async function getImageDataOfUser(userName) {
  const imgEntry = await collection("users").findOne({
    userName: userName,
  });
  if (!imgEntry) {
    return null;
  }
  console.log({ imgEntry });
  return imgEntry;
}

async function setImage(imageObj, userName) {
  const userData = await collection("users").findOne({
    name: userName,
  });
  const newImageArray = [...userData.images, imageObj];
  return await collection("users").updateOne(
    { name: userName },
    { $set: { images: newImageArray } }
  );
}

exports.setImage = setImage;
exports.getImageDataOfUser = getImageDataOfUser;

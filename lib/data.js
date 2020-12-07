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

// async function getImagesByTag(userName, tagName) {
//   const imagesByTag = await collection("users").find({
//     userName: userName,
//     tag: tagName,
//   });
//   if (!imagesByTag) {
//     return null;
//   }
//   console.log({ imagesByTag });
//   return imagesByTag;
// }

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

async function setTag(tagName, url) {
  return await collection("users").updateOne(
    { "images.url": url },
    { $push: { "images.$.tags": tagName } }
  );
}

exports.setImage = setImage;
exports.setTag = setTag;
exports.getImageDataOfUser = getImageDataOfUser;
// exports.getImagesByTag = getImagesByTag;

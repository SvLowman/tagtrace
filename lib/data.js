const { cloudinary } = require("./cloudinary");
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

async function setImage(image, userName) {
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    upload_preset: "Tagtrace",
  });
  const imageObj = {
    url: uploadedResponse.secure_url,
    imgNr: uploadedResponse.asset_id,
    timeStamp: uploadedResponse.created_at,
    width: uploadedResponse.width,
    height: uploadedResponse.height,
    tags: uploadedResponse.tags,
  };
  return await collection("users").updateOne(
    { userName: userName },
    { $push: { images: imageObj } }
  );
}

// async function setImage(imageObj, userName) {
//   const userData = await collection("users").findOne({
//     name: userName,
//   });
//   const newImageArray = [...userData.images, imageObj];
//   return await collection("users").updateOne(
//     { name: userName },
//     { $set: { images: newImageArray } }
//   );
// }

async function setTag(tagName, imgNr) {
  return await collection("users").updateOne(
    { "images.imgNr": imgNr },
    { $push: { "images.$.tags": tagName } }
  );
}

exports.setImage = setImage;
exports.setTag = setTag;
exports.getImageDataOfUser = getImageDataOfUser;
// exports.getImagesByTag = getImagesByTag;

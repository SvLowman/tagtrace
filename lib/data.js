const { collection } = require("./database");

async function getImageDataByTag(userName) {
  const imgEntry = await collection("users")
    .find({
      userName: userName,
    })
    .toArray();
  if (!imgEntry) {
    return null;
  }
  console.log({ imgEntry });
  return imgEntry;
}

exports.getImageDataByTag = getImageDataByTag;

// async function getByID({ collectionName, id }) {
//   const cursor = collection(collectionName).findOne({
//     _id: ObjectId(id),
//   });
//   return await cursor;
// }

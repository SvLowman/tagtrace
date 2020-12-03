const { collection } = require("./database");

async function getData(dataTag) {
  const imgEntry = await collection("sven")
    .find({
      tags: dataTag,
    })
    .toArray();
  if (!imgEntry) {
    return null;
  }
  return imgEntry;
}

exports.getData = getData;

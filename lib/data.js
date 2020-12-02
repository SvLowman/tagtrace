const { collection } = require("./database");

async function getData(dataTag) {
  const imgEntry = await collection("sven").findOne({
    tags: dataTag,
  });
  if (!imgEntry) {
    return null;
  }
  return imgEntry;
}

exports.getData = getData;

const { collection } = require("./database");

async function getData(dataTitle) {
  const imgEntry = await collection("sven").findOne({
    title: dataTitle,
  });
  if (!imgEntry) {
    return null;
  }
  const dataUrl = imgEntry.url;
  return dataUrl;
}

exports.getData = getData;

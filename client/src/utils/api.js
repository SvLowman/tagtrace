export const getImageObj = async (userName) => {
  const response = await fetch(`/api/users/${userName}`);
  const imgEntry = await response.json();
  console.log(imgEntry);
  return imgEntry;
};

const imageObj = {
  url: "www.blubb.de",
  tags: [],
};

export async function postImageObj(userName) {
  const response = await fetch(`/api/users/${userName}`, {
    method: "POST",
    body: JSON.stringify(imageObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newImage = await response.json();
  return newImage;
}

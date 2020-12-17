export const getImageObj = async (userName) => {
  const response = await fetch(`/api/users/${userName}`);
  const imgEntry = await response.json();
  return imgEntry;
};

export async function postImageObj(userName, image) {
  const response = await fetch(`/api/users/${userName}`, {
    method: "POST",
    body: JSON.stringify(image),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newImage = await response.json();
  return newImage;
}

export async function addNewTag(userName, imgNr, tagName) {
  await fetch(`/api/users/${userName}/images/${imgNr}/tags`, {
    method: "POST",
    body: JSON.stringify({ tagName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return;
}

export async function deleteImageObj(userName, imgNr) {
  const response = await fetch(`/api/users/${userName}/images/${imgNr}`, {
    method: "DELETE",
  });
  const answer = await response.text();
  console.log(answer);
  return answer;
}

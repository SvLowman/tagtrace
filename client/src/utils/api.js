// For allImages

export const getImageObj = async (userName) => {
  const response = await fetch(`/api/users/${userName}`);
  const imgEntry = await response.json();
  return imgEntry;
};

// For Tagging

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
  return answer;
}

export async function deleteTagItem(userName, imgNr, tagName) {
  const response = await fetch(
    `/api/users/${userName}/images/${imgNr}/tags/${tagName}`,
    {
      method: "DELETE",
    }
  );
  const answer = await response.text();
  return answer;
}

// For Login

export const getLoginData = async (userName) => {
  console.log("Reached api:", userName);
  const response = await fetch(`/api/users/${userName}`);
  const loginData = await response.json();
  const passwordFromDatabase = loginData.password;
  console.log("passwordFromDatabase:", passwordFromDatabase);
  return passwordFromDatabase;
};

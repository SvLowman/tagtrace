export const getImageObj = async (userName) => {
  const response = await fetch(`/api/users/${userName}`);
  const imgEntry = await response.json();
  return imgEntry;
};

export const getData = async (dataTag) => {
  const response = await fetch(`/api/sven/${dataTag}`);
  const imgEntry = await response.json();
  return imgEntry;
};

export const getImageUnique = (url: string, folder: string | undefined): string => {
  const uniqueRegex = new RegExp(`${folder}/[a-zA-Z0-9]*`);

  return url.match(uniqueRegex)![0];
};

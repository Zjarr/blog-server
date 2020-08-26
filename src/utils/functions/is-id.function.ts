export const isId = (id: string): boolean => {
  const idRegExp = /^[0-9a-fA-F]{24}$/;

  if (!idRegExp.test(id)) {
    return false;
  }

  return true;
};

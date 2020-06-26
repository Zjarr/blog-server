export const CategoriesPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'CategoriesSuccess';
  }
};

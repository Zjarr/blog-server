export const ImagesAmountPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'ImagesAmountSuccess';
  }
};

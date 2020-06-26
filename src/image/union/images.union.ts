export const ImagesPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'ImagesSuccess';
  }
};

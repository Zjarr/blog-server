export const ImagePayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'ImageSuccess';
  }
};

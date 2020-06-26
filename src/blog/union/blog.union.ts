export const BlogPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'BlogSuccess';
  }
};

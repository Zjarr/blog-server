export const BlogsPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'BlogsSuccess';
  }
};

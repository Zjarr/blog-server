export const BlogsAmountPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'BlogsAmountSuccess';
  }
};

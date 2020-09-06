export const BlogsWeekPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'BlogsWeekSuccess';
  }
};

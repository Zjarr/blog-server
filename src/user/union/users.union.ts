export const UsersPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'UsersSuccess';
  }
};

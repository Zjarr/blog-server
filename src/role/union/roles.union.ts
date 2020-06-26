export const RolesPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'RolesSuccess';
  }
};

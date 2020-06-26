export const LoginPayload = {
  __resolveType(obj: { error: object }): string {
    if (obj.error) {
      return 'Error';
    }

    return 'LoginSuccess';
  }
};

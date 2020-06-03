import bcrypt from 'bcrypt';

export const encrypt = (data: string): string  => {
  const ROUNDS = 12;

  return bcrypt.hashSync(data, ROUNDS);
};

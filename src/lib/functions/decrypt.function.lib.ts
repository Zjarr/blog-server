import bcrypt from 'bcrypt';

export const decrypt = (data: string, encrypted: string): boolean  => {
  return bcrypt.compareSync(data, encrypted);
};

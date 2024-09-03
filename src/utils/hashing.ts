import bcrypt from 'bcryptjs';

export const hash = async (password: string) => bcrypt.hash(password, 10);

export const compare = async (password: string, hash: string) => bcrypt.compare(password, hash);

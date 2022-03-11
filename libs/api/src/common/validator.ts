import { ValidationError } from './error/validation.error';

export const validateUuid = (uuid: string) => {
  if (!/^[a-zA-Z0-9-]{36}$/.test(uuid)) throw new ValidationError('Invalid uuid');
};

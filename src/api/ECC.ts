import { ECCKeyInput, ECCKeyOutput } from '~/models/ECC';
import { BaseInstance } from './base';

export const generateKey = async (reqBody: ECCKeyInput): Promise<ECCKeyOutput> => {
  const { data } = await BaseInstance.post<ECCKeyOutput>('/ecc/key/all', reqBody);

  return data;
};

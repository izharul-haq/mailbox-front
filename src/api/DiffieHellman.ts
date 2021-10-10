import { DiffieHellmanKeyInput, DiffieHellmanKeyOutput } from '~/models/DiffieHellman'
import { BaseInstance } from './base'

export const generateKey = async (reqBody: DiffieHellmanKeyInput): Promise<DiffieHellmanKeyOutput> => {
  const { data } = await BaseInstance.post<DiffieHellmanKeyOutput>(
    '/dh/key',
    reqBody
  );

  return data;
};

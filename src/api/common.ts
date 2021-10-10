import {
  encryptText as RSAEncryptText,
  decryptText as RSADecryptText,
  encryptFile as RSAEncryptFile,
  decryptFile as RSADecryptFile,
} from './RSA';
import {
  encryptText as ElgamalEncryptText,
  decryptText as ElgamalDecryptText,
  encryptFile as ElgamalEncryptFile,
  decryptFile as ElgamalDecryptFile,
} from './Elgamal';

export const encryptText = async (algo: string, message: string, key: number[]): Promise<string> => {
  if (algo === 'rsa') return await RSAEncryptText(message, key);
  else return await ElgamalEncryptText(message, key);
};

export const decryptText = async (algo: string, message: number[], key: number[]): Promise<string> => {
  if (algo === 'rsa') return await RSADecryptText(message, key);
  else return await ElgamalDecryptText(message, key);
};

export const encryptFile = async (algo: string, message: File, filetype: string, key: string): Promise<void> => {
  if (algo === 'rsa') await RSAEncryptFile(message, filetype, key);
  else await ElgamalEncryptFile(message, filetype, key);
};

export const decryptFile = async (algo: string, message: File, filetype: string, key: string): Promise<void> => {
  if (algo === 'rsa') await RSADecryptFile(message, filetype, key);
  else await ElgamalDecryptFile(message, filetype, key);
};
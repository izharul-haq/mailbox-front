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

export const encryptText = async (algo: string, message: string): Promise<string> => {
  if (algo === 'rsa') return await RSAEncryptText(message);
  else return await ElgamalEncryptText(message);
};

export const decryptText = async (algo: string, message: number[]): Promise<string> => {
  if (algo === 'rsa') return await RSADecryptText(message);
  else return await ElgamalDecryptText(message);
};

export const encryptFile = async (algo: string, message: File, filetype: string): Promise<void> => {
  if (algo === 'rsa') await RSAEncryptFile(message, filetype);
  else await ElgamalEncryptFile(message, filetype);
};

export const decryptFile = async (algo: string, message: File, filetype: string): Promise<void> => {
  if (algo === 'rsa') await RSADecryptFile(message, filetype);
  else await ElgamalDecryptFile(message, filetype);
};
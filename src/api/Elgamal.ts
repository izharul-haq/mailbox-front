import { ElgamalKeyInput, ElgamalKeyOutput } from '~/models/Elgamal';
import { BaseInstance } from './base'

export const generateKey = async (reqBody: ElgamalKeyInput): Promise<ElgamalKeyOutput> => {
  const { data } = await BaseInstance.post<ElgamalKeyOutput>(
    '/elgamal/key/all',
    reqBody
  );

  return data;
};

export const encryptText = async (message: string, key: number[]): Promise<string> => {
  const { data } = await BaseInstance.post<number[]>(
    '/elgamal/encrypt/text',
    { message: message, key: key }
  );

  return data.join(' ');
};

export const decryptText = async (message: number[], key: number[]): Promise<string> => {
  const { data } = await BaseInstance.post<string>(
    '/elgamal/decrypt/text',
    { message: message, key: key }
  );

  return data;
};

export const encryptFile = async (message: File, filetype: string, key: string): Promise<void> => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('key', key);

  const { data } = await BaseInstance.post<string>(
    '/elgamal/encrypt/file',
    formData,
    { responseType: 'blob' }
  );

  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Elgamal_encrypted.${filetype}`);
  document.body.appendChild(link);
  link.click();
};

export const decryptFile = async (message: File, filetype: string, key: string): Promise<void> => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('key', key);

  const { data } = await BaseInstance.post<string>(
    '/elgamal/decrypt/file',
    formData,
    { responseType: 'blob' }
  );

  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Elgamal_decrypted.${filetype}`);
  document.body.appendChild(link);
  link.click();
};

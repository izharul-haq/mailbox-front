import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { decryptFile, decryptText, encryptFile, encryptText } from '~/api/common';

interface Props {
  algo: string;
  onResult: (result: string) => void;
}

const InputTable: React.FC<Props> = ({ algo, onResult }) => {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [mode, setMode] = useState<'enc' | 'dec'>('enc');
  
  const { register, handleSubmit } = useForm();
  
  const onEncrypt = async (data: { message: string, file: FileList }) => {
    try {
      if (inputType === 'text') {
        const res = await encryptText(algo, data.message);
        onResult(res);
      } else {
        const filenameSplit = data.file[0].name.split('.');
        await encryptFile(algo, data.file[0], filenameSplit[filenameSplit.length - 1]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onDecrypt = async (data: { message: string, file: FileList }) => {
    try {
      if (inputType === 'text') {
        const arr = data.message.split(' ').map((int) => parseInt(int));
        const res = await decryptText(algo, arr);
        onResult(res);
      } else {
        const filenameSplit = data.file[0].name.split('.');
        await decryptFile(algo, data.file[0], filenameSplit[filenameSplit.length - 1]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <form
        id={`${algo}-input`}
        className="mb-2 rounded-lg shadow"
        onSubmit={handleSubmit(mode === 'enc' ? onEncrypt : onDecrypt)}
      >
        <table className="table-auto min-w-max text-sm w-full text-[1rem]">
          <thead>
            <tr>
              <th className="table-header" colSpan={4}>Input</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr>
              <td className="table-cell" colSpan={1}>Input Type</td>
              <td className="table-cell flex-row space-x-2 justify-between" colSpan={3}>
                <div className="flex flex-row space-x-2">
                  <button
                    type="button"
                    className={`button button-${inputType === 'text' ? 'primary' : 'secondary' }`}
                    onClick={() => setInputType('text')}
                  >
                    Text
                  </button>
                  <button
                    type="button"
                    className={`button button-${inputType === 'file' ? 'primary' : 'secondary'}`}
                    onClick={() => setInputType('file')}
                  >
                    File
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="table-cell" colSpan={1}>Message</td>
              <td className={`table-cell ${inputType === 'text' ?  'block' : 'hidden'}`} colSpan={3}>
                <textarea
                  className="input-text"
                  placeholder="Insert plaintext or ciphertext here"
                  required={inputType === 'text'}
                  {...register('message')}
                />
              </td>
              <td className={`table-cell ${inputType === 'file' ?  'block' : 'hidden'}`} colSpan={3}>
                <input
                  className="input-text"
                  type="file"
                  required={inputType === 'file'}
                  {...register('file')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="mb-3">
        <div className="flex justify-between">
          <div></div>
          <div className="flex space-x-2">
            <button
              className="button button-primary"
              type="submit"
              form={`${algo}-input`}
              onClick={() => setMode('enc')}
            >
              Encrypt
            </button>
            <button
              className="button button-secondary"
              type="submit"
              form={`${algo}-input`}
              onClick={() => setMode('dec')}
            >
              Decrypt
            </button>
          </div>
        </div>
    </div>
    </>
  );
};

export default InputTable;

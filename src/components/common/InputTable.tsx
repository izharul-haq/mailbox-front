import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { decryptFile, decryptText, encryptFile, encryptText } from '~/api/common';
import { BsQuestionDiamond } from 'react-icons/bs';
import { Transition, Dialog } from '@headlessui/react';

interface Props {
  algo: string;
  onResult: (result: string) => void;
}

const InputTable: React.FC<Props> = ({ algo, onResult }) => {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [mode, setMode] = useState<'enc' | 'dec'>('enc');
  const [open, setOpen] = useState<boolean>(false);
  
  const { register, handleSubmit } = useForm();
  
  const onEncrypt = async (data: { message: string, file: FileList, key: string }) => {
    try {
      if (inputType === 'text') {
        const key = data.key.split(', ').map((num) => parseInt(num));
        const res = await encryptText(algo, data.message, key);
        onResult(res);
      } else {
        const filenameSplit = data.file[0].name.split('.');
        await encryptFile(algo, data.file[0], filenameSplit[filenameSplit.length - 1], data.key);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onDecrypt = async (data: { message: string, file: FileList, key: string }) => {
    try {
      if (inputType === 'text') {
        const key = data.key.split(', ').map((num) => parseInt(num));
        const arr = data.message.split(' ').map((int) => parseInt(int));
        const res = await decryptText(algo, arr, key);
        onResult(res);
      } else {
        const filenameSplit = data.file[0].name.split('.');
        await decryptFile(algo, data.file[0], filenameSplit[filenameSplit.length - 1], data.key);
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
            <tr>
              <td className="table-cell" colSpan={1}>
                <div className="flex justify-center space-x-2 items-center">
                  <span>Key</span>
                  <span
                    className="cursor-pointer hover:text-lightning-yellow-500"
                    onClick={() => setOpen(true)}
                  >
                    <BsQuestionDiamond />
                  </span>
                </div>
              </td>
              <td className="table-cell" colSpan={3}>
                <input
                  className="input-text"
                  type="text"
                  placeholder="Public or Private key"
                  required
                  {...register('key')}
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

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 min-h-screen w-full flex justify-center items-center backdrop-filter backdrop-blur bg-black bg-opacity-20"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="flex flex-col p-4 rounded-lg text-victoria-600 bg-botticelli-300 shadow">
            <Dialog.Overlay className="w-full h-full" />
            <Dialog.Title
              as="div"
              className="font-bold text-pine-500 text-xl mb-2 uppercase text-center"
            >
              NOTE
            </Dialog.Title>
            <Dialog.Description as="div" className="mb-4 text-center w-96">
              Please follow the same format as being shown in Generate Key.
              For Example, if in Generate Key public key is <span className="font-mono font-semibold">(12, 345)</span>,
              then please insert public key as <span className="font-mono font-semibold">12, 345</span> (without parentheses).
            </Dialog.Description>
            <button
              className="button button-primary"
              onClick={() => setOpen(false)}
            >
              OK
            </button>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InputTable;

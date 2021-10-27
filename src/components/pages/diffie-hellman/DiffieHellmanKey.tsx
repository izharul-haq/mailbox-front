import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateKey } from '~/api/DiffieHellman';
import { DiffieHellmanKeyInput } from '~/models/DiffieHellman';

const DiffieHellmanKey: React.FC = () => {
  const [X, setX] = useState<number | undefined>();
  const [Y, setY] = useState<number | undefined>();
  const [K, setK] = useState<number | undefined>();

  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: DiffieHellmanKeyInput) => {
    try {
      const { X, Y, K } = await generateKey(data);
      setX(X); setY(Y); setK(K);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="page-container text-victoria-600">
      <div className="mb-8">
        <div className="page-title mb-1">
          Key Generator
        </div>
        <div className="italic">For Diffie-Hellman exchange</div>
      </div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">P</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random prime number"
              {...register('p', { setValueAs: parseInt })}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">Q</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random prime number less than P"
              {...register('q', { setValueAs: parseInt })}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-row space-x-4 p-2 bg-red-600 rounded-md">
          <div
            className="flex space-x-4 items-center w-full">
            <div className="w-8 text-botticelli-500">A</div>
            <div className="w-full">
              <input
                className="input-number"
                type="number"
                min="2"
                required
                placeholder="Party 1's random integer"
                {...register('x', { setValueAs: parseInt })}
              />
            </div>
          </div>
          <div
            className="flex space-x-4 items-center w-full">
            <div className="w-8 text-botticelli-500">B</div>
            <div className="w-full">
              <input
                className="input-number"
                type="number"
                min="2"
                required
                placeholder="Party 2's random integer"
                {...register('y', { setValueAs: parseInt })}
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-full"></div>
          <div>
            <button className="button button-primary">
              Generate
            </button>
          </div>
        </div>
      </form>
      <div className="mb-4 flex flex-col space-y-4 rounded-md p-2 bg-victoria-500">
        <div className="flex flex-row justify-between space-x-2 items-center">
          <div className="flex flex-row space-x-2 items-center w-full">
            <div className="text-botticelli-500">X</div>
            <div className="w-full">
              <input
                className="input-text"
                placeholder="Public key from party 1"
                value={ X ? X : '' }
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2 items-center w-full">
            <div className="text-botticelli-500">Y</div>
            <div className="w-full">
              <input
                className="input-text"
                placeholder="Public key from party 2"
                value={ Y ? Y : '' }
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-2 items-center">
          <div className="text-botticelli-500 min-w-max">Session Key</div>
          <div className="w-full">
            <input
              className="input-text"
              placeholder="Session key goes here"
              value={ K ? K : '' }
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffieHellmanKey;

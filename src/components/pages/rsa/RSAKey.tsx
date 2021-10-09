import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateKey } from '~/api/RSA';
import { RSAKeyInput } from '~/models/RSA';

const RSAKeyPage: React.FC = () => {
  const [e, setE] = useState<number | undefined>();
  const [d, setD] = useState<number | undefined>();
  const [n, setN] = useState<number | undefined>();

  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: RSAKeyInput) => {
    try {
      const { e, d, n } = await generateKey(data);
      setE(e); setD(d); setN(n);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-container text-victoria-600">
      <div className="mb-8">
        <div className="page-title mb-1">
          Key Generator
        </div>
        <div className="italic">For RSA algorithm</div>
      </div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-max">P</div>
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
          <div className="w-max">Q</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random prime number. Must be different from P"
              {...register('q', { setValueAs: parseInt })}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-max">E</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random integer greater than 1"
              {...register('e', { setValueAs: parseInt })}
            />
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
      <div className="mb-4 flex justify-between items-center rounded-md p-2 bg-victoria-500">
        <div className="flex space-x-4 items-center">
          <div className="text-botticelli-500">Public Key</div>
          <div>
            <input
              className="input-text"
              value={ e ? `(${e}, ${n})` : '' }
              placeholder="Public key goes here"
              readOnly
            />
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="text-botticelli-500">Private Key</div>
          <div>
            <input
              className="input-text"
              value={ d ? `(${d}, ${n})` : '' }
              placeholder="Private key goes here"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSAKeyPage;

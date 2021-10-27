import { generateKey } from '~/api/paillier';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PaillierKeyInput } from '~/models/Paillier';
import { saveAsJSONFile } from '~/utils/key';

const PaillierKey: React.FC = () => {
  const [g, setG] = useState<number | undefined>();
  const [n, setN] = useState<number | undefined>();
  const [l, setL] = useState<number | undefined>();
  const [m, setM] = useState<number | undefined>();

  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: PaillierKeyInput) => {
    try {
      const { g, n, l, m } = await generateKey(data);
      setG(g); setN(n); setL(l); setM(m);
    } catch (err) {
      alert((err as Error).message);
    }
  }
  
  return (
    <div className="page-container text-victoria-600">
      <div className="mb-8">
        <div className="page-title mb-1">
          Key Generator
        </div>
        <div className="italic">For Paillier algorithm</div>
      </div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
      <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">P</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="101"
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
              min="101"
              required
              placeholder="Random prime number other than P"
              {...register('q', { setValueAs: parseInt })}
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
      <div className="mb-2 flex flex-col space-y-2 rounded-md p-2 bg-victoria-500">
        <div className="flex justify-between space-x-2 items-center">
          <div className="text-botticelli-500 w-32">Public Key</div>
          <div className="w-full">
            <input
              className="input-text"
              value={ g ? `(${g}, ${n})` : '' }
              placeholder="Public key goes here"
              readOnly
            />
          </div>
          <button
            type="button"
            className="button button-secondary max-w-max"
            onClick={() => {
              const content = { g: g as number, n: n as number };
              saveAsJSONFile(content, 'paillier_public');
            }}
          >
            Save to JSON File
          </button>
        </div>
        <div className="flex justify-between space-x-2 items-center">
          <div className="text-botticelli-500 w-32">Private Key</div>
          <div className="w-full">
            <input
              className="input-text"
              value={ l ? `(${l}, ${m})` : '' }
              placeholder="Private key goes here"
              readOnly
            />
          </div>
          <button
            type="button"
            className="button button-secondary max-w-max"
            onClick={() => {
              const content = { l: l as number, m: m as number };
              saveAsJSONFile(content, 'paillier_private');
            }}
          >
            Save to JSON File
          </button>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-full"></div>
        <div className="flex space-x-2">
          <button
            className="button button-primary w-max"
            onClick={() => {
              navigator.clipboard.writeText(`${g}, ${n}`);
            }}
          >
            Copy Public Key
          </button>
          <button
            className="button button-primary w-max"
            onClick={() => {
              navigator.clipboard.writeText(`${l}, ${m}`);
            }}
          >
            Copy Private Key
          </button>
          <button
            className="button button-primary w-max"
            onClick={() => {
              navigator.clipboard.writeText(`${g}, ${n}, ${l}, ${m}`);
            }}
          >
            Copy Both Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaillierKey;

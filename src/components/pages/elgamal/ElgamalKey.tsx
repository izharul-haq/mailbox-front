import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateKey } from '~/api/Elgamal';
import { ElgamalKeyInput } from '~/models/Elgamal';
import { saveAsJSONFile } from '~/utils/key';

const ElgamalKey: React.FC = () => {
  const [y, setY] = useState<number | undefined>();
  const [g, setG] = useState<number | undefined>();
  const [x, setX] = useState<number | undefined>();
  const [p, setP] = useState<number | undefined>();

  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: ElgamalKeyInput) => {
    try {
      const { y, g, x, p } = await generateKey(data);
      setY(y); setG(g); setX(x); setP(p);
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
        <div className="italic">For Elgamal algorithm</div>
      </div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">P</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="1009"
              required
              placeholder="Random prime number"
              {...register('p', { setValueAs: parseInt })}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">G</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random integer less than P"
              {...register('g', { setValueAs: parseInt })}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">X</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random integer greater than 1 and two less than P"
              {...register('x', { setValueAs: parseInt })}
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
      <div className="mb-4 flex flex-col space-y-2 rounded-md p-2 bg-victoria-500">
        <div className="flex justify-between space-x-2 items-center">
          <div className="text-botticelli-500 w-32">Public Key</div>
          <div className="w-full">
            <input
              className="input-text"
              value={ y ? `(${y}, ${g}, ${p})` : '' }
              placeholder="Public key goes here"
              readOnly
            />
          </div>
          <button
            type="button"
            className="button button-secondary max-w-max"
            onClick={() => {
              const content = { y: y as number, g: g as number, p: p as number };
              saveAsJSONFile(content, 'elgamal_public');
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
              value={ x ? `(${x}, ${p})` : '' }
              placeholder="Private key goes here"
              readOnly
            />
          </div>
          <button
            type="button"
            className="button button-secondary max-w-max"
            onClick={() => {
              const content = { x: x as number, p: p as number };
              saveAsJSONFile(content, 'elgamal_private');
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
              navigator.clipboard.writeText(`${y}, ${g}, ${p}`);
            }}
          >
            Copy Public Key
          </button>
          <button
            className="button button-primary w-max"
            onClick={() => {
              navigator.clipboard.writeText(`${x}, ${p}`);
            }}
          >
            Copy Private Key
          </button>
          <button
            className="button button-primary w-max"
            onClick={() => {
              navigator.clipboard.writeText(`${y}, ${g}, ${x}, ${p}`);
            }}
          >
            Copy Both Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElgamalKey;

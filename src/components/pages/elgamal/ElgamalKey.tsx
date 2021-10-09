import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateKey } from '~/api/Elgamal';
import { ElgamalKeyInput } from '~/models/Elgamal';

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
      alert(err.message);
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
          <div className="w-max">G</div>
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
          <div className="w-max">X</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              min="2"
              required
              placeholder="Random integer greater than 1 and less than P - 2"
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
      <div className="mb-4 flex justify-between items-center rounded-md p-2 bg-victoria-500">
        <div className="flex space-x-4 items-center">
          <div className="text-botticelli-500">Public Key</div>
          <div>
            <input
              className="input-text"
              value={ y ? `(${y}, ${g}, ${p})` : '' }
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
              value={ x ? `(${x}, ${p})` : '' }
              placeholder="Private key goes here"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElgamalKey;

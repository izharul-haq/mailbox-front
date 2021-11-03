import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateKey } from '~/api/ECC';
import { Curve, ECCKeyInput } from '~/models/ECC';
import { saveAsJSONFile } from '~/utils/key';

const ECCKey: React.FC = () => {
  const [pri_key, setPri_key] = useState<string | undefined>();
  const [x, setX] = useState<string | undefined>();
  const [y, setY] = useState<string | undefined>();
  const [curve, setCurve] = useState<Curve | undefined>();
  
  const [hidePoint, setHidePoint] = useState<boolean>(true);
  const [hideCurve, setHidecurve] = useState<boolean>(true);

  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: ECCKeyInput) => {
    try {
      const { pri_key, pub_key } = await generateKey(data);
      setPri_key(pri_key); setX(pub_key.x); setY(pub_key.y); setCurve(pub_key.curve);
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
        <div className="italic">For ECC algorithm</div>
      </div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">A</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              required
              placeholder="Random integer"
              {...register('a')}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">B</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              required
              placeholder="Another random integer"
              {...register('b')}
            />
          </div>
        </div>
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
              {...register('p')}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">N</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              required
              placeholder="Number of points in elliptic curve"
              {...register('n')}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">Gx</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              required
              placeholder="X-value from selected point in elliptic curve"
              {...register('base_point.0')}
            />
          </div>
        </div>
        <div
          className="mb-4 flex space-x-4 items-center">
          <div className="w-8">Gy</div>
          <div className="w-full">
            <input
              className="input-number"
              type="number"
              required
              placeholder="Y-value from selected point in elliptic curve"
              {...register('base_point.1')}
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
          <div className="w-full flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-botticelli-500 font-semibold">Point</div>
                <div>
                  <button
                    className="button button-secondary"
                    onClick={() => setHidePoint(!hidePoint)}
                  >
                    {hidePoint ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>
              <div className={`${hidePoint ? 'hidden' : 'block'} flex flex-col space-y-2`}>
                <div
                  className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">X</div>
                  <input
                    className="input-text"
                    value={ x ? x : '' }
                    placeholder="X point of public key goes here"
                    readOnly
                  />
                </div>
                <div
                  className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">Y</div>
                  <input
                    className="input-text"
                    value={ y ? y : '' }
                    placeholder="Y point of public key goes here"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-botticelli-500 font-semibold">Curve</div>
                <div>
                  <button
                    className="button button-secondary"
                    onClick={() => setHidecurve(!hideCurve)}
                  >
                    {hideCurve ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>
              <div className={`${hideCurve ? 'hidden' : 'block'} flex flex-col space-y-2`}>
                <div className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">A</div>
                  <input
                    className="input-text"
                    value={ curve ? curve.a : '' }
                    placeholder="A value from curve"
                    readOnly
                  />
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">B</div>
                  <input
                    className="input-text"
                    value={ curve ? curve.b : '' }
                    placeholder="B value from curve"
                    readOnly
                  />
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">N</div>
                  <input
                    className="input-text"
                    value={ curve ? curve.n : '' }
                    placeholder="Number of points in curve"
                    readOnly
                  />
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">P</div>
                  <input
                    className="input-text"
                    value={ curve ? curve.p : '' }
                    placeholder="Prime number used in curve"
                    readOnly
                  />
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">Gx</div>
                  <input
                    className="input-text"
                    value={ curve ? curve.G_x : '' }
                    placeholder="X-value from selected point in curve"
                    readOnly
                  />
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="w-4 text-botticelli-500">Gy</div>
                  <input
                    className="input-text"
                    value={ curve ? curve.G_x : '' }
                    placeholder="Y-value from selected point in curve"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="button button-secondary max-w-max"
            onClick={() => {
              const content = { x: y as string, y: y as string, curve: curve as Curve };
              saveAsJSONFile(content, 'ecc_public');
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
              value={ pri_key ? pri_key : ''}
              placeholder="Private key goes here"
              readOnly
            />
          </div>
          <button
            type="button"
            className="button button-secondary max-w-max"
            onClick={() => {
              const content = { pri_key: pri_key as string };
              saveAsJSONFile(content, 'ecc_private');
            }}
          >
            Save to JSON File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ECCKey;

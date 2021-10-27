import React, { useState } from 'react';
import InputTable from '~/components/common/InputTable';
import OutputTable from '~/components/common/OutputTable';

const PaillierMainDashboard: React.FC = () => {
  const [res, setRes] = useState<string | undefined>();

  return (
    <div className="page-container text-victoria-600">
      <div className="mb-8">
      <div className="page-title mb-1">Encrypt and Decrypt</div>
        <div className="italic">For Paillier algorithm</div>
      </div>
      <div className="mb-4">
        <InputTable algo="paillier" onResult={setRes} />
      </div>
      <div className="mb-4">
        <OutputTable algo="paillier" output={res} />
      </div>
      <div className="bg-victoria-200 rounded-md p-2 text-victoria-800 text-justify">
        <b>NOTE:</b> To decrypt message with paillier algorithm, use both public and private key.
        For example, if generated public key is <span className="font-mono font-semibold">(g, n)</span>
        {' '} and private key is <span className="font-mono font-semibold">(l, m)</span>, insert{' '}
        <span className="font-mono font-semibold">g, n, l, m</span> in Key field.
      </div>
    </div>
  );
};

export default PaillierMainDashboard;

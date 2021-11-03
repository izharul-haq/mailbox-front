import React, { useState } from 'react';
import InputTable from '~/components/common/InputTable';
import OutputTable from '~/components/common/OutputTable';

const ECCMainDashboard: React.FC = () => {
  const [res, setRes] = useState<string | undefined>();
  
  return (
    <div className="page-container text-victoria-600">
      <div className="mb-8">
        <div className="page-title mb-1">Encrypt and Decrypt</div>
        <div className="italic">For ECC algorithm</div>
      </div>
      <div className="mb-4">
        <InputTable algo="ecc" onResult={setRes} />
      </div>
      <div className="mb-4">
        <OutputTable algo="ecc" output={res} />
      </div>
    </div>
  );
};

export default ECCMainDashboard;

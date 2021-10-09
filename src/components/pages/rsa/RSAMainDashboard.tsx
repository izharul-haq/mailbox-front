import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { checkKey } from '~/api/RSA';
import InputTable from '~/components/common/InputTable';
import OutputTable from '~/components/common/OutputTable';

const RSAMainDashboard: React.FC = () => {  
  const [res, setRes] = useState<string | undefined>();
  
  const { data: isKeysExist } = useQuery('rsa-key-check', () => checkKey());

  if (isKeysExist === null) {
    return null;
  }

  return (
    <div className="page-container text-victoria-600">
      <div className="mb-8">
        <div className="page-title mb-1">Encrypt and Decrypt</div>
        <div className="italic">For RSA algorithm</div>
      </div>
      <div className={`mb-2 px-2 py-1 font-semibold ${isKeysExist ? 'hidden' : 'block'} rounded-lg bg-lightning-yellow-500 text-victoria-500`}>
        Warning: No RSA key detected. Please click <Link href="/rsa/key" passHref><a className="underline font-bold">here</a></Link> to generate key
      </div>
      <div className="mb-4">
        <InputTable algo={'rsa'} onResult={setRes} />
      </div>
      <div className="mb-4">
        <OutputTable algo="rsa" output={res} />
      </div>
    </div>
  )
};

export default RSAMainDashboard;

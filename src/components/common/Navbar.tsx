import React, { useState } from 'react';
import Link from 'next/link';
import { MdAlternateEmail } from 'react-icons/md';

const Navbar: React.FC = () => {
  const [rsa, setRSA] = useState<boolean>(false);
  const [elg, setElg] = useState<boolean>(false);
  
  return (
    <nav className="top-0 right-0">
      <div className="w-64 fixed h-full p-8 bg-victoria-600">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center items-center font-semibold text-3xl mb-8 text-botticelli-500">
            <Link href="/" passHref>
              <a className="flex flex-row space-x-2 items-center mb-2 cursor-pointer hover:text-lightning-yellow-500">
                M<span><MdAlternateEmail /></span>ilbox
              </a>
            </Link>
            <div className="text-sm">Send your mail securely</div>
          </div>
          <div
            className="px-2 py-1 text-botticelli-500 cursor-pointer text-xl font-semibold mb-2 hover:bg-victoria-700 rounded-md"
            onClick={() => setRSA(!rsa)}
          >
            RSA
          </div>
          <div className={`${rsa ? 'block' : 'hidden'} flex flex-col rounded-md bg-victoria-700 p-2 mb-4`}>
            <Link href="/rsa/key" passHref>
              <a className="mb-1 px-2 py-1 rounded-md font-semibold text-lg text-botticelli-500 hover:bg-lightning-yellow-500 hover:text-victoria-600">
                Generate Key
              </a>
            </Link>
            <Link href="/rsa" passHref>
              <a className="mb-1 px-2 py-1 rounded-md font-semibold text-lg text-botticelli-500 hover:bg-lightning-yellow-500 hover:text-victoria-600">
                Encrypt/Decrypt
              </a>
            </Link>
          </div>
          <div
            className="px-2 py-1 text-botticelli-500 cursor-pointer text-xl font-semibold mb-2 hover:bg-victoria-700 rounded-md"
            onClick={() => setElg(!elg)}
          >
            Elgamal
          </div>
          <div className={`${elg ? 'block' : 'hidden'} flex flex-col rounded-md bg-victoria-700 p-2 mb-4`}>
            <Link href="/elgamal/key" passHref>
              <a className="mb-1 px-2 py-1 rounded-md font-semibold text-lg text-botticelli-500 hover:bg-lightning-yellow-500 hover:text-victoria-600">
                Generate Key
              </a>
            </Link>
            <Link href="/elgamal" passHref>
              <a className="mb-1 px-2 py-1 rounded-md font-semibold text-lg text-botticelli-500 hover:bg-lightning-yellow-500 hover:text-victoria-600">
                Encrypt/Decrypt
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

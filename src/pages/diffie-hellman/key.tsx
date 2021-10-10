import React from 'react';
import DiffieHellmanKey from '~/components/pages/diffie-hellman/DiffieHellmanKey';
import MainTemplate from '~/components/templates/MainTemplate';

const DiffieHellmanKeyPage: React.FC = () => {
  return (
    <MainTemplate>
      <DiffieHellmanKey />
    </MainTemplate>
  );
};

export default DiffieHellmanKeyPage;

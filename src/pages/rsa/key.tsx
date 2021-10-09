import React from 'react';
import RSAKey from '~/components/pages/rsa/RSAKey';
import MainTemplate from '~/components/templates/MainTemplate';

const RSAKeyPage: React.FC = () => {
  return (
    <MainTemplate>
      <RSAKey />
    </MainTemplate>
  );
};

export default RSAKeyPage;

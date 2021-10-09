import React from 'react';
import RSAMainDashboard from '~/components/pages/rsa/RSAMainDashboard';
import MainTemplate from '~/components/templates/MainTemplate';

const RSAPage: React.FC = () => {
  return (
    <MainTemplate>
      <RSAMainDashboard />
    </MainTemplate>
  );
};

export default RSAPage;

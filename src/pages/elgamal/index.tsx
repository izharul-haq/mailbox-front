import React from 'react';
import ElgamalMainDashboard from '~/components/pages/elgamal/ElgamalMainDashboard';
import MainTemplate from '~/components/templates/MainTemplate';

const ElgamalPage: React.FC = () => {
  return (
    <MainTemplate>
      <ElgamalMainDashboard />
    </MainTemplate>
  );
};

export default ElgamalPage;

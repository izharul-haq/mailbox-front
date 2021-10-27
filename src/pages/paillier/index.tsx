import React from 'react';
import PaillierMainDashboard from '~/components/pages/paillier/PaillierMainDashboard';
import MainTemplate from '~/components/templates/MainTemplate';

const PaillierPage: React.FC =  () => {
  return (
    <MainTemplate>
      <PaillierMainDashboard />
    </MainTemplate>
  );
};

export default PaillierPage;

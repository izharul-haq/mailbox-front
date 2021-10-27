import React from 'react';
import PaillierKey from '~/components/pages/paillier/PaillierKey';
import MainTemplate from '~/components/templates/MainTemplate';

const PaillierKeyPage: React.FC = () => {
  return (
    <MainTemplate>
      <PaillierKey />
    </MainTemplate>
  );
};

export default PaillierKeyPage;

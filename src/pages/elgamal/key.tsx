import React from 'react';
import ElgamalKey from '~/components/pages/elgamal/ElgamalKey';
import MainTemplate from '~/components/templates/MainTemplate';

const ElgamalKeyPage: React.FC = () => {
  return (
    <MainTemplate>
      <ElgamalKey />
    </MainTemplate>
  );
};

export default ElgamalKeyPage;

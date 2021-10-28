import React from 'react';
import ECCKey from '~/components/pages/ecc/ECCKey';
import MainTemplate from '~/components/templates/MainTemplate';

const ECCKeyPage: React.FC = () => {
  return (
    <MainTemplate>
      <ECCKey />
    </MainTemplate>
  );
};

export default ECCKeyPage;

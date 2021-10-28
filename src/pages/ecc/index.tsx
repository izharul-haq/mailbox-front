import React from 'react';
import ECCMainDashboard from '~/components/pages/ecc/ECCMainDashboard';
import MainTemplate from '~/components/templates/MainTemplate';

const ECCPage: React.FC = () => {
  return (
    <MainTemplate>
      <ECCMainDashboard />
    </MainTemplate>
  );
};

export default ECCPage;

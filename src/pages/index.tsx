import React from 'react';
import MainDashboard from '~/components/pages/MainDashboard';
import MainTemplate from '~/components/templates/MainTemplate';

const IndexPage: React.FC = () => {
  return (
    <MainTemplate>
      <MainDashboard />
    </MainTemplate>
  );
};

export default IndexPage;

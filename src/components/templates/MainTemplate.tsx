import React from 'react';
import Navbar from '../common/Navbar';

const MainTemplate: React.FC = (props) => {
  return (
    <div className="antialiased w-full flex flex-row bg-botticelli-100">
      <Navbar />
      <main className="min-h-screen ml-64 w-full">{props.children}</main>
    </div>
  );
};

export default MainTemplate;
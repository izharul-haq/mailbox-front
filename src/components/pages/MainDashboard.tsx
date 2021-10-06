import React from 'react';
import { MdAlternateEmail } from 'react-icons/md';

const MainDashboard: React.FC = () => {
  return (
    <div className="page-container">
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="flex flex-row shadow-md">
          <div className="bg-victoria-600 text-5xl p-4 rounded-l-lg text-botticelli-500 flex items-center">
            <MdAlternateEmail />
          </div>
          <div className="rounded-r-lg flex flex-col font-semibold items-center text-center p-4 text-lg text-victoria-600 bg-botticelli-500">
            <div className="mb-1">Send mails without leak with</div>
            <div className="font-bold text-xl">M@ilbox</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

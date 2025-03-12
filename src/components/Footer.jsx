import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Kairos Academy</p>
            <p className="text-sm text-gray-300">Educational Excellence Since 2023</p>
          </div>
          <div className="text-sm text-gray-300">
            <p>© {new Date().getFullYear()} Kairos Academy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

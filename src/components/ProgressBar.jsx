import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-medium text-primary-700">Application Progress</span>
        <span className="text-sm font-medium text-primary-700">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

import React from 'react';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev,
  isNextDisabled = false,
  isSubmit = false
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={onPrev}
            className="btn btn-outline"
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        
        <div className="flex items-center">
          <a 
            href="https://www.myprocare.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center mr-4"
          >
            <span className="underline">URL - URL Attendance!</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={onNext}
              className="btn btn-primary"
              disabled={isNextDisabled}
            >
              Save & Continue
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isNextDisabled}
            >
              {isSubmit ? 'Submit Application' : 'Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;

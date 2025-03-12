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
    <div className="flex justify-between mt-8">
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
  );
};

export default FormNavigation;

import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import ProgressBar from '../components/ProgressBar';
import FormNavigation from '../components/FormNavigation';
import StudentInfoForm from '../components/form/StudentInfoForm';
import ParentInfoForm from '../components/form/ParentInfoForm';
import SchoolingOptionsForm from '../components/form/SchoolingOptionsForm';
import ReligiousInfoForm from '../components/form/ReligiousInfoForm';
import MedicalInfoForm from '../components/form/MedicalInfoForm';
import AdditionalInfoForm from '../components/form/AdditionalInfoForm';
import FinancialConsentForm from '../components/form/FinancialConsentForm';
import AgreementsForm from '../components/form/AgreementsForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

const stripePromise = loadStripe('pk_test_51JpyudEjPvWPIfOtBr624VlAXJ2r7lHiUfwSaK8p8c8nSSUpR4LHNVczEi1dTVzoSQINfh1E6veaJob4MqvFRGhJ00dgLD4XQG');

const ApplicationForm = () => {
  const { formData, nextStep, prevStep, resetForm } = useFormContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  
  const steps = [
    { name: 'Student Information', component: StudentInfoForm },
    { name: 'Parent/Guardian Information', component: ParentInfoForm },
    { name: 'Religious Information', component: ReligiousInfoForm },
    { name: 'Medical Information', component: MedicalInfoForm },
    { name: 'Schooling Options', component: SchoolingOptionsForm },
    { name: 'Financial Consent', component: FinancialConsentForm },
    { name: 'Agreements', component: AgreementsForm },
    { name: 'Review & Payment', component: ReviewStep }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only allow submission if the payment has been completed
    if (formData.currentStep === steps.length - 1) {
      if (paymentComplete) {
        // Submit the form data with payment information
        console.log('Form submitted with payment:', { formData, paymentMethodId });
        setIsSubmitted(true);
        // In a real application, you would send the data to the server here
      } else {
        // Scroll to payment form and highlight it
        const paymentForm = document.getElementById('payment-section');
        if (paymentForm) {
          paymentForm.scrollIntoView({ behavior: 'smooth' });
          paymentForm.classList.add('animate-pulse');
          setTimeout(() => {
            paymentForm.classList.remove('animate-pulse');
          }, 2000);
        }
        alert('Please complete the payment before submitting the application.');
      }
    } else {
      nextStep();
    }
  };

  const handlePaymentSuccess = (paymentMethodId) => {
    setPaymentComplete(true);
    setPaymentMethodId(paymentMethodId);
  };

  const validateCurrentStep = () => {
    // Basic validation logic would go here
    // For the prototype, we're not implementing full validation
    return true;
  };

  const CurrentStepComponent = steps[formData.currentStep].component;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {isSubmitted ? (
        <SuccessMessage onNewApplication={() => {
          resetForm();
          setIsSubmitted(false);
          setPaymentComplete(false);
          setPaymentMethodId(null);
        }} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kairos Academy Enrollment Application</h1>
            <p className="text-gray-600">Complete the following steps to apply for enrollment at Kairos Academy.</p>
          </div>
          
          <ProgressBar currentStep={formData.currentStep} totalSteps={steps.length} />
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Step {formData.currentStep + 1}: {steps[formData.currentStep].name}
            </h2>
          </div>
          
          <CurrentStepComponent paymentComplete={paymentComplete} onPaymentSuccess={handlePaymentSuccess} />
          
          <FormNavigation 
            currentStep={formData.currentStep} 
            totalSteps={steps.length} 
            onNext={nextStep} 
            onPrev={prevStep}
            isNextDisabled={!validateCurrentStep() || (formData.currentStep === steps.length - 1 && !paymentComplete)}
            isSubmit={formData.currentStep === steps.length - 1}
          />
        </form>
      )}
    </div>
  );
};

const ReviewStep = ({ paymentComplete, onPaymentSuccess }) => {
  const { formData } = useFormContext();
  const { studentInfo, parentInfo, schoolingOptions, religiousInfo, medicalInfo, additionalInfo, agreements, financialConsent } = formData;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Application</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Student Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{`${studentInfo.firstName} ${studentInfo.middleName ? studentInfo.middleName + ' ' : ''}${studentInfo.lastName}`}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{studentInfo.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">{studentInfo.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Grade Applying For</p>
            <p className="font-medium">{studentInfo.gradeApplying}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{`${studentInfo.address.street}, ${studentInfo.address.city}, ${studentInfo.address.state} ${studentInfo.address.zipCode}`}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{studentInfo.phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{studentInfo.email || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Parent/Guardian Information</h3>
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Primary Guardian</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{`${parentInfo.primaryGuardian.firstName} ${parentInfo.primaryGuardian.lastName}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Relationship</p>
              <p className="font-medium">{parentInfo.primaryGuardian.relationship}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{parentInfo.primaryGuardian.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{parentInfo.primaryGuardian.email}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">
                {parentInfo.primaryGuardian.address.sameAsStudent 
                  ? `Same as student` 
                  : `${parentInfo.primaryGuardian.address.street}, ${parentInfo.primaryGuardian.address.city}, ${parentInfo.primaryGuardian.address.state} ${parentInfo.primaryGuardian.address.zipCode}`}
              </p>
            </div>
          </div>
        </div>
        
        {(parentInfo.secondaryGuardian.firstName || parentInfo.secondaryGuardian.lastName) && (
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Secondary Guardian</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{`${parentInfo.secondaryGuardian.firstName} ${parentInfo.secondaryGuardian.lastName}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="font-medium">{parentInfo.secondaryGuardian.relationship || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{parentInfo.secondaryGuardian.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{parentInfo.secondaryGuardian.email || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {parentInfo.secondaryGuardian.address.sameAsStudent 
                    ? `Same as student` 
                    : parentInfo.secondaryGuardian.address.street 
                      ? `${parentInfo.secondaryGuardian.address.street}, ${parentInfo.secondaryGuardian.address.city}, ${parentInfo.secondaryGuardian.address.state} ${parentInfo.secondaryGuardian.address.zipCode}`
                      : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Religious Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Church Attending</p>
            <p className="font-medium">{religiousInfo.churchAttending || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pastor</p>
            <p className="font-medium">{religiousInfo.pastorName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pastor Phone</p>
            <p className="font-medium">{religiousInfo.pastorPhone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Father Christian?</p>
            <p className="font-medium">{religiousInfo.fatherChristian === true ? 'Yes' : religiousInfo.fatherChristian === false ? 'No' : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mother Christian?</p>
            <p className="font-medium">{religiousInfo.motherChristian === true ? 'Yes' : religiousInfo.motherChristian === false ? 'No' : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Student Profession of Faith?</p>
            <p className="font-medium">{religiousInfo.studentProfessionOfFaith === true ? 'Yes' : religiousInfo.studentProfessionOfFaith === false ? 'No' : 'N/A'}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Medical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Family Physician</p>
            <p className="font-medium">{medicalInfo.physicianName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Physician Phone</p>
            <p className="font-medium">{medicalInfo.physicianPhone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Physical Impairments or Allergies?</p>
            <p className="font-medium">{medicalInfo.hasPhysicalImpairments === true ? 'Yes' : medicalInfo.hasPhysicalImpairments === false ? 'No' : 'N/A'}</p>
            {medicalInfo.hasPhysicalImpairments && (
              <>
                <p className="text-sm text-gray-500 mt-2">Details</p>
                <p className="font-medium">{medicalInfo.physicalImpairmentsDetails || 'N/A'}</p>
              </>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Immunization Record Up to Date?</p>
            <p className="font-medium">{medicalInfo.immunizationUpToDate === true ? 'Yes' : medicalInfo.immunizationUpToDate === false ? 'No' : 'N/A'}</p>
            {medicalInfo.immunizationUpToDate === false && (
              <>
                <p className="text-sm text-gray-500 mt-2">Reason</p>
                <p className="font-medium">{medicalInfo.immunizationDetails || 'N/A'}</p>
              </>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Learning/Mental Disabilities?</p>
            <p className="font-medium">{medicalInfo.hasLearningDisabilities === true ? 'Yes' : medicalInfo.hasLearningDisabilities === false ? 'No' : 'N/A'}</p>
            {medicalInfo.hasLearningDisabilities && (
              <>
                <p className="text-sm text-gray-500 mt-2">Details</p>
                <p className="font-medium">{medicalInfo.learningDisabilitiesDetails || 'N/A'}</p>
              </>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Attended Alternative School?</p>
            <p className="font-medium">{medicalInfo.attendedAlternativeSchool === true ? 'Yes' : medicalInfo.attendedAlternativeSchool === false ? 'No' : 'N/A'}</p>
            {medicalInfo.attendedAlternativeSchool && (
              <>
                <p className="text-sm text-gray-500 mt-2">Details</p>
                <p className="font-medium">{medicalInfo.alternativeSchoolDetails || 'N/A'}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Schooling Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Program Type</p>
            <p className="font-medium">{schoolingOptions.programType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Previous School</p>
            <p className="font-medium">{schoolingOptions.previousSchool || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Reason for Transfer</p>
            <p className="font-medium">{schoolingOptions.reasonForTransfer || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Special Educational Needs</p>
            <p className="font-medium">{schoolingOptions.specialNeeds || 'None'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">IEP Status</p>
            <p className="font-medium">{schoolingOptions.hasIEP ? 'Yes' : 'No'}</p>
            {schoolingOptions.hasIEP && (
              <>
                <p className="text-sm text-gray-500 mt-2">IEP Details</p>
                <p className="font-medium">{schoolingOptions.iepDetails}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Financial Consent</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Tuition Program</p>
            <p className="font-medium">
              {(() => {
                switch(financialConsent.tuitionProgram) {
                  case 'ft': return 'Full Time (Ten payments of $400)';
                  case 'hp2': return'Home School Program 2 (Ten payments of $260)';
                  case 'hp1': return 'Home School Program 1 (Ten payments of $200)';
                  case 'ldft': return 'Learning Differences Full Time (Ten payments of $575)';
                  case 'ld2': return 'Learning Differences 2 (Ten payments of $365)';
                  case 'ld1': return 'Learning Differences 1 (Ten payments of $275)';
                  default: return 'Not selected';
                }
              })()}
            </p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Special Notes</p>
            <p className="font-medium">{financialConsent.specialNotes || 'None'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Pre K-8 Curriculum Payment</p>
            <p className="font-medium">
              {financialConsent.curriculumPaymentPrek8 === 'annual' 
                ? 'Annually: $300 due July 10th' 
                : financialConsent.curriculumPaymentPrek8 === 'split'
                  ? 'Split Payment: $150 due July 10th, $150 due November 10th'
                  : 'Not selected'}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">9-12th Grade Curriculum Payment</p>
            <p className="font-medium">
              {financialConsent.curriculumPayment912 === 'annual' 
                ? 'Annually: $325 due July 10th' 
                : financialConsent.curriculumPayment912 === 'split'
                  ? 'Split Payment: $150 due July 10th, $175 due November 10th'
                  : 'Not selected'}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Supply Fee ($50)</p>
            <p className="font-medium">{financialConsent.supplyFee ? 'Yes' : 'No'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Sports Fee ($60)</p>
            <p className="font-medium">{financialConsent.sportsFee ? 'Yes' : 'No'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Preferred Date of Draft</p>
            <p className="font-medium">{financialConsent.draftDate || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Agreed to Financial Terms</p>
            <p className="font-medium">{financialConsent.agreeToTerms ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Reasons for Enrolling</p>
            <p className="font-medium">{additionalInfo.reasonForEnrolling || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Special Skills and Talents</p>
            <p className="font-medium">{additionalInfo.specialSkills || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Parent Contribution</p>
            <p className="font-medium">{additionalInfo.parentContribution || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ever Been Expelled?</p>
            <p className="font-medium">{additionalInfo.hasBeenExpelled === true ? 'Yes' : additionalInfo.hasBeenExpelled === false ? 'No' : 'N/A'}</p>
            {additionalInfo.hasBeenExpelled && (
              <>
                <p className="text-sm text-gray-500 mt-2">Details</p>
                <p className="font-medium">{additionalInfo.expelledDetails || 'N/A'}</p>
              </>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Functions Independently?</p>
            <p className="font-medium">{additionalInfo.functionIndependently === true ? 'Yes' : additionalInfo.functionIndependently === false ? 'No' : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Attention Span</p>
            <p className="font-medium">{additionalInfo.attentionSpan || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">Agreements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gapcols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Photo Release</p>
            <p className="font-medium">{agreements.photoRelease === true ? 'Yes' : agreements.photoRelease === false ? 'No' : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Parent Commitment</p>
            <p className="font-medium">{agreements.parentCommitment === true ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cell Phone Registration</p>
            <p className="font-medium">Has Phone: {agreements.cellPhoneRegistration.hasPhone === true ? 'Yes' : 'No'}</p>
            {agreements.cellPhoneRegistration.hasPhone && (
              <>
                <p className="text-sm text-gray-500 mt-2">Phone Number</p>
                <p className="font-medium">{agreements.cellPhoneRegistration.phoneNumber || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-2">Make</p>
                <p className="font-medium">{agreements.cellPhoneRegistration.make || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-2">Model</p>
                <p className="font-medium">{agreements.cellPhoneRegistration.model || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-2">Color</p>
                <p className="font-medium">{agreements.cellPhoneRegistration.color || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-2">Identifying Factors</p>
                <p className="font-medium">{agreements.cellPhoneRegistration.identifyingFactors || 'N/A'}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="confirm-accurate"
              name="confirm-accurate"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="confirm-accurate" className="ml-2 block text-sm text-gray-700">
              I confirm that all the information provided is accurate and complete.
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree-terms"
              name="agree-terms"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
              I agree to the terms and conditions of Kairos Academy.
            </label>
          </div>
        </div>
      </div>
      
      {/* Payment Section - Only proceed if user agrees to terms */}
      <div id="payment-section" className={`mt-8 ${paymentComplete ? 'opacity-50' : ''}`}>
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Registration Payment</h3>
          <p className="text-gray-600 mb-4">
            To complete your application, please submit the non-refundable $100 registration fee.
          </p>
          
          {paymentComplete ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    Payment Complete! Your application is ready to submit.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm onPaymentSuccess={onPaymentSuccess} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

const SuccessMessage = ({ onNewApplication }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <div className="mb-6">
        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Application Submitted!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for applying to Kairos Academy. We have received your application and will be in touch soon.
      </p>
      <p className="text-gray-600 mb-6">
        Application ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </p>
      <button
        type="button"
        onClick={onNewApplication}
        className="btn btn-primary"
      >
        Start New Application
      </button>
    </div>
  );
};

export default ApplicationForm;

import React, { useState } from 'react';
import { getFormData, submitToAirtable } from '../utils/storage';

const PaymentForm = ({ onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Registration fee and application fee amounts
  const registrationFee = 100;
  const applicationFee = 20;
  const totalFee = registrationFee + applicationFee;
  const convenienceFee = 3;
  const totalWithConvenienceFee = totalFee + convenienceFee;

  // Stripe payment link
  const stripePaymentLink = 'https://buy.stripe.com/4gw4hz3c0fkXaHu8wy';

  const handleSubmitToAirtable = async (method) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Get form data from local storage
      const formData = getFormData();
      
      if (!formData) {
        throw new Error('No application data found. Please complete the application form first.');
      }
      
      // Submit to Airtable
      await submitToAirtable(formData, method);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Notify parent component
      if (onPaymentSuccess) {
        onPaymentSuccess(method);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripePayment = (event) => {
    event.preventDefault();
    
    // Submit to Airtable first
    handleSubmitToAirtable('card').then(() => {
      // Open the Stripe payment link in a new tab
      window.open(stripePaymentLink, '_blank');
    });
  };

  const handleAlternativePayment = (event) => {
    event.preventDefault();
    
    // Submit to Airtable
    handleSubmitToAirtable(paymentMethod);
  };

  return (
    <div className="mt-4 border p-6 rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Application and Registration Fees</h3>
      <p className="text-gray-600 mb-4">Please complete your payment to submit your application.</p>
      
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{submitError}</p>
        </div>
      )}
      
      {showSuccessMessage ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-lg mb-2">Application Successfully Submitted!</h4>
          <p className="mb-3">Thank you for submitting your application to Kairos Christian Academy.</p>
          <p className="mb-3">You will receive an email within a week with next steps. There is no interview required.</p>
          <p className="mb-3">If you have any questions, please contact:</p>
          <ul className="list-disc pl-5 mb-3">
            <li className="mb-1">Email: <a href="mailto:pastor@dcclute.org" className="text-blue-600 hover:underline">pastor@dcclute.org</a></li>
            <li>Phone: <a href="tel:9792653590" className="text-blue-600 hover:underline">(979) 265-3590</a></li>
          </ul>
          <button 
            onClick={() => setShowSuccessMessage(false)} 
            className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Return to Payment Options
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Application Fee:</span>
              <span className="font-medium">${applicationFee}.00</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Registration Fee:</span>
              <span className="font-medium">${registrationFee}.00</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-700 font-medium">Total:</span>
              <span className="font-bold">${totalFee}.00</span>
            </div>
            {paymentMethod === 'card' && (
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>Convenience Fee:</span>
                <span>${convenienceFee}.00</span>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="payment-cash" className="cursor-pointer">
                    <div className="font-bold">Cash</div>
                    <div className="text-sm text-gray-600">No additional fees</div>
                  </label>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-check"
                    name="paymentMethod"
                    value="check"
                    checked={paymentMethod === 'check'}
                    onChange={() => setPaymentMethod('check')}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="payment-check" className="cursor-pointer">
                    <div className="font-bold">Check</div>
                    <div className="text-sm text-gray-600">No additional fees</div>
                  </label>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-bank-draft"
                    name="paymentMethod"
                    value="bankDraft"
                    checked={paymentMethod === 'bankDraft'}
                    onChange={() => setPaymentMethod('bankDraft')}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="payment-bank-draft" className="cursor-pointer">
                    <div className="font-bold">Auto Bank Draft</div>
                    <div className="text-sm text-gray-600">No additional fees</div>
                  </label>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="payment-card" className="cursor-pointer">
                    <div className="font-bold">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">$3 convenience fee applies</div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {paymentMethod === 'bankDraft' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Auto Bank Draft Information:</strong> Payments made through Automatic Bank Draft will draft the current balance on the account on the first day of the month, unless another date is specified in the Financial Agreement Form.
              </p>
            </div>
          )}
          
          {paymentMethod === 'check' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Check Payment Information:</strong> Please make checks payable to "Kairos Christian Academy" and include your student's name in the memo line.
              </p>
            </div>
          )}
          
          {paymentMethod === 'cash' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Cash Payment Information:</strong> Please bring exact cash amount to the school office during business hours. A receipt will be provided.
              </p>
            </div>
          )}
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Online Account Access:</strong> You can access your account online at <a href="https://www.myprocare.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.myprocare.com</a>.
            </p>
            <div className="mt-3 flex items-center">
              <a 
                href="https://www.myprocare.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <span className="underline">URL - URL Attendance!</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          {paymentMethod === 'card' ? (
            <button
              onClick={handleStripePayment}
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <span>Pay with Stripe</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleAlternativePayment}
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {isSubmitting ? (
                <>
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                </>
              ) : (
                `Continue with ${paymentMethod === 'bankDraft' ? 'Auto Bank Draft' : paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Payment`
              )}
            </button>
          )}
          
          {paymentMethod === 'card' && (
            <p className="text-xs text-center text-gray-500 mt-2">
              You will be redirected to Stripe's secure payment page.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentForm;

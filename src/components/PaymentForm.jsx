import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js is loaded.
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // In a real implementation, you would send paymentMethod.id to your server
      // and process the payment there
      setPaymentSuccess('Payment successful!');
      setPaymentError(null);
      
      // Notify parent component about successful payment
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentMethod.id);
      }
    }
    
    setIsProcessing(false);
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    },
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-6 rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Registration Fee Payment - $100</h3>
      <p className="text-gray-600 mb-4">Please complete your payment to submit your application.</p>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card">
          Card Details
        </label>
        <div className="border rounded p-3 bg-gray-50">
          <CardElement id="card" options={CARD_ELEMENT_OPTIONS} className="py-2" />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          For testing, use card number: 4242 4242 4242 4242, any future date, any 3 digits for CVC, and any postal code.
        </p>
      </div>
      
      {paymentError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{paymentError}</p>
        </div>
      )}
      
      {paymentSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{paymentSuccess}</p>
        </div>
      )}
      
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay $100 Registration Fee'}
      </button>
    </form>
  );
};

export default PaymentForm;

import React, { useState } from 'react';
import { useFormContext } from '../../contexts/FormContext';

const AgreementsForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { agreements } = formData;
  const [showTermsError, setShowTermsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name.startsWith('cellPhoneRegistration.')) {
      const field = name.split('.')[1];
      updateFormData('agreements', {
        cellPhoneRegistration: {
          ...agreements.cellPhoneRegistration,
          [field]: value,
        },
      });
    } else {
      updateFormData('agreements', {
        [name]: newValue,
      });
    }
    
    // Clear error when user checks the terms
    if (name === 'termsAndConditions' && checked) {
      setShowTermsError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user has agreed to terms
    if (!agreements.termsAndConditions) {
      setShowTermsError(true);
      // Scroll to the terms section
      document.getElementById('terms-section').scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    
    // Continue with form submission
    return true;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agreements</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Photo Release</h3>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-700 mb-4">
            I give permission for my child's photo/image to be included in Kairos Christian Academy's 
            promotional materials, website, social media, and other publications.
          </p>
          <div className="flex items-center">
            <input
              type="radio"
              id="photoRelease-yes"
              name="photoRelease"
              value="true"
              checked={agreements.photoRelease === true}
              onChange={() => updateFormData('agreements', { photoRelease: true })}
              className="mr-2"
            />
            <label htmlFor="photoRelease-yes" className="mr-4">Consent</label>
            
            <input
              type="radio"
              id="photoRelease-no"
              name="photoRelease"
              value="false"
              checked={agreements.photoRelease === false}
              onChange={() => updateFormData('agreements', { photoRelease: false })}
              className="mr-2"
            />
            <label htmlFor="photoRelease-no">Do Not Consent</label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Parent Commitment</h3>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-700 mb-4">
            I commit to supporting my child's education at Kairos Christian Academy by:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
            <li>Ensuring regular attendance and punctuality</li>
            <li>Supporting the school's policies and procedures</li>
            <li>Maintaining open communication with teachers and staff</li>
            <li>Participating in school activities and events when possible</li>
            <li>Supporting my child's learning at home</li>
          </ul>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="parentCommitment"
              name="parentCommitment"
              checked={agreements.parentCommitment}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="parentCommitment" className="ml-2 block text-sm text-gray-700">
              I agree to the Parent Commitment
            </label>
          </div>
        </div>
      </div>

      <div id="terms-section" className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Terms & Conditions</h3>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-700 mb-4">
            By checking this box, I acknowledge that I have read, understood, and agree to abide by all the terms and conditions 
            set forth by Kairos Christian Academy, including but not limited to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
            <li>School policies and procedures</li>
            <li>Code of conduct</li>
            <li>Financial obligations</li>
            <li>Attendance requirements</li>
            <li>Disciplinary actions</li>
          </ul>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAndConditions"
              name="termsAndConditions"
              checked={agreements.termsAndConditions}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="termsAndConditions" className="ml-2 block text-sm text-gray-700">
              I agree to the Terms & Conditions
            </label>
          </div>
          {showTermsError && (
            <div className="text-red-500 text-sm mt-1">
              You must agree to the terms and conditions to continue. Please check the box above.
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Cellular Phone Registration Form</h3>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-700 mb-4">
            Does your child have a cell phone that they will bring to school?
          </p>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="cellPhoneRegistration.hasPhone"
              name="cellPhoneRegistration.hasPhone"
              checked={agreements.cellPhoneRegistration.hasPhone}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="cellPhoneRegistration.hasPhone" className="ml-2 block text-sm text-gray-700">
              Yes, my child has a cell phone
            </label>
          </div>

          {agreements.cellPhoneRegistration.hasPhone && (
            <div className="pl-6 border-l-2 border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cellPhoneRegistration.phoneNumber">Cell Phone Number</label>
                <input
                  type="tel"
                  id="cellPhoneRegistration.phoneNumber"
                  name="cellPhoneRegistration.phoneNumber"
                  value={agreements.cellPhoneRegistration.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cellPhoneRegistration.make">Make</label>
                <input
                  type="text"
                  id="cellPhoneRegistration.make"
                  name="cellPhoneRegistration.make"
                  value={agreements.cellPhoneRegistration.make}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., Apple, Samsung"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cellPhoneRegistration.model">Model</label>
                <input
                  type="text"
                  id="cellPhoneRegistration.model"
                  name="cellPhoneRegistration.model"
                  value={agreements.cellPhoneRegistration.model}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., iPhone 13, Galaxy S22"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cellPhoneRegistration.color">Color</label>
                <input
                  type="text"
                  id="cellPhoneRegistration.color"
                  name="cellPhoneRegistration.color"
                  value={agreements.cellPhoneRegistration.color}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cellPhoneRegistration.identifyingFactors">Any other identifying factors</label>
                <textarea
                  id="cellPhoneRegistration.identifyingFactors"
                  name="cellPhoneRegistration.identifyingFactors"
                  value={agreements.cellPhoneRegistration.identifyingFactors}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., case description, stickers, etc."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementsForm;

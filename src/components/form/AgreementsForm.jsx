import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const AgreementsForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { agreements } = formData;

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
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agreements</h2>

      <div className="mb-4">
        <label className="form-label" htmlFor="photoRelease">Photo Release</label>
        <select
          id="photoRelease"
          name="photoRelease"
          value={agreements.photoRelease === null ? '' : agreements.photoRelease}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Consent</option>
          <option value={false}>Do Not Consent</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="parentCommitment">Parent Commitment</label>
        <input
          type="checkbox"
          id="parentCommitment"
          name="parentCommitment"
          checked={agreements.parentCommitment}
          onChange={handleChange}
          className="form-checkbox"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Cellular Phone Registration Form</h3>

        <div className="mb-2">
          <label className="form-label" htmlFor="cellPhoneRegistration.hasPhone">Has Phone?</label>
          <input
            type="checkbox"
            id="cellPhoneRegistration.hasPhone"
            name="cellPhoneRegistration.hasPhone"
            checked={agreements.cellPhoneRegistration.hasPhone}
            onChange={handleChange}
            className="form-checkbox"
          />
        </div>

        {agreements.cellPhoneRegistration.hasPhone && (
          <>
            <div className="mb-4">
              <label className="form-label" htmlFor="cellPhoneRegistration.phoneNumber">Cell Phone Number</label>
              <input
                type="tel"
                id="cellPhoneRegistration.phoneNumber"
                name="cellPhoneRegistration.phoneNumber"
                value={agreements.cellPhoneRegistration.phoneNumber}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="cellPhoneRegistration.make">Make</label>
              <input
                type="text"
                id="cellPhoneRegistration.make"
                name="cellPhoneRegistration.make"
                value={agreements.cellPhoneRegistration.make}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="cellPhoneRegistration.model">Model</label>
              <input
                type="text"
                id="cellPhoneRegistration.model"
                name="cellPhoneRegistration.model"
                value={agreements.cellPhoneRegistration.model}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="cellPhoneRegistration.color">Color</label>
              <input
                type="text"
                id="cellPhoneRegistration.color"
                name="cellPhoneRegistration.color"
                value={agreements.cellPhoneRegistration.color}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="cellPhoneRegistration.identifyingFactors">Any other identifying factors</label>
              <textarea
                id="cellPhoneRegistration.identifyingFactors"
                name="cellPhoneRegistration.identifyingFactors"
                value={agreements.cellPhoneRegistration.identifyingFactors}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgreementsForm;

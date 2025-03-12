import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const SchoolingOptionsForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { schoolingOptions } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData('schoolingOptions', { 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schooling Options</h2>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="programType">Program Type <span className="text-red-500">*</span></label>
        <select
          id="programType"
          name="programType"
          value={schoolingOptions.programType}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">Select Program Type</option>
          <option value="full-time">Full Time</option>
          <option value="hp1">HP1 - Homeschool Program (2 days)</option>
          <option value="hp2">HP2 - Homeschool Program (3 days)</option>
          <option value="ld1">LD1 - Learning Differences (2 days)</option>
          <option value="ld2">LD2 - Learning Differences (3 days)</option>
          <option value="ldft">LDFT - Learning Differences (Full Time)</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="previousSchool">Previous School</label>
        <input
          type="text"
          id="previousSchool"
          name="previousSchool"
          value={schoolingOptions.previousSchool}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="reasonForTransfer">Reason for Transfer (if applicable)</label>
        <textarea
          id="reasonForTransfer"
          name="reasonForTransfer"
          value={schoolingOptions.reasonForTransfer}
          onChange={handleChange}
          className="form-input"
          rows="3"
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="specialNeeds">Are there any Physical Disabilities or Accommodations?</label>
        <textarea
          id="specialNeeds"
          name="specialNeeds"
          value={schoolingOptions.specialNeeds}
          onChange={handleChange}
          className="form-input"
          rows="3"
        ></textarea>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="hasIEP"
            name="hasIEP"
            checked={schoolingOptions.hasIEP}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="hasIEP" className="ml-2 block text-sm text-gray-700">
            Does the student have an IEP (Individualized Education Program)?
          </label>
        </div>
        
        {schoolingOptions.hasIEP && (
          <div className="mt-2 pl-6">
            <label className="form-label" htmlFor="iepDetails">IEP Details</label>
            <textarea
              id="iepDetails"
              name="iepDetails"
              value={schoolingOptions.iepDetails}
              onChange={handleChange}
              className="form-input"
              rows="3"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolingOptionsForm;

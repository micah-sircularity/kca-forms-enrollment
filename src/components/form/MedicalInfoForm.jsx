import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const MedicalInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { medicalInfo } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    updateFormData('medicalInfo', {
      [name]: newValue,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Information</h2>

      <div className="mb-4">
        <label className="form-label" htmlFor="physicianName">Family Physician</label>
        <input
          type="text"
          id="physicianName"
          name="physicianName"
          value={medicalInfo.physicianName}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="physicianPhone">Phone</label>
        <input
          type="tel"
          id="physicianPhone"
          name="physicianPhone"
          value={medicalInfo.physicianPhone}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="hasPhysicalImpairments">Does the applicant have any physical impairments or allergies?</label>
        <select
          id="hasPhysicalImpairments"
          name="hasPhysicalImpairments"
          value={medicalInfo.hasPhysicalImpairments === null ? '' : medicalInfo.hasPhysicalImpairments}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {medicalInfo.hasPhysicalImpairments && (
        <div className="mb-4">
          <label className="form-label" htmlFor="physicalImpairmentsDetails">If Yes Explain:</label>
          <textarea
            id="physicalImpairmentsDetails"
            name="physicalImpairmentsDetails"
            value={medicalInfo.physicalImpairmentsDetails}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" htmlFor="hasPhysicalDisabilities">Are there any physical disabilities?</label>
        <select
          id="hasPhysicalDisabilities"
          name="hasPhysicalDisabilities"
          value={medicalInfo.hasPhysicalDisabilities === null ? '' : medicalInfo.hasPhysicalDisabilities}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {medicalInfo.hasPhysicalDisabilities && (
        <div className="mb-4">
          <label className="form-label" htmlFor="physicalDisabilitiesDetails">If Yes Explain:</label>
          <textarea
            id="physicalDisabilitiesDetails"
            name="physicalDisabilitiesDetails"
            value={medicalInfo.physicalDisabilitiesDetails}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" htmlFor="immunizationUpToDate">Is the immunization record up to date?</label>
        <select
          id="immunizationUpToDate"
          name="immunizationUpToDate"
          value={medicalInfo.immunizationUpToDate === null ? '' : medicalInfo.immunizationUpToDate}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {medicalInfo.immunizationUpToDate === false && (
        <div className="mb-4">
          <label className="form-label" htmlFor="immunizationDetails">If No, Why?</label>
          <textarea
            id="immunizationDetails"
            name="immunizationDetails"
            value={medicalInfo.immunizationDetails}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" htmlFor="hasLearningDisabilities">Has your child been diagnosed with any learning/mental disabilities?</label>
        <select
          id="hasLearningDisabilities"
          name="hasLearningDisabilities"
          value={medicalInfo.hasLearningDisabilities === null ? '' : medicalInfo.hasLearningDisabilities}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {medicalInfo.hasLearningDisabilities && (
        <div className="mb-4">
          <label className="form-label" htmlFor="learningDisabilitiesDetails">If Yes, please explain:</label>
          <textarea
            id="learningDisabilitiesDetails"
            name="learningDisabilitiesDetails"
            value={medicalInfo.learningDisabilitiesDetails}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" htmlFor="attendedAlternativeSchool">Has your child ever attended an alternative school for behavioral problems or for special need education programs?</label>
        <select
          id="attendedAlternativeSchool"
          name="attendedAlternativeSchool"
          value={medicalInfo.attendedAlternativeSchool === null ? '' : medicalInfo.attendedAlternativeSchool}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {medicalInfo.attendedAlternativeSchool && (
        <div className="mb-4">
          <label className="form-label" htmlFor="alternativeSchoolDetails">If Yes, explain:</label>
          <textarea
            id="alternativeSchoolDetails"
            name="alternativeSchoolDetails"
            value={medicalInfo.alternativeSchoolDetails}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      )}
    </div>
  );
};

export default MedicalInfoForm;

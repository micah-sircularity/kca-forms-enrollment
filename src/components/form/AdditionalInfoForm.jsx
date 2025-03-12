import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const AdditionalInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { additionalInfo } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    updateFormData('additionalInfo', {
      [name]: newValue,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Information</h2>

      <div className="mb-4">
        <label className="form-label" htmlFor="reasonForEnrolling">Please state your reasons for enrolling your student in Kairos Christian Academy.</label>
        <textarea
          id="reasonForEnrolling"
          name="reasonForEnrolling"
          value={additionalInfo.reasonForEnrolling}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="specialSkills">What special skills and talents does your child bring to a classroom environment?</label>
        <textarea
          id="specialSkills"
          name="specialSkills"
          value={additionalInfo.specialSkills}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="parentContribution">Please share with us any special talents or support you may be able to contribute to the educational experience of your child and his/her classmates.</label>
        <textarea
          id="parentContribution"
          name="parentContribution"
          value={additionalInfo.parentContribution}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="hasBeenExpelled">Has the student ever been expelled, dismissed, suspended, or refused admission to another school or daycare?</label>
        <select
          id="hasBeenExpelled"
          name="hasBeenExpelled"
          value={additionalInfo.hasBeenExpelled === null ? '' : additionalInfo.hasBeenExpelled}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {additionalInfo.hasBeenExpelled && (
        <div className="mb-4">
          <label className="form-label" htmlFor="expelledDetails">If Yes, explain:</label>
          <textarea
            id="expelledDetails"
            name="expelledDetails"
            value={additionalInfo.expelledDetails}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" htmlFor="functionIndependently">Is the applicant able to function independently (i.e. dress him/her self, eat with a fork or spoon, potty trained, express him/her self, etc.)</label>
        <select
          id="functionIndependently"
          name="functionIndependently"
          value={additionalInfo.functionIndependently === null ? '' : additionalInfo.functionIndependently}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="attentionSpan">Please indicate the level of the student’s attention span.</label>
        <select
          id="attentionSpan"
          name="attentionSpan"
          value={additionalInfo.attentionSpan}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;

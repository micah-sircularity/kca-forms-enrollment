import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const ReligiousInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { religiousInfo } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    updateFormData('religiousInfo', {
      [name]: newValue,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Religious Information</h2>

      <div className="mb-4">
        <label className="form-label" htmlFor="churchAttending">Church Attending</label>
        <input
          type="text"
          id="churchAttending"
          name="churchAttending"
          value={religiousInfo.churchAttending}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="pastorName">Pastor</label>
          <input
            type="text"
            id="pastorName"
            name="pastorName"
            value={religiousInfo.pastorName}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label" htmlFor="pastorPhone">Pastor Phone</label>
          <input
            type="tel"
            id="pastorPhone"
            name="pastorPhone"
            value={religiousInfo.pastorPhone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="fatherChristian">Father: Christian?</label>
          <select
            id="fatherChristian"
            name="fatherChristian"
            value={religiousInfo.fatherChristian === null ? '' : religiousInfo.fatherChristian}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="motherChristian">Mother: Christian?</label>
          <select
            id="motherChristian"
            name="motherChristian"
            value={religiousInfo.motherChristian === null ? '' : religiousInfo.motherChristian}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="studentProfessionOfFaith">Has applicant ever made a profession of faith in Christ?</label>
          <select
            id="studentProfessionOfFaith"
            name="studentProfessionOfFaith"
            value={religiousInfo.studentProfessionOfFaith === null ? '' : religiousInfo.studentProfessionOfFaith}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReligiousInfoForm;

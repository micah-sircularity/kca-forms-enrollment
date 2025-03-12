import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const StudentInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { studentInfo } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      updateFormData('studentInfo', {
        address: {
          ...studentInfo.address,
          [addressField]: value
        }
      });
    } else {
      updateFormData('studentInfo', { [name]: value });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={studentInfo.firstName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={studentInfo.middleName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={studentInfo.lastName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={studentInfo.dateOfBirth}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={studentInfo.age}
            onChange={handleChange}
            className="form-input bg-gray-100"
            readOnly
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="gender">Gender <span className="text-red-500">*</span></label>
          <select
            id="gender"
            name="gender"
            value={studentInfo.gender}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="address.street">Street Address <span className="text-red-500">*</span></label>
        <input
          type="text"
          id="address.street"
          name="address.street"
          value={studentInfo.address.street}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="address.city">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={studentInfo.address.city}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="address.state">State <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="address.state"
            name="address.state"
            value={studentInfo.address.state}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="address.zipCode">Zip Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="address.zipCode"
            name="address.zipCode"
            value={studentInfo.address.zipCode}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="phone">Home Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={studentInfo.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentInfo.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="gradeApplying">Grade Applying For <span className="text-red-500">*</span></label>
          <select
            id="gradeApplying"
            name="gradeApplying"
            value={studentInfo.gradeApplying}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Grade</option>
            <option value="K">Kindergarten</option>
            <option value="1">1st Grade</option>
            <option value="2">2nd Grade</option>
            <option value="3">3rd Grade</option>
            <option value="4">4th Grade</option>
            <option value="5">5th Grade</option>
            <option value="6">6th Grade</option>
            <option value="7">7th Grade</option>
            <option value="8">8th Grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
          </select>
        </div>
        
        <div>
          <label className="form-label" htmlFor="ssn">Social Security Number</label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            value={studentInfo.ssn}
            onChange={handleChange}
            className="form-input"
            placeholder="Optional"
          />
          <p className="text-xs text-gray-500 mt-1">This information is kept confidential.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoForm;

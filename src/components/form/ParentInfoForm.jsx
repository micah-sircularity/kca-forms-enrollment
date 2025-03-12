import React, { useState } from 'react';
import { useFormContext } from '../../contexts/FormContext';

const ParentInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { parentInfo, studentInfo } = formData;
  const [showEmergencyContactError, setShowEmergencyContactError] = useState(false);

  const handlePrimaryGuardianChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'sameAsStudent') {
      updateFormData('parentInfo', {
        primaryGuardian: {
          ...parentInfo.primaryGuardian,
          address: {
            ...parentInfo.primaryGuardian.address,
            sameAsStudent: checked,
            ...(checked ? {
              street: studentInfo.address.street,
              city: studentInfo.address.city,
              state: studentInfo.address.state,
              zipCode: studentInfo.address.zipCode
            } : {})
          }
        }
      });
    } else if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      updateFormData('parentInfo', {
        primaryGuardian: {
          ...parentInfo.primaryGuardian,
          address: {
            ...parentInfo.primaryGuardian.address,
            [addressField]: value
          }
        }
      });
    } else {
      updateFormData('parentInfo', {
        primaryGuardian: {
          ...parentInfo.primaryGuardian,
          [name]: value
        }
      });
    }
  };

  const handleSecondaryGuardianChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'sameAsStudent') {
      updateFormData('parentInfo', {
        secondaryGuardian: {
          ...parentInfo.secondaryGuardian,
          address: {
            ...parentInfo.secondaryGuardian.address,
            sameAsStudent: checked,
            ...(checked ? {
              street: studentInfo.address.street,
              city: studentInfo.address.city,
              state: studentInfo.address.state,
              zipCode: studentInfo.address.zipCode
            } : {})
          }
        }
      });
    } else if (name === 'sameAsPrimary') {
      if (checked) {
        updateFormData('parentInfo', {
          secondaryGuardian: {
            ...parentInfo.secondaryGuardian,
            address: {
              ...parentInfo.primaryGuardian.address
            }
          }
        });
      }
    } else if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      updateFormData('parentInfo', {
        secondaryGuardian: {
          ...parentInfo.secondaryGuardian,
          address: {
            ...parentInfo.secondaryGuardian.address,
            [addressField]: value
          }
        }
      });
    } else {
      updateFormData('parentInfo', {
        secondaryGuardian: {
          ...parentInfo.secondaryGuardian,
          [name]: value
        }
      });
    }
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      updateFormData('parentInfo', {
        emergencyContact: {
          ...parentInfo.emergencyContact,
          address: {
            ...parentInfo.emergencyContact.address,
            [addressField]: value
          }
        }
      });
    } else {
      updateFormData('parentInfo', {
        emergencyContact: {
          ...parentInfo.emergencyContact,
          [name]: value
        }
      });
    }
    
    // Clear error when any emergency contact field is filled
    if (value.trim() !== '') {
      setShowEmergencyContactError(false);
    }
  };

  const handleMaritalStatusChange = (e) => {
    updateFormData('parentInfo', {
      maritalStatus: e.target.value
    });
  };

  const validateEmergencyContact = () => {
    const { emergencyContact } = parentInfo;
    
    // Check if all required emergency contact fields are filled
    const isValid = 
      emergencyContact.firstName.trim() !== '' &&
      emergencyContact.lastName.trim() !== '' &&
      emergencyContact.relationship.trim() !== '' &&
      emergencyContact.phone.trim() !== '' &&
      emergencyContact.cellPhone.trim() !== '' &&
      emergencyContact.address.street.trim() !== '' &&
      emergencyContact.address.city.trim() !== '' &&
      emergencyContact.address.state.trim() !== '' &&
      emergencyContact.address.zipCode.trim() !== '';
      
    if (!isValid) {
      setShowEmergencyContactError(true);
    }
    
    return isValid;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Parent/Guardian Information</h2>
      
      {/* Primary Guardian */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Primary Guardian</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="primary-firstName">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="primary-firstName"
              name="firstName"
              value={parentInfo.primaryGuardian.firstName}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="primary-lastName">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="primary-lastName"
              name="lastName"
              value={parentInfo.primaryGuardian.lastName}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="primary-relationship">Relationship <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="primary-relationship"
              name="relationship"
              value={parentInfo.primaryGuardian.relationship}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="primary-phone">Phone <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="primary-phone"
              name="phone"
              value={parentInfo.primaryGuardian.phone}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="primary-email">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="primary-email"
              name="email"
              value={parentInfo.primaryGuardian.email}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="primary-sameAsStudent"
              name="sameAsStudent"
              checked={parentInfo.primaryGuardian.address.sameAsStudent}
              onChange={handlePrimaryGuardianChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="primary-sameAsStudent" className="ml-2 block text-sm text-gray-700">
              Same address as student
            </label>
          </div>
          
          {!parentInfo.primaryGuardian.address.sameAsStudent && (
            <>
              <div className="mb-4">
                <label className="form-label" htmlFor="primary-address.street">Street Address <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="primary-address.street"
                  name="address.street"
                  value={parentInfo.primaryGuardian.address.street}
                  onChange={handlePrimaryGuardianChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="form-label" htmlFor="primary-address.city">City <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="primary-address.city"
                    name="address.city"
                    value={parentInfo.primaryGuardian.address.city}
                    onChange={handlePrimaryGuardianChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label" htmlFor="primary-address.state">State <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="primary-address.state"
                    name="address.state"
                    value={parentInfo.primaryGuardian.address.state}
                    onChange={handlePrimaryGuardianChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label" htmlFor="primary-address.zipCode">Zip Code <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="primary-address.zipCode"
                    name="address.zipCode"
                    value={parentInfo.primaryGuardian.address.zipCode}
                    onChange={handlePrimaryGuardianChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="primary-occupation">Occupation</label>
            <input
              type="text"
              id="primary-occupation"
              name="occupation"
              value={parentInfo.primaryGuardian.occupation}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="primary-employer">Employer</label>
            <input
              type="text"
              id="primary-employer"
              name="employer"
              value={parentInfo.primaryGuardian.employer}
              onChange={handlePrimaryGuardianChange}
              className="form-input"
            />
          </div>
        </div>
      </div>
      
      {/* Secondary Guardian */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Secondary Guardian (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="secondary-firstName">First Name</label>
            <input
              type="text"
              id="secondary-firstName"
              name="firstName"
              value={parentInfo.secondaryGuardian.firstName}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="secondary-lastName">Last Name</label>
            <input
              type="text"
              id="secondary-lastName"
              name="lastName"
              value={parentInfo.secondaryGuardian.lastName}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="secondary-relationship">Relationship</label>
            <input
              type="text"
              id="secondary-relationship"
              name="relationship"
              value={parentInfo.secondaryGuardian.relationship}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="secondary-phone">Phone</label>
            <input
              type="tel"
              id="secondary-phone"
              name="phone"
              value={parentInfo.secondaryGuardian.phone}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="secondary-email">Email</label>
            <input
              type="email"
              id="secondary-email"
              name="email"
              value={parentInfo.secondaryGuardian.email}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="secondary-sameAsStudent"
              name="sameAsStudent"
              checked={parentInfo.secondaryGuardian.address.sameAsStudent}
              onChange={handleSecondaryGuardianChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="secondary-sameAsStudent" className="ml-2 block text-sm text-gray-700">
              Same address as student
            </label>
          </div>
          
          {!parentInfo.secondaryGuardian.address.sameAsStudent && (
            <>
              <div className="mb-4">
                <label className="form-label" htmlFor="secondary-address.street">Street Address</label>
                <input
                  type="text"
                  id="secondary-address.street"
                  name="address.street"
                  value={parentInfo.secondaryGuardian.address.street}
                  onChange={handleSecondaryGuardianChange}
                  className="form-input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="form-label" htmlFor="secondary-address.city">City</label>
                  <input
                    type="text"
                    id="secondary-address.city"
                    name="address.city"
                    value={parentInfo.secondaryGuardian.address.city}
                    onChange={handleSecondaryGuardianChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label" htmlFor="secondary-address.state">State</label>
                  <input
                    type="text"
                    id="secondary-address.state"
                    name="address.state"
                    value={parentInfo.secondaryGuardian.address.state}
                    onChange={handleSecondaryGuardianChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label" htmlFor="secondary-address.zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="secondary-address.zipCode"
                    name="address.zipCode"
                    value={parentInfo.secondaryGuardian.address.zipCode}
                    onChange={handleSecondaryGuardianChange}
                    className="form-input"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="secondary-occupation">Occupation</label>
            <input
              type="text"
              id="secondary-occupation"
              name="occupation"
              value={parentInfo.secondaryGuardian.occupation}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="secondary-employer">Employer</label>
            <input
              type="text"
              id="secondary-employer"
              name="employer"
              value={parentInfo.secondaryGuardian.employer}
              onChange={handleSecondaryGuardianChange}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div id="emergency-contact-section" className="mt-8 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Emergency Contact</h3>
        <p className="text-sm text-gray-600 mb-4">Please provide an emergency contact other than parents/guardians listed above. <span className="text-red-500 font-medium">All fields are required.</span></p>
        
        {showEmergencyContactError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>Please fill out all emergency contact fields. They are mandatory.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="emergency-firstName">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="emergency-firstName"
              name="firstName"
              value={parentInfo.emergencyContact.firstName}
              onChange={handleEmergencyContactChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="emergency-lastName">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="emergency-lastName"
              name="lastName"
              value={parentInfo.emergencyContact.lastName}
              onChange={handleEmergencyContactChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="emergency-relationship">Relationship to Student <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="emergency-relationship"
              name="relationship"
              value={parentInfo.emergencyContact.relationship}
              onChange={handleEmergencyContactChange}
              className="form-input"
              placeholder="e.g., Grandparent, Aunt, Family Friend"
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="emergency-phone">Phone <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="emergency-phone"
              name="phone"
              value={parentInfo.emergencyContact.phone}
              onChange={handleEmergencyContactChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="form-label" htmlFor="emergency-cellPhone">Cell Phone <span className="text-red-500">*</span></label>
          <input
            type="tel"
            id="emergency-cellPhone"
            name="cellPhone"
            value={parentInfo.emergencyContact.cellPhone}
            onChange={handleEmergencyContactChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label">Address <span className="text-red-500">*</span></label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="form-label" htmlFor="emergency-address.street">Street <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="emergency-address.street"
                name="address.street"
                value={parentInfo.emergencyContact.address.street}
                onChange={handleEmergencyContactChange}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label className="form-label" htmlFor="emergency-address.city">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="emergency-address.city"
                name="address.city"
                value={parentInfo.emergencyContact.address.city}
                onChange={handleEmergencyContactChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="emergency-address.state">State <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="emergency-address.state"
                name="address.state"
                value={parentInfo.emergencyContact.address.state}
                onChange={handleEmergencyContactChange}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label className="form-label" htmlFor="emergency-address.zipCode">Zip Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="emergency-address.zipCode"
                name="address.zipCode"
                value={parentInfo.emergencyContact.address.zipCode}
                onChange={handleEmergencyContactChange}
                className="form-input"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add the validation function to the component
ParentInfoForm.validateForm = (formData) => {
  // Check if all required emergency contact fields are filled
  const { emergencyContact } = formData.parentInfo;
  
  return (
    emergencyContact.firstName.trim() !== '' &&
    emergencyContact.lastName.trim() !== '' &&
    emergencyContact.relationship.trim() !== '' &&
    emergencyContact.phone.trim() !== '' &&
    emergencyContact.cellPhone.trim() !== '' &&
    emergencyContact.address.street.trim() !== '' &&
    emergencyContact.address.city.trim() !== '' &&
    emergencyContact.address.state.trim() !== '' &&
    emergencyContact.address.zipCode.trim() !== ''
  );
};

export default ParentInfoForm;

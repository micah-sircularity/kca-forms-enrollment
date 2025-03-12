import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveFormData, getFormData } from '../utils/storage';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    studentInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      phone: '',
      email: '',
      gradeApplying: '',
      ssn: '' // Optional, sensitive information
    },
    parentInfo: {
      primaryGuardian: {
        firstName: '',
        lastName: '',
        relationship: '',
        phone: '',
        cellPhone: '',
        businessPhone: '',
        email: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          sameAsStudent: false
        },
        occupation: '',
        employer: ''
      },
      secondaryGuardian: {
        firstName: '',
        lastName: '',
        relationship: '',
        phone: '',
        cellPhone: '',
        businessPhone: '',
        email: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          sameAsStudent: false
        },
        occupation: '',
        employer: ''
      },
      maritalStatus: '' // Added marital status
    },
    religiousInfo: {
      churchAttending: '',
      pastorName: '',
      pastorPhone: '',
      fatherChristian: null,
      motherChristian: null,
      studentProfessionOfFaith: null
    },
    medicalInfo: {
      physicianName: '',
      physicianPhone: '',
      hasPhysicalImpairments: false,
      physicalImpairmentsDetails: '',
      immunizationUpToDate: null,
      immunizationDetails: '',
      hasLearningDisabilities: false,
      learningDisabilitiesDetails: '',
      attendedAlternativeSchool: false,
      alternativeSchoolDetails: '',
      medications: []
    },
    schoolingOptions: {
      programType: '',
      previousSchool: '',
      reasonForTransfer: '',
      specialNeeds: '',
      hasIEP: false,
      iepDetails: ''
    },
    additionalInfo: {
      reasonForEnrolling: '',
      specialSkills: '',
      parentContribution: '',
      hasBeenExpelled: false,
      expelledDetails: '',
      functionIndependently: null,
      attentionSpan: ''
    },
    financialConsent: {
      tuitionProgram: '',
      specialNotes: '',
      curriculumPaymentPrek8: '',
      curriculumPayment912: '',
      supplyFee: false,
      sportsFee: false,
      draftDate: '',
      agreeToTerms: false
    },
    agreements: {
      photoRelease: null,
      parentCommitment: false,
      cellPhoneRegistration: {
        hasPhone: false,
        phoneNumber: '',
        make: '',
        model: '',
        color: '',
        identifyingFactors: ''
      }
    },
    currentStep: 0
  });

  // Load saved form data on initial render
  useEffect(() => {
    const savedData = getFormData();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save form data when it changes
  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  // Age calculation utility
  useEffect(() => {
    if (formData.studentInfo.dateOfBirth) {
      const birthDate = new Date(formData.studentInfo.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      updateFormData('studentInfo', { age: age.toString() });
    }
  }, [formData.studentInfo.dateOfBirth]);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const addMedication = (medication) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        medications: [...prev.medicalInfo.medications, medication]
      }
    }));
  };

  const removeMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        medications: prev.medicalInfo.medications.filter((_, i) => i !== index)
      }
    }));
  };

  const nextStep = () => {
    setFormData(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  };

  const prevStep = () => {
    setFormData(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  const goToStep = (step) => {
    setFormData(prev => ({
      ...prev,
      currentStep: step
    }));
  };

  const resetForm = () => {
    setFormData({
      studentInfo: {
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        },
        phone: '',
        email: '',
        gradeApplying: '',
        ssn: ''
      },
      parentInfo: {
        primaryGuardian: {
          firstName: '',
          lastName: '',
          relationship: '',
          phone: '',
          cellPhone: '',
          businessPhone: '',
          email: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            sameAsStudent: false
          },
          occupation: '',
          employer: ''
        },
        secondaryGuardian: {
          firstName: '',
          lastName: '',
          relationship: '',
          phone: '',
          cellPhone: '',
          businessPhone: '',
          email: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            sameAsStudent: false
          },
          occupation: '',
          employer: ''
        },
        maritalStatus: ''
      },
      religiousInfo: {
        churchAttending: '',
        pastorName: '',
        pastorPhone: '',
        fatherChristian: null,
        motherChristian: null,
        studentProfessionOfFaith: null
      },
      medicalInfo: {
        physicianName: '',
        physicianPhone: '',
        hasPhysicalImpairments: false,
        physicalImpairmentsDetails: '',
        immunizationUpToDate: null,
        immunizationDetails: '',
        hasLearningDisabilities: false,
        learningDisabilitiesDetails: '',
        attendedAlternativeSchool: false,
        alternativeSchoolDetails: '',
        medications: []
      },
      schoolingOptions: {
        programType: '',
        previousSchool: '',
        reasonForTransfer: '',
        specialNeeds: '',
        hasIEP: false,
        iepDetails: ''
      },
      additionalInfo: {
        reasonForEnrolling: '',
        specialSkills: '',
        parentContribution: '',
        hasBeenExpelled: false,
        expelledDetails: '',
        functionIndependently: null,
        attentionSpan: ''
      },
      financialConsent: {
        tuitionProgram: '',
        specialNotes: '',
        curriculumPaymentPrek8: '',
        curriculumPayment912: '',
        supplyFee: false,
        sportsFee: false,
        draftDate: '',
        agreeToTerms: false
      },
      agreements: {
        photoRelease: null,
        parentCommitment: false,
        cellPhoneRegistration: {
          hasPhone: false,
          phoneNumber: '',
          make: '',
          model: '',
          color: '',
          identifyingFactors: ''
        }
      },
      currentStep: 0
    });
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      updateFormData,
      addMedication,
      removeMedication,
      nextStep, 
      prevStep,
      goToStep,
      resetForm
    }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;

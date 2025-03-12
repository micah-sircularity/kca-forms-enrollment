import * as React from 'react';
import { saveFormData, getFormData } from '../utils/storage';

// Create context with a default value
const FormContext = React.createContext(null);

// Custom hook to use the form context
export const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Form provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = React.useState({
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
      emergencyContact: {
        firstName: '',
        lastName: '',
        relationship: '',
        phone: '',
        cellPhone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      },
      maritalStatus: '' // Added marital status
    },
    religiousInfo: {
      churchAttending: '',
      churchPhone: '',
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
      hasPhysicalDisabilities: false,
      physicalDisabilitiesDetails: '',
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
      curriculumPaymentPrek8Annual: false,
      curriculumPaymentPrek8Split: false,
      curriculumPayment912Annual: false,
      curriculumPayment912Split: false,
      supplyFee: true,
      sportsFee: false,
      draftDate: '',
      agreeToTerms: false
    },
    agreements: {
      photoRelease: null,
      parentCommitment: false,
      termsAndConditions: false,
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
  React.useEffect(() => {
    const savedData = getFormData();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save form data when it changes
  React.useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  // Age calculation utility
  React.useEffect(() => {
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
        emergencyContact: {
          firstName: '',
          lastName: '',
          relationship: '',
          phone: '',
          cellPhone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          }
        },
        maritalStatus: ''
      },
      religiousInfo: {
        churchAttending: '',
        churchPhone: '',
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
        hasPhysicalDisabilities: false,
        physicalDisabilitiesDetails: '',
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
        curriculumPaymentPrek8Annual: false,
        curriculumPaymentPrek8Split: false,
        curriculumPayment912Annual: false,
        curriculumPayment912Split: false,
        supplyFee: true,
        sportsFee: false,
        draftDate: '',
        agreeToTerms: false
      },
      agreements: {
        photoRelease: null,
        parentCommitment: false,
        termsAndConditions: false,
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

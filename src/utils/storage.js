// Local storage utility functions
import Airtable from 'airtable';

// Airtable configuration
// Using Vite's environment variables with fallbacks
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Enrollments'; // Table name instead of ID

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export const saveFormData = (formData) => {
  localStorage.setItem('kairosApplicationForm', JSON.stringify(formData));
};

export const getFormData = () => {
  const savedData = localStorage.getItem('kairosApplicationForm');
  return savedData ? JSON.parse(savedData) : null;
};

export const clearFormData = () => {
  localStorage.removeItem('kairosApplicationForm');
};

/**
 * Formats the student address as a string
 * @param {Object} addressObj - The address object
 * @returns {string} - Formatted address string
 */
const formatAddress = (addressObj) => {
  if (!addressObj) return '';
  
  const { street, city, state, zipCode } = addressObj;
  const addressParts = [];
  
  if (street) addressParts.push(street);
  if (city) addressParts.push(city);
  if (state) addressParts.push(state);
  if (zipCode) addressParts.push(zipCode);
  
  return addressParts.join(', ');
};

/**
 * Formats boolean values for Airtable
 * @param {string|boolean} value - The value to format
 * @returns {boolean} - Formatted boolean value
 */
const formatBooleanField = (value) => {
  if (value === 'Yes' || value === true || value === 'true') {
    return true;
  }
  if (value === 'No' || value === false || value === 'false') {
    return false;
  }
  return null;
};

/**
 * Formats yes/no values as strings for Airtable
 * @param {string|boolean} value - The value to format
 * @returns {string} - Formatted string value ('Yes', 'No', or 'N/A')
 */
const formatYesNoField = (value) => {
  if (value === true || value === 'true' || value === 'Yes') {
    return 'Yes';
  }
  if (value === false || value === 'false' || value === 'No') {
    return 'No';
  }
  return 'N/A';
};

/**
 * Formats number values for Airtable
 * @param {string|number} value - The value to format
 * @returns {number|null} - Formatted number value
 */
const formatNumberField = (value) => {
  if (value === '' || value === null || value === undefined || value === 'N/A') {
    return null;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Formats the full name from first, middle, and last name
 * @param {string} firstName - First name
 * @param {string} middleName - Middle name
 * @param {string} lastName - Last name
 * @returns {string} - Full name
 */
const formatFullName = (firstName, middleName, lastName) => {
  let fullName = firstName || '';
  if (middleName) fullName += ` ${middleName}`;
  if (lastName) fullName += ` ${lastName}`;
  return fullName.trim();
};

/**
 * Submits form data to Airtable
 * @param {Object} formData - The application form data
 * @param {string} paymentMethod - The payment method used
 * @returns {Promise} - Promise resolving to the Airtable response
 */
export const submitToAirtable = async (formData, paymentMethod = null) => {
  try {
    console.log('Raw form data:', formData);
    
    // Extract payment method from form data if not provided
    if (!paymentMethod && formData.financialConsent && formData.financialConsent.preferredPaymentMethod) {
      paymentMethod = formData.financialConsent.preferredPaymentMethod;
    }
    
    // Format the data for Airtable
    const airtableData = {
      fields: {
        // Student Information
        'Student Name': formatFullName(
          formData.studentInfo.firstName,
          formData.studentInfo.middleName,
          formData.studentInfo.lastName
        ),
        'Student DOB': formData.studentInfo.dateOfBirth || null,
        'Student Gender': formData.studentInfo.gender || '',
        'Student Grade': formData.studentInfo.gradeApplying === 'K' ? 0 : formatNumberField(formData.studentInfo.gradeApplying),
        'Student Address': formatAddress(formData.studentInfo.address),
        'Student Phone': formData.studentInfo.phone || 'N/A',
        'Student Email': formData.studentInfo.email || 'N/A',
        
        // Parent/Guardian Information
        'Parent Name': formatFullName(
          formData.parentInfo.primaryGuardian.firstName,
          '',
          formData.parentInfo.primaryGuardian.lastName
        ),
        'Parent Relationship': formData.parentInfo.primaryGuardian.relationship || '',
        'Parent Phone': formatNumberField(formData.parentInfo.primaryGuardian.phone),
        'Parent Email': formData.parentInfo.primaryGuardian.email || '',
        'Parent Address': formData.parentInfo.primaryGuardian.address.sameAsStudent ? 
          'Same as student' : 
          formatAddress(formData.parentInfo.primaryGuardian.address),
        
        // Religious Information
        'Church Name': formData.religiousInfo.churchAttending || '',
        'Pastor Name': formData.religiousInfo.pastorName || '',
        'Pastor Phone': formData.religiousInfo.pastorPhone || 'N/A',
        'Father Christian': formatYesNoField(formData.religiousInfo.fatherChristian),
        'Mother Christian': formatYesNoField(formData.religiousInfo.motherChristian),
        'Student Faith': formatYesNoField(formData.religiousInfo.studentProfessionOfFaith),
        
        // Medical Information
        'Physician Name': formData.medicalInfo.physicianName || '',
        'Physician Phone': formData.medicalInfo.physicianPhone || 'N/A',
        'Physical Impairments': formData.medicalInfo.hasPhysicalImpairments ? 
          formData.medicalInfo.physicalImpairmentsDetails : 'No',
        'Immunization Status': formatYesNoField(formData.medicalInfo.immunizationUpToDate),
        'Learning Disabilities': formData.medicalInfo.hasLearningDisabilities ? 
          formData.medicalInfo.learningDisabilitiesDetails : 'No',
        'Alternative School': formatYesNoField(formData.medicalInfo.attendedAlternativeSchool),
        
        // Schooling Options
        'Program Type': formData.schoolingOptions.programType || '',
        'Previous School': formData.schoolingOptions.previousSchool || 'N/A',
        'Transfer Reason': formData.schoolingOptions.reasonForTransfer || 'N/A',
        'Special Needs': formData.schoolingOptions.specialNeeds || 'None',
        'IEP Status': formatYesNoField(formData.schoolingOptions.hasIEP),
        
        // Financial Information
        'Tuition Program': formData.financialConsent.tuitionProgram === 'ft' ? 
          'Full Time (Ten payments of $400)' : formData.financialConsent.tuitionProgram,
        'Special Notes': formData.financialConsent.specialNotes || 'None',
        'PreK8 Curriculum': formatYesNoField(
          formData.financialConsent.curriculumPaymentPrek8Annual || 
          formData.financialConsent.curriculumPaymentPrek8Split
        ),
        'HighSchool Curriculum': formatYesNoField(
          formData.financialConsent.curriculumPayment912Annual || 
          formData.financialConsent.curriculumPayment912Split
        ),
        'Supply Fee': formatBooleanField(formData.financialConsent.supplyFee),
        'Sports Fee': formatBooleanField(formData.financialConsent.sportsFee),
        'Draft Date': formData.financialConsent.draftDate || 'Not specified',
        'Financial Terms': formatBooleanField(formData.financialConsent.agreeToTerms),
        
        // Additional Information
        'Enrollment Reasons': formData.additionalInfo.reasonForEnrolling || 'N/A',
        'Skills Talents': formData.additionalInfo.specialSkills || 'N/A',
        'Parent Contribution': formData.additionalInfo.parentContribution || 'N/A',
        'Expelled Status': formatYesNoField(formData.additionalInfo.hasBeenExpelled),
        'Independent Function': formatYesNoField(formData.additionalInfo.functionIndependently),
        'Attention Span': formData.additionalInfo.attentionSpan || 'N/A',
        
        // Agreements
        'Photo Release': formatBooleanField(formData.agreements.photoRelease),
        'Parent Commitment': formatBooleanField(formData.agreements.parentCommitment),
        'Has Cell Phone': formatYesNoField(formData.agreements.cellPhoneRegistration.hasPhone),
        'Cell Phone Number': formatNumberField(formData.agreements.cellPhoneRegistration.phoneNumber),
        'Phone Make': formData.agreements.cellPhoneRegistration.make || 'N/A',
        'Phone Model': formData.agreements.cellPhoneRegistration.model || 'N/A',
        'Phone Color': formData.agreements.cellPhoneRegistration.color || 'N/A',
        'Phone Identifiers': formData.agreements.cellPhoneRegistration.identifyingFactors || 'N/A',
        
        // Payment Information
        'Payment Method': paymentMethod || '',
        'Application Fee': formatNumberField('20.00'),
        'Registration Fee': formatNumberField('100.00'),
        'Total Paid': formatNumberField(paymentMethod === 'card' ? '123.00' : '120.00'),
        
        // Submission Details
        'Submission Date': new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
        'Status': 'Submitted'
      }
    };
    
    // Remove null values from the fields object
    Object.keys(airtableData.fields).forEach(key => {
      if (airtableData.fields[key] === null) {
        delete airtableData.fields[key];
      }
    });
    
    console.log('Submitting data to Airtable:', airtableData);
    
    // Create a record using the Airtable client
    return new Promise((resolve, reject) => {
      base(AIRTABLE_TABLE_NAME).create([airtableData], (err, records) => {
        if (err) {
          console.error('Error submitting to Airtable:', err);
          return reject(err);
        }
        
        console.log('Application submitted to Airtable successfully:', records);
        return resolve(records);
      });
    });
  } catch (error) {
    console.error('Error in submitToAirtable function:', error);
    throw error;
  }
};

/**
 * Retrieves all applications from Airtable
 * @returns {Promise} - Promise resolving to the Airtable records
 */
export const getApplicationsFromAirtable = async () => {
  return new Promise((resolve, reject) => {
    const records = [];
    
    base(AIRTABLE_TABLE_NAME)
      .select({
        maxRecords: 100,
        view: 'Grid view'
      })
      .eachPage(
        function page(pageRecords, fetchNextPage) {
          records.push(...pageRecords);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error('Error retrieving applications from Airtable:', err);
            return reject(err);
          }
          
          console.log('Retrieved applications from Airtable:', records);
          return resolve(records);
        }
      );
  });
};

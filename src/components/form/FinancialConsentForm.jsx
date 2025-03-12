import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const FinancialConsentForm = () => {
  const { formData, updateFormData } = useFormContext();
  const { financialConsent, studentInfo } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData('financialConsent', { 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kairos Christian Academy Financial Agreement Form</h2>
      <p className="text-gray-600 mb-4">School Year 2025-2026</p>
      
      <div className="mb-6">
        <p className="font-medium">Student Information:</p>
        <p className="text-gray-700">{`${studentInfo.firstName} ${studentInfo.lastName}`}</p>
        <p className="text-gray-700">Date of Birth: {studentInfo.dateOfBirth}</p>
      </div>
      
      <div className="mb-6">
        <p className="font-medium">Parent Information:</p>
        <p className="text-gray-700">Name: {formData.parentInfo.primaryGuardian.firstName} {formData.parentInfo.primaryGuardian.lastName}</p>
        <p className="text-gray-700">Email: {formData.parentInfo.primaryGuardian.email}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Registration Fee</h3>
        <p className="text-gray-700">Registration Fee: $100 (Non-refundable, due upon enrollment)</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Tuition Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <input
                type="radio"
                id="program-ft"
                name="tuitionProgram"
                value="ft"
                checked={financialConsent.tuitionProgram === 'ft'}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="program-ft" className="cursor-pointer">
                <div className="font-bold">FT - Full Time</div>
                <div className="text-sm text-gray-600">Monday-Friday</div>
                <div className="text-sm font-medium mt-2">Ten payments of $400</div>
                <div className="text-xs text-gray-500">Due the first of the Month</div>
              </label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <input
                type="radio"
                id="program-hp2"
                name="tuitionProgram"
                value="hp2"
                checked={financialConsent.tuitionProgram === 'hp2'}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="program-hp2" className="cursor-pointer">
                <div className="font-bold">HP2 - Home School Program 2</div>
                <div className="text-sm text-gray-600">Tuesday-Thursday</div>
                <div className="text-sm font-medium mt-2">Ten payments of $260</div>
                <div className="text-xs text-gray-500">Due the first of the Month</div>
              </label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <input
                type="radio"
                id="program-hp1"
                name="tuitionProgram"
                value="hp1"
                checked={financialConsent.tuitionProgram === 'hp1'}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="program-hp1" className="cursor-pointer">
                <div className="font-bold">HP1 - Home School Program 1</div>
                <div className="text-sm text-gray-600">Tuesday & Thursday</div>
                <div className="text-sm font-medium mt-2">Ten payments of $200</div>
                <div className="text-xs text-gray-500">Due the first of the Month</div>
              </label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <input
                type="radio"
                id="program-ldft"
                name="tuitionProgram"
                value="ldft"
                checked={financialConsent.tuitionProgram === 'ldft'}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="program-ldft" className="cursor-pointer">
                <div className="font-bold">LDFT - Learning Differences Full Time</div>
                <div className="text-sm text-gray-600">Monday-Friday</div>
                <div className="text-sm font-medium mt-2">Ten payments of $575</div>
                <div className="text-xs text-gray-500">Due the first of the Month</div>
              </label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <input
                type="radio"
                id="program-ld2"
                name="tuitionProgram"
                value="ld2"
                checked={financialConsent.tuitionProgram === 'ld2'}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="program-ld2" className="cursor-pointer">
                <div className="font-bold">LD2 - Learning Differences 2</div>
                <div className="text-sm text-gray-600">3 Days a Week</div>
                <div className="text-sm font-medium mt-2">Ten payments of $365</div>
                <div className="text-xs text-gray-500">Due the first of the Month</div>
              </label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <input
                type="radio"
                id="program-ld1"
                name="tuitionProgram"
                value="ld1"
                checked={financialConsent.tuitionProgram === 'ld1'}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="program-ld1" className="cursor-pointer">
                <div className="font-bold">LD1 - Learning Differences 1</div>
                <div className="text-sm text-gray-600">2 Days a Week</div>
                <div className="text-sm font-medium mt-2">Ten payments of $275</div>
                <div className="text-xs text-gray-500">Due the first of the Month</div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Special Notes</h3>
        <textarea
          name="specialNotes"
          value={financialConsent.specialNotes || ''}
          onChange={handleChange}
          className="form-textarea w-full"
          rows="3"
          placeholder="Enter any special notes or arrangements here"
        ></textarea>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Curriculum Payment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Pre K-8</h4>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="curriculum-prek8-annual"
                name="curriculumPaymentPrek8"
                value="annual"
                checked={financialConsent.curriculumPaymentPrek8 === 'annual'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="curriculum-annually"  className="cursor-pointer">
                <div className="font-medium">Annually: $300</div>
                <div className="text-sm text-gray-600">Due July 10th</div>
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="curriculum-prek8-split"
                name="curriculumPaymentPrek8"
                value="split"
                checked={financialConsent.curriculumPaymentPrek8 === 'split'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="curriculum-prek8-split" className="cursor-pointer">
                <div className="font-medium">Split Payment</div>
                <div className="text-sm text-gray-600">$150 due July 10th</div>
                <div className="text-sm text-gray-600">$150 due November 10th</div>
              </label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">9-12th Grade</h4>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="curriculum-9-12-annual"
                name="curriculumPayment912"
                value="annual"
                checked={financialConsent.curriculumPayment912 === 'annual'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="curriculum-9-12-annual" className="cursor-pointer">
                <div className="font-medium">Annually: $325</div>
                <div className="text-sm text-gray-600">Due July 10th</div>
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="curriculum-9-12-split"
                name="curriculumPayment912"
                value="split"
                checked={financialConsent.curriculumPayment912 === 'split'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="curriculum-9-12-split" className="cursor-pointer">
                <div className="font-medium">Split Payment</div>
                <div className="text-sm text-gray-600">$150 due July 10th</div>
                <div className="text-sm text-gray-600">$175 due November 10th</div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Additional Fees</h3>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="supplyFee"
              name="supplyFee"
              checked={financialConsent.supplyFee}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="supplyFee" className="cursor-pointer">
              <div className="font-medium">Supply Fee: $50</div>
              <div className="text-sm text-gray-600">Due by the first day of class</div>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="sportsFee"
              name="sportsFee"
              checked={financialConsent.sportsFee}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="sportsFee" className="cursor-pointer">
              <div className="font-medium">Sports Fee: $60</div>
              <div className="text-sm text-gray-600">Due at the beginning of the season</div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Payment Policies</h3>
        
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Fundraiser Buyout:</strong> Fundraiser Participation is required. If you choose not to participate in a fundraiser there will be a $150 buyout charge for Each of the Two Fundraisers you do not participate in PER child.
          </p>
          
          <p className="text-sm text-gray-700 mb-2">
            <strong>Staffing:</strong> Staffing is based on children enrolled, therefore once registered you are bound to pay the tuition for the entire semester that the withdrawal date falls in.
          </p>
          
          <p className="text-sm text-gray-700 mb-2">
            <strong>Late Charge:</strong> Tuition payment not made by the 10th of each month will be considered late. There could be a $25.00 late charge added on the 11th.
          </p>
          
          <p className="text-sm text-gray-700 mb-2">
            <strong>Suspension for nonpayment:</strong> If the tuition payment or arrangements are not made by the 15th of the month, the student could be suspended from all school activities until all past due accounts are paid in full.
          </p>
          
          <p className="text-sm text-gray-700">
            <strong>Automatic Bank Account Draft:</strong> Payments made through Automatic Bank Account Draft will draft the current balance on the account on the first day of the month, unless another date is specified in writing on this form.
          </p>
        </div>
        
        <div className="mb-4">
          <label className="form-label" htmlFor="draftDate">Preferred date of draft (if applicable):</label>
          <input
            type="text"
            id="draftDate"
            name="draftDate"
            value={financialConsent.draftDate || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 1st, 5th"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={financialConsent.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
              I have read and agree to the financial terms and policies of Kairos Christian Academy.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialConsentForm;

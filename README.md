```markdown
# KCA Forms Enrollment: Connecting Airtable and Stripe

This project, "KCA Forms Enrollment," is a web application designed to streamline the student enrollment process for KCA (presumably "Kids Christian Academy" or similar). It provides a user-friendly, multi-step form that collects necessary student and parent information, manages schooling options, and handles financial consent and payment processing.  The core functionality aims to connect Airtable for data storage and Stripe for secure payment processing.

## Problem Solved

This application addresses the need for a modern, efficient, and integrated enrollment system.  It replaces potentially cumbersome paper-based processes with a digital solution that:

*   **Simplifies Data Collection:**  Gathers all required enrollment information through a structured online form.
*   **Automates Data Storage:**  Seamlessly stores collected data in Airtable for easy access and management.
*   **Facilitates Secure Payments:**  Integrates with Stripe to securely process enrollment fees and other payments.
*   **Improves User Experience:** Provides a clear and intuitive enrollment experience for parents and guardians.

## Setup Instructions

Follow these steps to set up the KCA Forms Enrollment application:

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd kca-forms-enrollment
    ```

2.  **Install Dependencies:**

    This project uses Vite, React, Tailwind CSS, and likely other dependencies. Install them using npm or yarn:

    ```bash
    npm install  # or yarn install
    ```

3.  **Environment Variables:**

    This application requires several environment variables to connect to Airtable and Stripe. Create a `.env` file in the root directory of the project and add the following variables (replace the placeholders with your actual credentials):

    ```
    VITE_AIRTABLE_API_KEY=<your_airtable_api_key>
    VITE_AIRTABLE_BASE_ID=<your_airtable_base_id>
    VITE_AIRTABLE_TABLE_NAME=<your_airtable_table_name>  # e.g., "EnrollmentSubmissions"
    VITE_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
    VITE_STRIPE_SECRET_KEY=<your_stripe_secret_key> # Only needed for server-side operations, if any
    ```

    **Important Security Note:**  Never commit your `.env` file to version control.  Add it to your `.gitignore` file.  The `VITE_STRIPE_SECRET_KEY` should ideally only be used on a secure backend server, not directly in the client-side code.

4.  **Airtable Setup:**

    *   Create an Airtable base to store enrollment data.
    *   Create a table within the base with appropriate columns to match the data collected by the form (e.g., Student Name, Parent Name, Address, Schooling Options, etc.).
    *   Ensure the `VITE_AIRTABLE_TABLE_NAME` environment variable matches the name of your Airtable table.

5.  **Stripe Setup:**

    *   Create a Stripe account (if you don't already have one).
    *   Obtain your Stripe Publishable Key and Secret Key from the Stripe dashboard.
    *   Configure your Stripe webhooks (if needed) to handle payment confirmations and other events.  This is crucial for ensuring payments are properly processed and recorded.

6.  **Run the Application:**

    ```bash
    npm run dev  # or yarn dev
    ```

    This will start the Vite development server, and you can access the application in your browser (usually at `http://localhost:5173`).

## Usage Examples

Here are some examples of how the application is used:

*   **Submitting an Enrollment Form:**  A parent or guardian navigates to the application, fills out the multi-step form with student and parent information, selects schooling options, provides medical and religious information, agrees to the terms and conditions, and provides financial consent.
*   **Making a Payment:**  After completing the form, the user is directed to the payment page, where they can securely enter their credit card information through the Stripe integration to pay the enrollment fee.
*   **Data Storage in Airtable:**  Upon successful form submission and payment (if applicable), the collected data is automatically stored in the specified Airtable table.
*   **Admin Access (Potentially):** While not explicitly mentioned in the file list, there might be an admin interface (or planned functionality) to view and manage enrollment data stored in Airtable.

## Notable Features and Components

*   **Multi-Step Form:** The application features a well-structured multi-step form, broken down into logical sections:
    *   `StudentInfoForm.jsx`
    *   `ParentInfoForm.jsx`
    *   `SchoolingOptionsForm.jsx`
    *   `ReligiousInfoForm.jsx`
    *   `MedicalInfoForm.jsx`
    *   `AdditionalInfoForm.jsx`
    *   `AgreementsForm.jsx`
    *   `FinancialConsentForm.jsx`
*   **Progress Bar:**  The `ProgressBar.jsx` component provides visual feedback to the user, indicating their progress through the enrollment form.
*   **Form Navigation:** The `FormNavigation.jsx` component allows users to easily navigate between different sections of the form.
*   **Payment Integration:** The `PaymentForm.jsx` component handles the integration with Stripe for secure payment processing.
*   **Context Management:** The `FormContext.jsx` likely manages the state of the form data across different components, ensuring data consistency.
*   **Data Persistence (Potentially):** The `src/utils/storage.js` file suggests that the application might be using local storage to persist form data, allowing users to resume filling out the form later.
*   **Tailwind CSS:** The project uses Tailwind CSS for styling, providing a consistent and customizable design.

## Troubleshooting

If you encounter issues while setting up or using the application, consider the following:

*   **Environment Variables:** Double-check that all required environment variables are correctly set in the `.env` file.  Incorrect API keys or base IDs will prevent the application from connecting to Airtable and Stripe.
*   **CORS Issues:** If you are experiencing CORS (Cross-Origin Resource Sharing) errors when making requests to Airtable or Stripe, ensure that your server is configured to allow requests from your application's origin.  This is especially important if you are running the application on a different domain than the Airtable or Stripe APIs.
*   **Stripe Webhooks:**  Verify that your Stripe webhooks are properly configured to handle payment confirmations and other events.  Incorrectly configured webhooks can lead to payments not being recorded correctly.
*   **Airtable Schema:** Ensure that the columns in your Airtable table match the data being submitted by the form
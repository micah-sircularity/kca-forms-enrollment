# Airtable Setup Instructions

This document provides instructions on how to set up your Airtable base to work with the Kairos Christian Academy enrollment application.

## Airtable Configuration Details

The application is already configured with the following Airtable details:

- **Base ID**: `appHu72S89CQABPKJ`
- **Table ID**: `tblrUYlWuZ5gGxYcT` (New Enrollment table)
- **API Key**: Already configured in the application

## Accessing Your Airtable Base

1. Go to [Airtable](https://airtable.com/) and sign in with the account that has access to the base
2. Navigate to the base with ID `appHu72S89CQABPKJ`
3. You should see the "New Enrollment" table where application data will be stored

## Field Configuration

The application is set up to send the following data to Airtable:

- Student Information (name, DOB, grade, gender)
- Parent/Guardian Information (name, email, phone, address)
- Emergency Contact Information
- Payment Information
- Submission Details

## Testing Your Integration

1. Fill out and submit an application form in the application
2. Check your Airtable base to verify that the data was submitted correctly to the "New Enrollment" table

## Viewing Applications in Airtable

Airtable provides a user-friendly interface for viewing and managing applications:

1. You can sort applications by any field by clicking on the column header
2. You can filter applications using the "Filter" button
3. You can create different views (Grid, Calendar, Kanban, etc.) to visualize your data
4. You can share view-only access with other staff members

## Exporting Data from Airtable

To export data from Airtable:

1. Click on "View" in the top right
2. Select "Download CSV"
3. This will download all visible records as a CSV file that can be opened in Excel or Google Sheets

## Modifying Field Names

One advantage of using field IDs in the API integration is that you can freely rename fields in the Airtable interface without breaking the integration. This gives you flexibility to customize how the data appears in Airtable for your team. 
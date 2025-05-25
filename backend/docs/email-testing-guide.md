# Testing Google OAuth Email Integration

This guide provides step-by-step instructions for testing your Google OAuth email integration in the Restaurant Hub application.

## Prerequisites

- Google OAuth setup completed successfully (as per `google-oauth-setup.md`)
- Environment variables properly configured in your `.env` file
- Backend server running

## Testing Methods

### Method 1: Using the Admin Email Test Endpoint

The system includes a dedicated test endpoint for verifying email configuration:

1. **Start the backend server**

   ```bash
   npm run dev
   ```

2. **Authenticate as an admin user** (needed for the test endpoint)

   - Login via your application frontend, or
   - Use a tool like Postman to get a valid auth token

3. **Test the email connection**

   ```bash
   curl -X GET "http://localhost:3001/api/admin/system/test-email" \
     -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
     -H "Content-Type: application/json"
   ```

   Expected success response:

   ```json
   {
     "status": "success",
     "message": "Email connection successful. Your configuration is working."
   }
   ```

### Method 2: Testing with Real Email Verification Flow

1. **Register a new test user**

   ```bash
   curl -X POST "http://localhost:3001/api/users/register" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "Test123!@#",
       "firstName": "Test",
       "lastName": "User",
       "privacyConsent": true
     }'
   ```

2. **Check your email client** for the verification email

   - This tests both the OAuth connection and the email template rendering

3. **Click the verification link** in the email to verify it works properly

### Method 3: Testing Password Reset Flow

1. **Request a password reset**

   ```bash
   curl -X POST "http://localhost:3001/api/auth/password/reset-request" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "your-test-account@example.com"
     }'
   ```

2. **Check your email client** for the password reset email

   - The email should contain a reset link

3. **Test the reset link** to ensure it properly redirects to your frontend

## Troubleshooting Common Issues

### Email Not Sending

If your email tests are failing, check these common issues:

1. **Verify Environment Variables**

   - Double-check your `.env` file has the correct values:
     ```
     EMAIL_ADDRESS=your-gmail@gmail.com
     ClientID=your-client-id
     Clientsecret=your-client-secret
     EMAIL_REFRESH_TOKEN=your-refresh-token
     ```

2. **Check OAuth Token Expiration**

   - Refresh tokens can expire after a period of inactivity
   - If expired, regenerate following Step 5 in the OAuth setup guide

3. **Enable Debug Logging**

   - Add this code to temporarily enable detailed Nodemailer debugging:

   ```typescript
   // Add to email.utils.ts when troubleshooting
   const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       // ...your auth config
     },
     debug: true, // Enable debug logs
     logger: true, // Enable logger
   });
   ```

4. **Check Google Security Settings**

   - Verify that your Google account hasn't flagged the authentication as suspicious
   - Check for any security alerts in your Gmail account

5. **Verify Scopes**
   - Ensure you've enabled the correct scopes:
     - `https://mail.google.com/`
     - `https://www.googleapis.com/auth/gmail.send`

### Testing in Production Environment

When testing in production:

1. **Use a real user email** that you have access to
2. **Check SPF and DKIM records** if using a custom domain
3. **Monitor email deliverability** to ensure emails aren't marked as spam

## Verifying Email Templates

To visually verify your email templates without sending actual emails:

1. **Generate template HTML**:

   ```typescript
   import {
     getVerificationEmailTemplate,
     getPasswordResetEmailTemplate,
   } from "../src/utils/email.utils";

   // Generate sample verification email
   const verificationHTML = getVerificationEmailTemplate(
     "Test User",
     "https://example.com/verify"
   );

   // Write to a file for viewing
   const fs = require("fs");
   fs.writeFileSync("verification-sample.html", verificationHTML);
   ```

2. **Open the generated HTML file** in your browser to visually inspect it

## Setting Up Regular Email Tests

For continuous monitoring:

1. **Create a health check script** that runs periodically
2. **Configure monitoring alerts** if email sending fails
3. **Include email tests** in your CI/CD pipeline

## Additional Notes

- **Gmail Sending Limits**: Remember that Gmail has sending limits (500 emails/day for free accounts)
- **Rate Limiting**: Implement rate limiting on registration and password reset endpoints
- **Email Analytics**: Consider adding tracking to monitor open and click rates

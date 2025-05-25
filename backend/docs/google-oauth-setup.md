# Google OAuth Setup for Email Verification

This guide explains how to set up Google OAuth 2.0 for sending emails through nodemailer in your Restaurant Hub application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on "Select a project" at the top of the page, then click "New Project"
4. Enter a project name (e.g., "Restaurant Hub") and click "Create"
5. Wait for the project to be created, then select it

## Step 2: Enable the Gmail API

1. In the Google Cloud Console dashboard, go to "APIs & Services" > "Library"
2. Search for "Gmail API" and click on it
3. Click "Enable" to enable the Gmail API for your project

## Step 3: Configure the OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" as the user type (unless you have a Google Workspace account) and click "Create"
3. Fill in the required application information:
   - App name: "Restaurant Hub"
   - User support email: Your email address
   - Developer contact information: Your email address
4. Click "Save and Continue"
5. On the Scopes screen, click "Add or Remove Scopes"
6. Add the following scopes:
   - `https://mail.google.com/`
   - `https://www.googleapis.com/auth/gmail.send`
7. Click "Save and Continue"
8. Add any test users (including your own email) and click "Save and Continue"
9. Review your settings and click "Back to Dashboard"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. For Application type, select "Web application"
4. Name: "Restaurant Hub Email Service"
5. Add authorized redirect URIs:
   - `https://developers.google.com/oauthplayground` (for getting the refresh token)
   - Your application's frontend URL (for production use)
6. Click "Create"
7. Note the generated **Client ID** and **Client Secret**

## Step 5: Get the Refresh Token

1. Go to the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the upper right corner
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from the previous step
5. Close the settings panel
6. In the left panel, select "Gmail API v1" and check:
   - `https://mail.google.com/`
   - `https://www.googleapis.com/auth/gmail.send`
7. Click "Authorize APIs"
8. Sign in with the Google account you want to use for sending emails
9. Grant the requested permissions
10. On the next screen, click "Exchange authorization code for tokens"
11. Note the **Refresh Token** from the response

## Step 6: Update Environment Variables

Add the following to your `.env` file:

```properties
# Email configuration
EMAIL_ADDRESS=your-gmail@gmail.com
EMAIL_PASSWORD='your-app-password'  # Only needed as fallback

# OAuth2 for Gmail
ClientID='your-client-id'
Clientsecret='your-client-secret'
EMAIL_REFRESH_TOKEN='your-refresh-token'
```

## Step 7: Allow Less Secure Apps (If Using Password Authentication as Fallback)

If you're using the password authentication fallback option:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Go to "Security" > "Less secure app access" or "App passwords"
3. Enable "Less secure app access" or generate an App Password
4. Use this password in your `.env` file

## Important Notes

1. **For Production:** When your app goes into production, you'll need to:

   - Verify your OAuth consent screen to remove the "Unverified App" warning
   - Add your production domains to the authorized redirect URIs

2. **Refresh Token Expiration:** Refresh tokens might expire if not used for 6 months. If this happens, you'll need to repeat Step 5 to get a new refresh token.

3. **Rate Limits:** Gmail API has sending limits:
   - Free Gmail accounts: 500 emails per day
   - Google Workspace accounts: 2,000 emails per day

For production applications with high email volume, consider using a dedicated email service like SendGrid, Mailgun, or Amazon SES.

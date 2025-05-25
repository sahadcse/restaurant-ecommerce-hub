import nodemailer from "nodemailer";
import { google } from "googleapis";
import logger from "./logger";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Email configuration
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const CLIENT_ID = process.env.ClientID;
const CLIENT_SECRET = process.env.Clientsecret;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;

/**
 * Create and configure nodemailer transport
 * @returns Nodemailer transporter
 */
const createTransport = async () => {
  try {
    // If using OAuth2 with Gmail
    if (CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN) {
      const OAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );

      OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      // Get the access token and extract just the token string
      const accessTokenResponse = await OAuth2Client.getAccessToken();
      const accessToken =
        accessTokenResponse.token ||
        accessTokenResponse.res?.data?.access_token;

      if (!accessToken) {
        throw new Error("Failed to retrieve access token");
      }

      const transportConfig: SMTPTransport.Options = {
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: EMAIL_ADDRESS,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      };

      return nodemailer.createTransport(transportConfig);
    }

    // Standard SMTP transport with password
    const transportConfig: SMTPTransport.Options = {
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    };

    return nodemailer.createTransport(transportConfig);
  } catch (error) {
    logger.error(
      `Failed to create email transport: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    throw error;
  }
};

/**
 * Send email using nodemailer
 * @param to Email recipient
 * @param subject Email subject
 * @param html Email HTML content
 * @param text Plain text version (fallback)
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<boolean> => {
  try {
    // Create transporter
    const transporter = await createTransport();

    // Send email
    const info = await transporter.sendMail({
      from: `Restaurant Hub <${EMAIL_ADDRESS}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML tags for plain text
      html,
    });

    logger.info(`Email sent: ${info.messageId} to ${to}`);
    return true;
  } catch (error) {
    logger.error(
      `Failed to send email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return false;
  }
};

/**
 * Test email configuration and connection
 * Useful for diagnostics during setup
 * @returns Boolean indicating success and any error message
 */
export const testEmailConnection = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    // Create transporter
    const transporter = await createTransport();

    // Test connection
    await transporter.verify();

    return {
      success: true,
      message: "Email connection successful. Your configuration is working.",
    };
  } catch (error) {
    logger.error(
      `Email configuration test failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    // Provide helpful error messages based on common issues
    let message = `Failed to connect: ${
      error instanceof Error ? error.message : String(error)
    }`;

    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        message =
          "Authentication failed. Check your email address and password or OAuth credentials.";
      } else if (error.message.includes("Invalid OAuth")) {
        message =
          "OAuth authentication failed. Verify your Client ID, Client Secret, and Refresh Token.";
      } else if (error.message.includes("certificate")) {
        message =
          "SSL certificate verification failed. Check your network settings or proxy configuration.";
      }
    }

    return { success: false, message };
  }
};

/**
 * Template for account verification email
 */
export const getVerificationEmailTemplate = (
  userName: string,
  verificationLink: string
): string => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #333;">Verify Your Email</h1>
    </div>
    <div style="margin-bottom: 30px;">
      <p>Hello ${userName},</p>
      <p>Thank you for registering with Restaurant Hub. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
      </div>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account with us, please ignore this email or contact our support team.</p>
    </div>
    <div style="border-top: 1px solid #e1e1e1; padding-top: 20px; color: #777; font-size: 12px;">
      <p>If the button doesn't work, copy and paste this link into your browser: ${verificationLink}</p>
      <p>&copy; ${new Date().getFullYear()} Restaurant Hub. All rights reserved.</p>
    </div>
  </div>
  `;
};

/**
 * Template for password reset email
 */
export const getPasswordResetEmailTemplate = (
  userName: string,
  resetLink: string
): string => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #333;">Reset Your Password</h1>
    </div>
    <div style="margin-bottom: 30px;">
      <p>Hello ${userName},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #2196F3; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>
    </div>
    <div style="border-top: 1px solid #e1e1e1; padding-top: 20px; color: #777; font-size: 12px;">
      <p>If the button doesn't work, copy and paste this link into your browser: ${resetLink}</p>
      <p>&copy; ${new Date().getFullYear()} Restaurant Hub. All rights reserved.</p>
    </div>
  </div>
  `;
};

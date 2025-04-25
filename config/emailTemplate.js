export const EMAIL_VERIF_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your Verification Code</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      background-color: #f3f4f6;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 40px 15px;
      background-color: #f3f4f6;
    }

    .main {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }

    .header {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
      text-align: center;
      padding: 40px 30px 30px;
    }

    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
    }

    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.9);
    }

    .content {
      padding: 30px;
      color: #374151;
      font-size: 16px;
      line-height: 1.6;
    }

    .greeting {
      margin-bottom: 15px;
    }

    .message {
      margin-bottom: 20px;
      color: #4b5563;
    }

    .otp-container {
      text-align: center;
      margin: 30px 0 10px;
    }

    .otp-code {
      display: inline-block;
      padding: 18px 32px;
      background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
      font-size: 30px;
      font-weight: bold;
      color: #1e293b;
      letter-spacing: 8px;
      border-radius: 14px;
      font-family: 'Courier New', monospace;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.05);
    }

    .icon-container {
      text-align: center;
      margin-bottom: 20px;
    }

    .icon-container img {
      width: 48px;
      height: 48px;
    }

    .expiry-note {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin-top: 12px;
    }

    .security-note {
      margin-top: 25px;
      background-color: #f9fafb;
      border-left: 4px solid #6366f1;
      padding: 15px 20px;
      font-size: 14px;
      color: #6b7280;
      border-radius: 8px;
    }

    .footer {
      text-align: center;
      padding: 25px 20px;
      font-size: 13px;
      color: #9ca3af;
      background-color: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .footer a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }

    .social-links {
      margin: 15px 0;
    }

    .social-icon {
      display: inline-block;
      margin: 0 6px;
      color: #d1d5db;
      font-size: 18px;
    }

    @media screen and (max-width: 600px) {
      .main {
        width: 100%;
        border-radius: 0;
      }

      .otp-code {
        font-size: 24px;
        letter-spacing: 6px;
        padding: 16px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main" cellpadding="0" cellspacing="0" border="0">
      <!-- Header -->
      <tr>
        <td class="header">
          <h1>Verify Your Account</h1>
          <p>Use the code below to complete your verification</p>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td class="content">
          <p class="greeting">Hello,</p>
          <p class="message">
            Thank you for signing up. Please use the following 6-digit verification code to continue:
          </p>

          <div class="icon-container">
            <img src="/api/placeholder/48/48" alt="Security Icon" />
          </div>

          <div class="otp-container">
            <div class="otp-code">{{otp}}</div>
          </div>

          <p class="expiry-note">This code will expire in 30 minutes.</p>

          <p class="message">
            If you didn’t request this, please ignore this email or contact our support team if you suspect suspicious activity.
          </p>

          <div class="security-note">
            For your security, never share this code with anyone. Our team will never ask for your code.
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td class="footer">
          <p>Need help? <a href="#">Contact Support</a></p>
          <div class="social-links">
            <span class="social-icon">🔵</span>
            <span class="social-icon">🔷</span>
            <span class="social-icon">🔘</span>
          </div>
          <p>© 2025 RISEBLOG. All rights reserved.<br />
          RISEBLOG TEAM</p>
          <p>This is an automated message, please do not reply.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`


export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Code</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', 'Segoe UI', sans-serif;
      background-color: #f8fafc;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: #334155;
    }

    .container {
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      max-width: 550px;
      width: 100%;
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      padding: 35px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
      z-index: 1;
    }

    .header-content {
      position: relative;
      z-index: 2;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .logo {
      height: 60px;
      max-width: 180px;
      object-fit: contain;
    }

    h1 {
      color: white;
      font-size: 24px;
      font-weight: 600;
      margin: 10px 0;
    }

    .header p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 16px;
      line-height: 1.6;
      max-width: 400px;
      margin: 0 auto;
    }

    .body-content {
      padding: 30px 20px;
    }

    .icon {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
    }

    .otp-container {
      display: flex;
      justify-content: center;
      margin: 25px 0;
    }

    .otp-box {
      background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
      border: none;
      border-radius: 14px;
      padding: 20px 25px;
      letter-spacing: 8px;
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), inset 0 -2px 0 rgba(0, 0, 0, 0.08);
    }

    .expiry-info {
      text-align: center;
      background-color: #f1f5f9;
      border-radius: 10px;
      padding: 12px;
      font-size: 15px;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 300px;
      margin: 0 auto;
    }

    .expiry-info svg {
      margin-right: 8px;
      flex-shrink: 0;
    }

    .instructions {
      text-align: center;
      font-size: 15px;
      color: #64748b;
      line-height: 1.6;
      margin-top: 30px;
      background-color: #f8fafc;
      padding: 20px 15px;
      border-radius: 12px;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 25px;
      border-top: 1px solid #e2e8f0;
      font-size: 14px;
      color: #94a3b8;
    }

    .help-text {
      margin-top: 15px;
      font-size: 14px;
    }

    .help-text a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }

    @media (max-width: 480px) {
      .header {
        padding: 25px 15px;
      }

      .logo {
        height: 50px;
      }

      h1 {
        font-size: 22px;
      }

      .header p {
        font-size: 14px;
      }

      .body-content {
        padding: 25px 15px;
      }

      .otp-box {
        padding: 15px 20px;
        font-size: 24px;
        letter-spacing: 6px;
      }

      .expiry-info {
        font-size: 13px;
        padding: 10px;
      }

      .instructions {
        font-size: 13px;
        padding: 15px 12px;
      }

      .footer {
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-content">
        
        <h1>Password Reset Code</h1>
        <p>Use the 6-digit code below to reset your password securely</p>
      </div>
    </div>

    <div class="body-content">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 1v2" />
          <path d="M12 21v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M1 12h2" />
          <path d="M21 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      </div>

      <div class="otp-container">
        <div class="otp-box">{{otp}}</div>
      </div>

      <div class="expiry-info">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Code expires in 10 minutes
      </div>

      <div class="instructions">
        <p>If you didn't request to reset your password, please ignore this message or contact support if you're concerned.</p>
        <div class="help-text">
          Need help? <a href="#">Contact Support</a>
        </div>
      </div>

      <div class="footer">
        © 2025 RISEBLOG. All rights reserved.<br>
        This is an automated message, please do not reply.
      </div>
    </div>
  </div>
</body>
</html>


`
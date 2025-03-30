import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Format current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create beautiful email HTML template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          
          .email-header {
            background: linear-gradient(to right, #16a34a, #15803d);
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          
          .logo {
            margin-bottom: 16px;
          }
          
          .email-title {
            font-size: 22px;
            font-weight: 700;
            margin: 0;
          }
          
          .email-subtitle {
            font-size: 16px;
            font-weight: 400;
            margin: 0;
            opacity: 0.9;
          }
          
          .email-body {
            padding: 30px;
            background-color: #ffffff;
          }
          
          .message-meta {
            margin-bottom: 24px;
            font-size: 14px;
            color: #6b7280;
          }
          
          .message-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
            background-color: #f9fafb;
          }
          
          .sender-info {
            margin-bottom: 20px;
          }
          
          .info-row {
            display: flex;
            margin-bottom: 8px;
          }
          
          .info-label {
            font-weight: 600;
            width: 100px;
            color: #4b5563;
            flex-shrink: 0;
          }
          
          .info-value {
            color: #111827;
          }
          
          .message-content {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
          
          .message-label {
            font-weight: 600;
            color: #4b5563;
            margin-bottom: 12px;
          }
          
          .message-text {
            white-space: pre-line;
            background: white;
            padding: 16px;
            border-radius: 6px;
            border-left: 3px solid #16a34a;
          }
          
          .email-footer {
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          
          .action-button {
            display: inline-block;
            background-color: #16a34a;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 20px;
          }
          
          @media only screen and (max-width: 480px) {
            .email-header, .email-body, .email-footer {
              padding: 20px;
            }
            
            .info-row {
              flex-direction: column;
            }
            
            .info-label {
              width: auto;
              margin-bottom: 4px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="logo" style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">
              Sanghachadwam Foundation
            </div>
            <h1 class="email-title">Inquiry from SF Website</h1>
            <p class="email-subtitle">${name} reached out to you via SF Website</p>
          </div>
          
          <div class="email-body">
            <div class="message-meta">
              Received on ${currentDate}
            </div>
            
            <div class="message-card">
              <div class="sender-info">
                <div class="info-row">
                  <div class="info-label">Name:</div>
                  <div class="info-value">${name}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value">${email}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Phone:</div>
                  <div class="info-value">${phone || 'Not provided'}</div>
                </div>
              </div>
              
              <div class="message-content">
                <div class="message-label">Message:</div>
                <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="mailto:${email}" class="action-button">Reply to ${name}</a>
            </div>
          </div>
          
          <div class="email-footer">
            <p>&copy; ${new Date().getFullYear()} Sanghachadwam Foundation. All rights reserved.</p>
            <p>27, Nehru Nagar, Gokul Road, Hubballi - 580030, Karnataka, India</p>
            <p style="margin-top: 10px; font-size: 11px; color: #6b7280;">
              This email was sent by Sanghachadwam Foundation in response to a contact form submission on our website.
              <br>Our mailing address: 27, Nehru Nagar, Gokul Road, Hubballi - 580030, Karnataka, India
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create email message
    const msg = {
      to: 'info@sfmail.co.in', // From your Contact.tsx
      from: {
        email: 'sandeep@sfmail.co.in', // Verified sender from SendGrid
        name: 'SF-Website'
      },
      replyTo: email, // So replies go to the person who submitted the form
      subject: `Inquiry from SF Website: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Message:
        ${message}
        
        --
        Sanghachadwam Foundation
        27, Nehru Nagar, Gokul Road, Hubballi - 580030, Karnataka, India
      `,
      html: htmlTemplate,
    };

    // Send email
    await sgMail.send(msg);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // More detailed error response
    let errorMessage = 'Failed to send email';
    
    // @ts-expect-error Error response structure from SendGrid
    if (error && error.response && error.response.body) {
      try {
        // @ts-expect-error Error response structure from SendGrid
        console.error('SendGrid API response:', JSON.stringify(error.response.body));
        // @ts-expect-error Error response structure from SendGrid
        errorMessage = `SendGrid Error: ${JSON.stringify(error.response.body)}`;
      } catch (e) {
        console.error('Error parsing SendGrid response:', e);
      }
    } else if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 
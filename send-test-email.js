// SendGrid Test Email Script
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// IMPORTANT: Replace these email addresses!
// The 'from' email MUST be a verified sender in your SendGrid account
const msg = {
  to: 'recipient@example.com', // Change to your recipient
  from: 'sender@example.com', // Change to your verified sender
  subject: 'Test Email from SendGrid',
  text: 'This is a test email sent through SendGrid',
  html: '<strong>This is a test email sent through SendGrid</strong>',
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully');
  })
  .catch((error) => {
    console.error('Error sending email:');
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }); 
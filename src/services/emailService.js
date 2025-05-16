// This is a mock email service. In a real application, you would integrate with a real email service provider
// like SendGrid, AWS SES, or your own SMTP server.

// This would be replaced with actual email service integration in production
const sendEmail = async (to, subject, body) => {
  // Simulating email sending with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Email sent:', { to, subject, body });
  return true;
};

const emailTemplates = {
  companyApproved: (companyName) => ({
    subject: 'Company Registration Approved - Matrix Internship Portal',
    content: `
Dear ${companyName},

We are pleased to inform you that your company registration on the Matrix Internship Portal has been approved. You can now:

• Post internship opportunities
• Review student applications
• Access the company dashboard
• Participate in career events and workshops

To get started, simply log in to your account and explore the available features.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The Matrix Internship Team
    `
  }),

  companyRejected: (companyName, reason = '') => ({
    subject: 'Company Registration Status Update - Matrix Internship Portal',
    content: `
Dear ${companyName},

Thank you for your interest in registering with the Matrix Internship Portal.

After careful review of your application, we regret to inform you that we are unable to approve your registration at this time.${reason ? `\n\nReason: ${reason}` : ''}

If you would like to appeal this decision or submit additional documentation, please contact our support team.

Best regards,
The Matrix Internship Team
    `
  }),

  internshipApplication: (companyName, studentName, position) => ({
    subject: 'New Internship Application - Matrix Internship Portal',
    content: `
Dear ${companyName},

You have received a new internship application from ${studentName} for the ${position} position.

To review this application, please log in to your company dashboard and navigate to the Applications section.

Best regards,
The Matrix Internship Team
    `
  })
};

export const sendCompanyStatusEmail = async (company, status, reason = '') => {
  const subject = status === 'Active' 
    ? 'Company Registration Approved'
    : 'Company Registration Rejected';

  const body = status === 'Active'
    ? `Dear ${company.name},\n\nYour company registration has been approved. You can now start posting internship opportunities on our platform.\n\nBest regards,\nSCAD Office`
    : `Dear ${company.name},\n\nYour company registration has been rejected.\n${reason ? `\nReason: ${reason}` : ''}\n\nIf you have any questions, please contact the SCAD office.\n\nBest regards,\nSCAD Office`;

  try {
    await sendEmail(company.companyEmail, subject, body);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email notification');
  }
};

export const sendInternshipApplicationEmail = async (application, company) => {
  const template = emailTemplates.internshipApplication(
    company.name,
    application.studentName,
    application.position
  );

  try {
    await sendEmail(company.companyEmail, template.subject, template.content);
    return true;
  } catch (error) {
    console.error('Failed to send internship application email:', error);
    throw new Error('Failed to send email notification');
  }
};

export default {
  sendCompanyStatusEmail,
  sendInternshipApplicationEmail
}; 
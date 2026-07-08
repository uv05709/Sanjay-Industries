import createTransporter from '../config/email.js';

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
      text: text || '',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Email send error: ${error.message}`);
    return false;
  }
};

// Notification email templates
export const sendBulkOrderNotification = async (order) => {
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 30px;">
      <div style="background: #5C2E1F; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C89B3C; margin: 0; font-family: 'Cormorant Garamond', serif;">Sanjay Industries</h1>
        <p style="color: #F2ECE2; margin: 5px 0 0;">New Bulk Order Enquiry</p>
      </div>
      <div style="background: white; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #F2ECE2;">
        <h2 style="color: #5C2E1F; margin-top: 0;">New Bulk Order Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #555;">${order.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Company:</td><td style="padding: 8px 0; color: #555;">${order.companyName || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #555;">${order.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #555;">${order.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">City:</td><td style="padding: 8px 0; color: #555;">${order.city}, ${order.state}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Products:</td><td style="padding: 8px 0; color: #555;">${order.products}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Quantity:</td><td style="padding: 8px 0; color: #555;">${order.quantity}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Budget:</td><td style="padding: 8px 0; color: #555;">${order.expectedBudget || 'Not specified'}</td></tr>
        </table>
        ${order.message ? `<p style="color: #555; margin-top: 15px;"><strong style="color: #8B5E3C;">Message:</strong> ${order.message}</p>` : ''}
      </div>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Bulk Order from ${order.name} - ${order.companyName || 'Individual'}`,
    html,
  });
};

export const sendContactNotification = async (contact) => {
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 30px;">
      <div style="background: #5C2E1F; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C89B3C; margin: 0;">Sanjay Industries</h1>
        <p style="color: #F2ECE2; margin: 5px 0 0;">New Contact Message</p>
      </div>
      <div style="background: white; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #F2ECE2;">
        <h2 style="color: #5C2E1F; margin-top: 0;">${contact.subject}</h2>
        <p style="color: #555;"><strong style="color: #8B5E3C;">From:</strong> ${contact.name} (${contact.email})</p>
        ${contact.phone ? `<p style="color: #555;"><strong style="color: #8B5E3C;">Phone:</strong> ${contact.phone}</p>` : ''}
        <p style="color: #555; line-height: 1.6;">${contact.message}</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `Contact: ${contact.subject} - from ${contact.name}`,
    html,
  });
};

export const sendDealerNotification = async (dealer) => {
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 30px;">
      <div style="background: #5C2E1F; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C89B3C; margin: 0;">Sanjay Industries</h1>
        <p style="color: #F2ECE2; margin: 5px 0 0;">New Dealer Registration</p>
      </div>
      <div style="background: white; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #F2ECE2;">
        <h2 style="color: #5C2E1F; margin-top: 0;">New Dealer Application</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #555;">${dealer.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Company:</td><td style="padding: 8px 0; color: #555;">${dealer.companyName}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Business Type:</td><td style="padding: 8px 0; color: #555;">${dealer.businessType}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">City:</td><td style="padding: 8px 0; color: #555;">${dealer.city}, ${dealer.state}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #555;">${dealer.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B5E3C; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #555;">${dealer.email}</td></tr>
        </table>
      </div>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Dealer Application: ${dealer.companyName} - ${dealer.city}`,
    html,
  });
};

export default sendEmail;

import nodemailer from 'nodemailer';

export async function sendReceiptEmail(email: string, pdfBuffer: Buffer): Promise<void> {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
  });

  await transporter.sendMail({
    from: 'your-email@example.com',
    to: email,
    subject: 'Your Receipt',
    text: 'Please find your receipt attached.',
    attachments: [
      {
        filename: 'receipt.pdf',
        content: pdfBuffer,
      },
    ],
  });
}

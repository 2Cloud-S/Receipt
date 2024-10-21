import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';
import { ReceiptData } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generatePDF(receiptData: ReceiptData): Promise<Buffer> {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add company logo
    const logoPath = path.join(__dirname, '..', '..', 'assets', 'company-logo.png');
    let logoImage;
    try {
      const logoFile = await fs.readFile(logoPath);
      logoImage = await pdfDoc.embedPng(logoFile);
    } catch (error) {
      console.error('Error loading logo:', error);
      // Continue without the logo if it fails to load
    }

    if (logoImage) {
      const logoDims = logoImage.scale(0.5);
      page.drawImage(logoImage, {
        x: 50,
        y: height - 100,
        width: logoDims.width,
        height: logoDims.height,
      });
    }

    // Add receipt title
    page.drawText('RECEIPT', {
      x: 250,
      y: height - 50,
      size: 30,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });

    // Add receipt details
    const drawText = (text: string, x: number, y: number, size = 12, isBold = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: isBold ? boldFont : helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
      });
    };

    drawText(`Date: ${new Date(receiptData.date).toLocaleDateString()}`, 400, height - 100);
    drawText(`Customer: ${receiptData.customerName}`, 50, height - 150);

    // Add item table
    drawText('Description', 50, height - 200, 12, true);
    drawText('Qty', 300, height - 200, 12, true);
    drawText('Unit Price', 350, height - 200, 12, true);
    drawText('Total', 500, height - 200, 12, true);

    let yOffset = 230;
    receiptData.items.forEach((item) => {
      drawText(item.description, 50, height - yOffset);
      drawText(item.quantity.toString(), 300, height - yOffset);
      drawText(`$${item.unitPrice.toFixed(2)}`, 350, height - yOffset);
      drawText(`$${(item.quantity * item.unitPrice).toFixed(2)}`, 500, height - yOffset);
      yOffset += 30;
    });

    // Add totals
    yOffset += 20;
    drawText(`Subtotal: $${receiptData.subtotal.toFixed(2)}`, 400, height - yOffset);
    yOffset += 30;
    drawText(`Tax (${(receiptData.taxRate * 100).toFixed(2)}%): $${receiptData.taxAmount.toFixed(2)}`, 400, height - yOffset);
    yOffset += 30;
    drawText(`Total: $${receiptData.total.toFixed(2)}`, 400, height - yOffset, 14, true);

    // Add payment terms
    yOffset += 60;
    drawText('Payment Terms:', 50, height - yOffset, 12, true);
    drawText(receiptData.paymentTerms, 50, height - yOffset - 20);

    // Generate QR Code
    const qrCodeUrl = `https://yourapp.com/receipts/${receiptData.id}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);
    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
    const qrCodeDims = qrCodeImage.scale(0.5);

    page.drawImage(qrCodeImage, {
      x: width - qrCodeDims.width - 50,
      y: 50,
      width: qrCodeDims.width,
      height: qrCodeDims.height,
    });

    // Add QR Code explanation
    drawText('Scan for digital receipt', width - qrCodeDims.width - 50, 30, 10);

    // Add footer
    drawText('Thank you for your business!', 200, 50, 14);

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    console.log('PDF generated, size:', pdfBytes.length);

    console.log('PDF generation completed');
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error in generatePDF:', error);
    throw error;
  }
}

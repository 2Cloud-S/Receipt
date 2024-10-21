import { PDFDocument, rgb } from 'pdf-lib';

interface ReceiptData {
  // Define the structure of your receipt data
  // For example:
  customerName: string;
  date: string;
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  total: number;
}

export async function generatePDF(receiptData: ReceiptData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { height } = page.getSize();
  const fontSize = 30;

  page.drawText('Receipt', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Add more receipt details here
  // For example:
  page.drawText(`Customer: ${receiptData.customerName}`, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize / 2,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

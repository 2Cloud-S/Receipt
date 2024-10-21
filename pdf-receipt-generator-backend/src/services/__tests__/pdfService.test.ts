import { generatePDF } from '../pdfService';
import { ReceiptData } from '../../types';

describe('PDF Service', () => {
  it('should generate a PDF buffer', async () => {
    const receiptData: ReceiptData = {
      id: '1234',
      customerName: 'John Doe',
      date: new Date('2023-04-01'),
      items: [
        { description: 'Item 1', quantity: 2, unitPrice: 10 },
        { description: 'Item 2', quantity: 1, unitPrice: 20 },
      ],
      subtotal: 40,
      taxRate: 0.1,
      taxAmount: 4,
      total: 44,
      paymentTerms: 'Due upon receipt'
    };

    const pdfBuffer = await generatePDF(receiptData);
    expect(Buffer.isBuffer(pdfBuffer)).toBe(true);
    expect(pdfBuffer.length).toBeGreaterThan(0);
  });
});

import { Request, Response } from 'express';
import { generatePDF } from '../services/pdfService.js';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package: npm install uuid @types/uuid
import { ReceiptData } from '../types';

export const createPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }

    const receiptData: Partial<ReceiptData> = {
      ...req.body,
      id: uuidv4(),
    };

    const validatedData: ReceiptData = {
      id: receiptData.id || uuidv4(),
      customerName: receiptData.customerName || '',
      date: new Date(receiptData.date || new Date()),  // Changed this line
      items: Array.isArray(receiptData.items) ? receiptData.items.map(item => ({
        description: String(item.description || ''),
        quantity: Number(item.quantity || 0),
        unitPrice: Number(item.unitPrice || 0)
      })) : [],
      subtotal: Number(receiptData.subtotal || 0),
      taxRate: Number(receiptData.taxRate || 0),
      taxAmount: Number(receiptData.taxAmount || 0),
      total: Number(receiptData.total || 0),
      paymentTerms: receiptData.paymentTerms || 'Due upon receipt'
    };

    console.log('Validated receipt data:', JSON.stringify(validatedData, null, 2));

    const pdfBuffer = await generatePDF(validatedData);
    if (!Buffer.isBuffer(pdfBuffer)) {
      throw new Error('Invalid PDF buffer');
    }
    console.log('PDF generated successfully, buffer length:', pdfBuffer.length);
    res.contentType('application/pdf');
    res.send(pdfBuffer);
    console.log('PDF sent to client');
  } catch (error) {
    console.error('Error in createPDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

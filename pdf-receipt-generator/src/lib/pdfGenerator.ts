import axios from 'axios';
import { ReceiptData } from '../types';

export async function generatePDF(receiptData: ReceiptData): Promise<Buffer> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-pdf`, receiptData, {
      responseType: 'arraybuffer'
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

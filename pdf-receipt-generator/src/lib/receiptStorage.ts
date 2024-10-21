import axios from 'axios';
import { ReceiptData } from '../types';

export async function addReceipt(receiptData: ReceiptData): Promise<void> {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/receipts`, receiptData);
  } catch (error) {
    console.error('Error adding receipt:', error);
    throw new Error('Failed to add receipt');
  }
}

export async function getReceipts(): Promise<ReceiptData[]> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/receipts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching receipts:', error);
    throw new Error('Failed to fetch receipts');
  }
}

export async function getReceiptById(id: string): Promise<ReceiptData> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/receipts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching receipt:', error);
    throw new Error('Failed to fetch receipt');
  }
}

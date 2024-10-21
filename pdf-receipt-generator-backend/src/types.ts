export interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ReceiptData {
  id: string;
  customerName: string;
  date: Date;  // Changed from string to Date
  items: ReceiptItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paymentTerms: string;
}

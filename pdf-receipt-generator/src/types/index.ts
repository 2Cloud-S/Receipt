export interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ReceiptData {
  id?: string;
  customerName: string;
  date: Date;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paymentTerms: string;
  pdfUrl?: string;
  signatureValid?: boolean;
}

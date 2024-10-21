'use client';

import React, { useState } from 'react';
import { ReceiptData } from '../types';

const ReceiptPreview: React.FC<{ receiptData: ReceiptData | null }> = ({ receiptData }) => {
  const [pdfError, setPdfError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePdfError = () => {
    setPdfError("Failed to load PDF. Please try again.");
  };

  if (!receiptData) {
    return <div className="text-center text-gray-500">No receipt data available</div>;
  }

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined ? `$${value.toFixed(2)}` : 'N/A';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Receipt Preview</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Customer:</span> {receiptData.customerName || 'N/A'}</p>
        <p><span className="font-medium">Date:</span> {receiptData.date ? formatDate(receiptData.date) : 'N/A'}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Quantity</th>
                <th className="p-2 text-right">Unit Price</th>
                <th className="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.description}</td>
                  <td className="p-2 text-right">{item.quantity}</td>
                  <td className="p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="p-2 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <p><span className="font-medium">Subtotal:</span> {formatCurrency(receiptData.subtotal)}</p>
          <p><span className="font-medium">Tax ({receiptData.taxRate * 100}%):</span> {formatCurrency(receiptData.taxAmount)}</p>
          <p className="text-lg font-bold"><span className="font-medium">Total:</span> {formatCurrency(receiptData.total)}</p>
        </div>
        <div className="mt-4">
          <p><span className="font-medium">Payment Terms:</span> {receiptData.paymentTerms}</p>
        </div>
        {receiptData.signatureValid && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
            This receipt is digitally signed and verified.
          </div>
        )}
        {receiptData.pdfUrl && (
          <div className="mt-4">
            <a
              href={receiptData.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => setPdfError(null)}
            >
              View PDF
            </a>
            <a
              href={receiptData.pdfUrl}
              download="receipt.pdf"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors ml-2"
              onClick={() => setPdfError(null)}
            >
              Download PDF
            </a>
            {pdfError && <p className="text-red-500 mt-2">{pdfError}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPreview;

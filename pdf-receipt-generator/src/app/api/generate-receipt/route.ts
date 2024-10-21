import { NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdfGenerator';
import { sendReceiptEmail } from '@/lib/emailService';
import { addReceipt } from '@/lib/receiptStorage';
import { generateQRCode } from '@/lib/qrCodeGenerator';

export async function POST(request: Request) {
  try {
    const receiptData = await request.json();
    const pdfBuffer = await generatePDF(receiptData);
    const qrCode = await generateQRCode(receiptData.id);
    
    await sendReceiptEmail(receiptData.email, pdfBuffer);
    await addReceipt(receiptData);

    return NextResponse.json({ success: true, qrCode });
  } catch (error) {
    console.error('Error generating receipt:', error);
    return NextResponse.json({ error: 'Failed to generate receipt' }, { status: 500 });
  }
}

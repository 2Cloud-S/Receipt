import QRCode from 'qrcode';

export async function generateQRCode(receiptId: string) {
  const url = `https://yourapp.com/verify/${receiptId}`;
  return QRCode.toDataURL(url);
}

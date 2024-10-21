import * as forge from 'node-forge';

export function generateKeyPair() {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
  const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
  return { privateKeyPem, publicKeyPem };
}

export async function signPdf(pdfBuffer: Buffer, privateKeyPem: string): Promise<Buffer> {
  // For now, we'll just return the original PDF buffer
  // In the future, we can implement a proper signing mechanism
  console.log('PDF signing skipped. Returning original PDF.');
  return pdfBuffer;
}

export function verifySignature(pdfBuffer: Buffer, signature: string, publicKeyPem: string): boolean {
  const md = forge.md.sha256.create();
  md.update(pdfBuffer.toString('binary'));
  
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const decodedSignature = forge.util.decode64(signature);
  
  return publicKey.verify(md.digest().getBytes(), decodedSignature);
}

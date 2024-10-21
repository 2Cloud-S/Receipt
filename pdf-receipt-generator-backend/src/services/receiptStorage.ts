import { db } from '../config/firebase';
import { DocumentData } from 'firebase-admin/firestore';

export async function addReceipt(receipt: DocumentData) {
  try {
    const docRef = await db.collection('receipts').add(receipt);
    return docRef.id;
  } catch (error) {
    console.error('Error adding receipt: ', error);
    throw error;
  }
}

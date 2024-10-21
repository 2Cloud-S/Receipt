import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../path/to/your/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();


import admin from 'firebase-admin';

export function initAdmin() {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in environment variables.');
  }
  
  if (admin.apps.length > 0) {
    return admin.app();
  }

  try {
    const serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf-8'));
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error);
    throw new Error('Could not initialize Firebase Admin SDK. The service account key might be malformed.');
  }
}

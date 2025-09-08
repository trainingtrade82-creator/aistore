
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, generateEmailVerificationLink } from 'firebase/auth';
import { app } from '@/firebase/clientApp';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const auth = getAuth(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/action`,
      handleCodeInApp: true,
    };
    
    // Generate the verification link using Firebase Admin SDK
    const link = await generateEmailVerificationLink(auth, email, actionCodeSettings);

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'AI Store <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your email for AI Store',
      html: `
        <h1>Welcome to AI Store!</h1>
        <p>Please click the link below to verify your email address and activate your account.</p>
        <a href="${link}" style="background-color: #007bff; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a>
        <p>If you did not create an account, no further action is required.</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json(error);
    }

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Firebase/API Error:', error);
    res.status(500).json({ error: error.message });
  }
}

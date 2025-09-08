
import {NextRequest, NextResponse} from 'next/server';
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const {email, name, link} = await req.json();

    if (!email || !name || !link) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }

    const {data, error} = await resend.emails.send({
      from: 'AI Store <onboarding@resend.dev>', // This must be a verified domain on Resend
      to: [email],
      subject: `Verify your email for AI Store`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${name},</h2>
          <p>Welcome to AI Store! We're excited to have you on board.</p>
          <p>Please click the button below to verify your email address and complete your registration:</p>
          <a href="${link}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          <p>If you did not sign up for an account, you can safely ignore this email.</p>
          <p>Thanks,<br>The AI Store Team</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: 'Email sent successfully'});
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

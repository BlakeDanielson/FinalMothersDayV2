import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    throw new Error('Sentry test error: manual trigger');
  } catch (err) {
    Sentry.captureException(err);
    // Give SDK time to send the event in serverless
    await Sentry.flush(2000);
    return NextResponse.json({ status: 'sent' });
  }
}



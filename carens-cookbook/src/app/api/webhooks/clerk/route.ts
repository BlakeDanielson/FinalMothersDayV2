import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { prisma } from '@/lib/db';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local');
}

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.text();
  const body = JSON.parse(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret as string);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  const { id, email_addresses, first_name, last_name, image_url } = evt.data;

  try {
    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        await prisma.user.upsert({
          where: { id },
          update: {
            email: email_addresses[0]?.email_address || '',
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
          },
          create: {
            id,
            email: email_addresses[0]?.email_address || '',
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
          },
        });
        break;
      
      case 'user.deleted':
        await prisma.user.delete({
          where: { id },
        });
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
} 
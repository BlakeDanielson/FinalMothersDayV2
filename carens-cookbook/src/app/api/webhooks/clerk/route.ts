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

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret as string);

  let evt: { type: string; data: { id: string; email_addresses?: Array<{ email_address: string }>; first_name?: string; last_name?: string; image_url?: string } };

  // Verify the payload with the headers
  try {
    const verifiedEvent = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    evt = verifiedEvent as typeof evt;
  } catch (err: unknown) {
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
        const userEmail = email_addresses?.[0]?.email_address;
        
        // Create user with default categories and onboarding setup
        await prisma.user.create({
          data: {
            id,
            email: userEmail || `temp-${id}@placeholder.local`, // Use temp email if no real email
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
            // Initialize with default categories
            preferredCategories: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'],
            // Initialize onboarding for new users
            onboardingCompleted: false,
            onboardingStep: 0,
          },
        });

        // Log initialization
        console.log(`Initialized new user with onboarding: ${id} (email: ${userEmail || 'none'})`);
        break;

      case 'user.updated':
        const updateUserEmail = email_addresses?.[0]?.email_address;
        await prisma.user.update({
          where: { id },
          data: {
            // Only update email if we have a real email address
            ...(updateUserEmail && { email: updateUserEmail }),
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
  } catch (error: unknown) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
} 
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PerformanceDashboard } from '@/components/admin/PerformanceDashboard';

export default async function PerformancePage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // In a real app, you'd check for admin role here
  // For now, we'll allow any authenticated user
  const isAdmin = true; // Replace with actual admin check

  return (
    <div className="container mx-auto py-8">
      <PerformanceDashboard isAdmin={isAdmin} />
    </div>
  );
} 
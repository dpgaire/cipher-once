import { InboxList } from '@/features/inbox/components/inbox-list';
import { SendMessageButton } from '@/features/inbox/components/send-message-button';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function InboxPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <SendMessageButton />
      </div>
      <InboxList />
    </div>
  );
}

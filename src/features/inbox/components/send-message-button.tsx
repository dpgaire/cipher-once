'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SendMessageDialog } from './send-message-dialog';

export function SendMessageButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Send New Message</Button>
      <SendMessageDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}

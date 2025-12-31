'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

type SendMessageDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SendMessageDialog({ isOpen, onOpenChange }: SendMessageDialogProps) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();

  const handleSend = async () => {
    if (!recipientEmail) {
      toast.error('Please enter a recipient email.');
      return;
    }

    setIsSending(true);

    // 1. Get the current user
    const {
      data: { user: senderUser },
      error: senderError,
    } = await supabase.auth.getUser();

    if (senderError || !senderUser) {
      toast.error('You must be logged in to send a message.');
      setIsSending(false);
      return;
    }

    // 2. Check if the sender has a profile (to prevent foreign key violation)
    const { data: senderProfile, error: senderProfileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', senderUser.id)
      .maybeSingle();

    if (senderProfileError) {
      toast.error('An error occurred while verifying your profile.');
      console.error('Error fetching sender profile:', senderProfileError);
      setIsSending(false);
      return;
    }

    if (!senderProfile) {
      toast.error('Your user profile is not set up correctly. Please contact support.');
      console.error('Sender profile not found for user:', senderUser.id);
      setIsSending(false);
      return;
    }

    // 3. Find the recipient user by email
    const { data: recipientId, error: recipientError } = await supabase.rpc(
      'get_user_id_by_email',
      { p_email: recipientEmail }
    );

    if (recipientError || !recipientId) {
      toast.error('User with that email address not found.');
      console.error(recipientError);
      setIsSending(false);
      return;
    }

    // 4. Insert the message
    const { error: insertError } = await supabase.from('inbox_messages').insert({
      sender_id: senderUser.id,
      recipient_id: recipientId,
      message,
      link,
    });

    if (insertError) {
      toast.error('Failed to send message.');
      console.error(insertError);
    } else {
      toast.success('Message sent successfully!');
      onOpenChange(false);
      // Reset fields
      setRecipientEmail('');
      setMessage('');
      setLink('');
    }
    setIsSending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a New Message</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1  items-center gap-4">
            <Label htmlFor="recipient" className="text-right">
              Recipient Email
            </Label>
            <Input
              id="recipient"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="col-span-3"
              placeholder="user@example.com"
            />
          </div>
          <div className="grid grid-cols-1  items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              placeholder="Your message..."
            />
          </div>
          <div className="grid grid-cols-1  items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="col-span-3"
              placeholder="https://www.cipheronce.com/s/..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSend} disabled={isSending}>
            <Send className='h-4 w-4'/>
            {isSending ? 'Sending message...' : 'Send'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


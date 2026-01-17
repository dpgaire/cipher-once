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
import {
  generateKey,
  encrypt,
  exportKey,
} from '@/features/secrets/services/encryption';

type SendMessageDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SendMessageDialog({ isOpen, onOpenChange }: SendMessageDialogProps) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();

  const handleSend = async () => {
    if (!recipientEmail) {
      toast.error('Please enter a recipient email.');
      return;
    }
    if (!message) {
      toast.error('Please enter a message.');
      return;
    }

    setIsSending(true);

    try {
      // 1. Get the current user
      const {
        data: { user: senderUser },
        error: senderError,
      } = await supabase.auth.getUser();

      if (senderError || !senderUser) {
        throw new Error('You must be logged in to send a message.');
      }

      // 2. Check if the sender has a profile
      const { data: senderProfile, error: senderProfileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', senderUser.id)
        .single();

      if (senderProfileError || !senderProfile) {
        throw new Error('Your user profile is not set up correctly.');
      }

      // 3. Find the recipient user by email
      const { data: recipientId, error: recipientError } = await supabase.rpc(
        'get_user_id_by_email',
        { p_email: recipientEmail }
      );

      if (recipientError || !recipientId) {
        throw new Error('User with that email address not found.');
      }

      // 4. Encrypt the message
      const messageKey = await generateKey();
      const { ciphertext: encryptedMessage, iv: messageIv } = await encrypt(
        message,
        messageKey
      );
      const exportedKey = await exportKey(messageKey);


      // 5. Insert the encrypted message
      const { error: insertError } = await supabase.from('inbox_messages').insert({
        sender_id: senderUser.id,
        recipient_id: recipientId,
        message: encryptedMessage,
        message_encryption_iv: messageIv,
        link: exportedKey,
      });

      if (insertError) {
        throw new Error('Failed to send message.');
      }

      toast.success('Message sent successfully!');
      onOpenChange(false);
      // Reset fields
      setRecipientEmail('');
      setMessage('');
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a New Secure Message</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
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
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              placeholder="Your secure message or link..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSend} disabled={isSending}>
            <Send className='h-4 w-4'/>
            {isSending ? 'Sending message...' : 'Send Securely'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


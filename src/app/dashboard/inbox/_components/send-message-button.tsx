'use client'

import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { SendMessageDialog } from './send-message-dialog'

type SendMessageButtonProps = {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function SendMessageButton({
  isDialogOpen,
  setIsDialogOpen,
}: SendMessageButtonProps) {
  return (
    <>
      <Button  className="cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <Send className="h-4 w-4 mr-2" />
        Send New Message
      </Button>

      <SendMessageDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  )
}

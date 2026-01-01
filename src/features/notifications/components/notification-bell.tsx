'use client';

import { useRouter } from 'next/navigation';
import { Bell, BellRing } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '../hooks';

export function NotificationBell() {
  const { notifications, unreadCount, handleMarkAsRead } = useNotifications();
  const router = useRouter();

  const handleClick = (notification: any) => {
    handleMarkAsRead(notification.id);
    router.push(notification.link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          {unreadCount > 0 ? <BellRing /> : <Bell />}
          {unreadCount > 0 && (
            <Badge
              color="red"
              className="absolute -top-2 -right-2"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            onClick={() => handleClick(notification)}
            className={!notification.is_read ? 'font-bold' : ''}
          >
            <span>{notification.message}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

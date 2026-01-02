"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InboxList } from "@/features/inbox/components/inbox-list";
import { SendMessageButton } from "@/features/inbox/components/send-message-button";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function InboxPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };

    getUser();
  }, [supabase, router]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
    );
  }

  return (
      <Card className="container mx-auto max-w-7xl my-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">Inbox</CardTitle>
          <SendMessageButton isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </CardHeader>

        <CardContent className="p-4">
          <InboxList setIsDialogOpen={setIsDialogOpen} />
        </CardContent>
      </Card>
  );
}

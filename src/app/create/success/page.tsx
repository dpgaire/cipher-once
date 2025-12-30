"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/features/secrets/components/copy-button";
import { QRCodeDisplay } from "@/features/secrets/components/qr-code-display";
import { SocialShareButtons } from "@/features/secrets/components/social-share-buttons";

import { CheckCircle2, AlertTriangle, Share2, Send } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const shortId = searchParams.get("id");
  const key = searchParams.get("key");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showQrCode, setShowQrCode] = useState(true);

  const supabase = createClient();

  // ✅ Get browser origin safely
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  const handleGoToDashboard = () => {
    router.refresh();
    router.push("/dashboard");
  };

  // ✅ Build secret URL only when safe
  const secretUrl = useMemo(() => {
    if (!origin || !shortId || !key) return "";
    return `${origin}/s/${shortId}#${key}`;
  }, [origin, shortId, key]);

  const handleSendToInbox = async () => {
    if (!recipientEmail) {
      toast.error("Please enter a recipient's email address.");
      return;
    }
    setIsSending(true);

    const {
      data: { user: senderUser },
    } = await supabase.auth.getUser();

    if (!senderUser) {
      toast.error("You must be logged in to send a message to an inbox.");
      setIsSending(false);
      return;
    }

    try {
      // 1. Get recipient user
      const { data: recipientId, error: rpcError } = await supabase.rpc(
        "get_user_id_by_email",
        { p_email: recipientEmail }
      );

      if (rpcError || !recipientId) {
        toast.error(
          "User with that email not found. You can only send secrets to registered users."
        );
        return;
      }

      // 2. Insert into inbox
      const { error: insertError } = await supabase
        .from("inbox_messages")
        .insert({
          sender_id: senderUser.id,
          recipient_id: recipientId,
          message:
            "Someone has shared a secret with you. Open it before it's gone.",
          link: secretUrl,
        });

      if (insertError) {
        throw insertError;
      }

      toast.success("Secret sent to the user's inbox!");
      setRecipientEmail("");
    } catch (error: any) {
      console.error("Error sending to inbox:", error);
      toast.error("Failed to send secret. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // ❌ Invalid link state
  if (!shortId || !key) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Invalid Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              The secret link could not be generated. Please try again.
            </p>
            <Button asChild>
              <Link href="/create">Try Again</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!secretUrl) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">
              Secret Created Successfully
            </h1>
            <p className="text-muted-foreground">
              Your secret is encrypted and ready to share
            </p>
          </div>

          {/* Secret Link */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Your Secret Link
              </CardTitle>
              <CardDescription>
                Share this link. It can only be used once.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <code className="break-all text-sm">{secretUrl}</code>
              </div>

              <CopyButton
                text={secretUrl}
                label="Copy Secret Link"
                className="w-full"
              />

              <div className="mt-4 flex flex-col items-center gap-2">
                {showQrCode && <QRCodeDisplay value={secretUrl} size={192} />}
                <Button variant="outline" onClick={() => setShowQrCode(!showQrCode)} className="w-full">
                  {showQrCode ? "Hide QR Code" : "Show QR Code"}
                </Button>
              </div>

              <div className="pt-4">
                {user && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="send-to-inbox" className="font-semibold">
                        Send to App Inbox 
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="send-to-inbox"
                          type="email"
                          placeholder="Registered user's email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          disabled={isSending}
                        />
                        <Button
                          onClick={handleSendToInbox}
                          disabled={isSending || !recipientEmail}
                        >
                          {isSending ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The secret will be sent to the user if they are
                        registered.
                      </p>
                    </div>
                  </>
                )}
                <Separator className="my-4" />

                <div className="my-4">
                  <h3 className="mb-2 text-lg font-semibold">
                Share Externally
                  </h3>
                  <SocialShareButtons
                    secretUrl={secretUrl}
                    title="CipherOnce - One-Time Secret"
                    text="I'm sharing a self-destructing secret with you via CipherOnce. View it before it's gone!"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notice */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                Important
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Save this link now.</strong> You won’t be able to
                retrieve it again.
              </p>
              <p>
                The secret is permanently deleted after viewing or expiration.
              </p>
              <p>
                The encryption key is stored in the URL fragment (#) and never
                sent to our servers.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          {!loading && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {user ? (
                <Button
                  onClick={handleGoToDashboard}
                  variant="outline"
                  className="flex-1"
                >
                  View Dashboard
                </Button>
              ) : (
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">Back to Home</Link>
                </Button>
              )}

              <Button asChild className="flex-1">
                <Link href="/create">Create Another Secret</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

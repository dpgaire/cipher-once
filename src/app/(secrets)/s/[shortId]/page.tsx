import { Metadata } from 'next'
import { ViewSecretPage } from "@/features/secrets/components/view-secret";

export const metadata: Metadata = {
  title: "View Secret",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ViewSecretPageWrapper() {
  return <ViewSecretPage />;
}
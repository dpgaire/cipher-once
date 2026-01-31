import { ViewSecretPage } from '@/app/(secrets)/s/[shortId]/_components/view-secret';
import { Metadata } from 'next'

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
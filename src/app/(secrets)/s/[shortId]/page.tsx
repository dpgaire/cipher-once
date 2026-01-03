import { Metadata } from 'next'
import { ViewSecretPage } from "@/features/secrets/components/view-secret";

export async function generateMetadata({ params }: { params: { shortId: string } }): Promise<Metadata> {
  const baseUrl = 'https://www.cipheronce.com';
  const secretUrl = `${baseUrl}/s/${params.shortId}`;

  return {
    title: 'You have received a one-time secret!',
    description: 'Click the link to view the secret. It will be destroyed after being read.',
    openGraph: {
      title: 'You have received a one-time secret!',
      description: 'Click the link to view the secret. It will be destroyed after being read.',
      url: secretUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/cipheronce_lock_fade_blue500.png`,
          width: 1200,
          height: 630,
          alt: 'CipherOnce',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'You have received a one-time secret!',
      description: 'Click the link to view the secret. It will be destroyed after being read.',
      images: [`${baseUrl}/cipheronce_lock_fade_blue500.png`],
    },
  };
}


export default function ViewSecretPageWrapper() {
  return <ViewSecretPage />;
}
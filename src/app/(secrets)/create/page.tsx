"use client"

import dynamic from 'next/dynamic';

const DynamicCreateSecretForm = dynamic(
  () => import('@/app/(secrets)/create/_components/create-secret-form').then(mod => mod.CreateSecretForm),
  { ssr: false }
);

export default function CreateSecretPage() {
  return <DynamicCreateSecretForm />;
}

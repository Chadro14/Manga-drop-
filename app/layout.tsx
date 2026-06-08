// app/layout.tsx
import type { Metadata } from 'next';
import { ReactNode } from 'react';

// Métadonnées de ton site (optionnel, ajuste selon ton projet)
export const metadata: Metadata = {
  title: 'Mon Application',
  description: 'Description de mon application',
  keywords: 'nextjs, typescript, app',
  authors: [{ name: 'Ton Nom' }],
  viewport: 'width=device-width, initial-scale=1',
};

// Type pour les props du layout
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <head />
      <body>{children}</body>
    </html>
  );
}
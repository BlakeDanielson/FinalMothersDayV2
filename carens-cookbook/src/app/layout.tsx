import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/Navbar";
import { SettingsProvider } from "@/contexts/SettingsContext";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caren's Cookbook",
  description: "A collection of Caren's favorite recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#007bff" />
      </head>
      <body className={inter.className}>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
              card: 'shadow-lg',
              headerTitle: 'text-primary',
              socialButtonsBlockButton: 'border-input hover:bg-accent',
            },
            variables: {
              colorPrimary: '#007bff',
            }
          }}
        >
          <SettingsProvider>
            <Navbar />
            <main className="pt-0">
              {children}
            </main>
            <FloatingSettingsButton />
          </SettingsProvider>
          <Script
            src="/registerServiceWorker.js"
            strategy="lazyOnload"
          />
        </ClerkProvider>
      </body>
    </html>
  );
}

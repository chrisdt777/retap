import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Retap - A Minimal Writing Space',
    template: '%s | Retap',
  },
  description: 'A minimal, static personal publishing platform for writers and creators.',
  openGraph: {
    title: 'Retap',
    description: 'A minimal, static personal publishing platform for writers and creators.',
    type: 'website',
    url: 'https://retap.com',
    siteName: 'Retap',
  },
  twitter: {
    card: 'summary',
    title: 'Retap',
    description: 'A minimal, static personal publishing platform for writers and creators.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from 'next/image';
import "./globals.css";
import Footer from './Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Tool - Generate and Scan QR Codes",
  description: "A powerful and user-friendly tool to generate and scan QR codes.",
  keywords: "QR code, generator, scanner, create QR code, read QR code",
  openGraph: {
    title: "QR Code Tool - Generate and Scan QR Codes",
    description: "Create and scan QR codes with ease using our all-in-one tool.",
    type: "website",
    url: "https://qr-code.louisvolant.com",
    images: ['/icon_qrcode.png'],
  },
  icons: [
    { rel: "icon", url: "/icon_qrcode.svg" },
    { rel: "apple-touch-icon", url: "/icon_qrcode.svg" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}>
        <header className="bg-blue-600 dark:bg-blue-800 text-white py-4">
          <div className="container mx-auto px-4 flex items-center">
            <Image
              src="/icon_qrcode.svg"
              alt="QR Code Tool Logo"
              width={32}
              height={32}
              priority
              className="h-8 w-8 mr-2"
            />
            <h1 className="text-2xl font-bold">QR Code Tool</h1>
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
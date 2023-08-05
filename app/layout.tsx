import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/components/modals/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster />
          <ModalProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}

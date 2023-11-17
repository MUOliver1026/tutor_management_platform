import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { ApolloProviders } from "@/components/providers/ApolloProviders";
import { ClerkProvider } from '@clerk/nextjs'
import ContextProvider from "@/components/providers/context";
import {SocketProvider} from "@/components/providers/socketProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutor Management Platform",
  description: "A tutor management platform developed by UNSW IT students for COMP9900",
  viewport: "width=device-width, initial-scale=1",
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
          <ApolloProviders>
            <SocketProvider>
              <ContextProvider>
                <Navbar />
                {children}
                <Toaster />
                <Footer />
              </ContextProvider>
            </SocketProvider>
          </ApolloProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: "PDF Receipt Generator",
  description: "Generate and manage your receipts easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

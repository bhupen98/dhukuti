import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { AdminNavigationProvider } from "@/components/providers/AdminNavigationProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dhukuti - Nepalese Community Savings Platform in Australia",
  description: "Connect with your Nepalese community in Australia through traditional Dhukuti rotating savings groups. Build financial security, support each other, and grow together.",
  keywords: ["Dhukuti", "Nepalese", "Australia", "community savings", "rotating credit", "Nepali community", "financial security", "group savings", "Nepalese diaspora"],
  authors: [{ name: "Dhukuti Team" }],
  creator: "Dhukuti",
  publisher: "Dhukuti",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dhukuti - Nepalese Community Savings Platform in Australia",
    description: "Connect with your Nepalese community in Australia through traditional Dhukuti rotating savings groups.",
    url: "http://localhost:3000",
    siteName: "Dhukuti",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dhukuti - Nepalese Community Savings Platform in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhukuti - Nepalese Community Savings Platform in Australia",
    description: "Connect with your Nepalese community in Australia through traditional Dhukuti rotating savings groups.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}>
        <SessionProvider>
          <AdminNavigationProvider />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                color: '#1e293b',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
                style: {
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
                style: {
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#3b82f6',
                  secondary: '#ffffff',
                },
                style: {
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
} 
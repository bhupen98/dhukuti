import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { AdminNavigationProvider } from "@/components/providers/AdminNavigationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dhukuti - Traditional Nepali Rotating Savings Platform",
  description: "Manage your Dhukuti groups, track contributions, and build financial security with your community.",
  keywords: ["Dhukuti", "savings", "rotating credit", "Nepali", "community finance"],
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
    title: "Dhukuti - Traditional Nepali Rotating Savings Platform",
    description: "Manage your Dhukuti groups, track contributions, and build financial security with your community.",
    url: "http://localhost:3000",
    siteName: "Dhukuti",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhukuti - Traditional Nepali Rotating Savings Platform",
    description: "Manage your Dhukuti groups, track contributions, and build financial security with your community.",
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
      <body className={`${inter.className} bg-gray-50`}>
        <SessionProvider>
          <AdminNavigationProvider />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
} 
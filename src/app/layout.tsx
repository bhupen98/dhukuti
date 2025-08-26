import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { MainNavigation } from "@/components/ui/navigation/MainNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body className={`${inter.className} min-h-screen bg-white`}>
        <AuthProvider>
          <MainNavigation />
          <main className="min-h-screen">
            {children}
          </main>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              background: '#ffffff',
              border: '1px solid rgba(229, 231, 235, 1)',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
            }}
            toastClassName="!bg-white !border !border-gray-200 !rounded-xl !shadow-lg !text-gray-700 !font-medium"
          />
        </AuthProvider>
      </body>
    </html>
  );
} 
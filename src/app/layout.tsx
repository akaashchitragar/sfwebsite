import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "./JsonLd";
import Preloader from "@/components/Preloader";
import { LoadingProvider } from "@/context/LoadingContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#16a34a",
};

export const metadata: Metadata = {
  title: "Sanghachadwam Foundation - Transforming Agriculture Into A First-Choice Profession",
  description: "Sanghachadwam Foundation empowers rural youth to become successful agri-preneurs through sustainable farming practices, innovative technology, and comprehensive training programs.",
  generator: "Next.js",
  applicationName: "Sanghachadwam Foundation",
  keywords: ["agriculture", "farming", "sustainable agriculture", "agri-entrepreneurs", "rural development", "farmer training", "agricultural innovation", "organic farming", "Karnataka", "India"],
  authors: [{ name: "Sanghachadwam Foundation", url: "https://sanghachadwam.org" }],
  creator: "Sanghachadwam Foundation",
  publisher: "Sanghachadwam Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sanghachadwam.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sanghachadwam Foundation - Transforming Agriculture Into A First-Choice Profession",
    description: "Empowering rural youth to become successful agri-preneurs through sustainable farming practices, innovative technology, and comprehensive training programs.",
    url: "https://sanghachadwam.org",
    siteName: "Sanghachadwam Foundation",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Sanghachadwam Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanghachadwam Foundation",
    description: "Transforming agriculture into a first-choice profession, empowering rural youth to become agri-preneurs.",
    images: ["/images/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      { url: '/favicon/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased relative`}
      >
        <LoadingProvider>
          <Preloader />
          <div className="contents">
            <Navbar />
            {children}
            <Footer />
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}

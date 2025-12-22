import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "Letsettle - Settle Debates with Public Voting",
    template: "%s | Letsettle"
  },
  description: "The official platform for settling public debates through voting. Create polls, vote on options, and see live rankings.",
  keywords: ["debate", "voting", "polls", "public opinion", "rankings", "vote"],
  authors: [{ name: "Mohd Rafey" }],
  creator: "Mohd Rafey",
  publisher: "Letsettle",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Letsettle',
    title: 'Letsettle - Settle Debates with Public Voting',
    description: 'Create polls, vote on options, and see live rankings on the most democratic debate platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Letsettle - Public Debate Platform'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Letsettle - Settle Debates with Public Voting',
    description: 'Create polls, vote on options, and see live rankings.',
    images: ['/og-image.png'],
    creator: '@letsettle'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <ErrorBoundary>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">
             {children}
          </main>
          <Toaster position="top-center" richColors />
        </ErrorBoundary>

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Letsettle",
              "description": "The official platform for settling public debates through voting.",
              "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}

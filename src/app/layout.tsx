import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "compadcn - Charge up ShadCN CLI like never before",
  description:
    "A powerful CLI wrapper around shadcn-ui that adds presets, remove support, linting, and an interactive TUI for blazing-fast component workflows.",
  authors: [
    {
      name: "lirena00",
      url: "https://github.com/lirena00",
    },
  ],
  creator: "lirena00",
  robots: "index, follow",
  openGraph: {
    title: "compadcn - Charge up ShadCN CLI like never before",
    locale: "en_US",
    type: "website",
    description:
      "A powerful CLI wrapper around shadcn-ui that adds presets, remove support, linting, and an interactive TUI for blazing-fast component workflows.",
    url: "https://compadcn.lirena.in",
    siteName: "compadcn",
    images: [
      {
        url: "https://compadcn.lirena.in/og.png",
        width: 1200,
        height: 630,
        alt: "compadcn - Charge up ShadCN CLI like never before",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "compadcn - Charge up ShadCN CLI like never before",
    description:
      "A powerful CLI wrapper around shadcn-ui that adds presets, remove support, linting, and an interactive TUI for blazing-fast component workflows.",
    creator: "@lirena00",
    images: [
      {
        url: "https://compadcn.lirena.in/og.png",
        alt: "compadcn - Charge up ShadCN CLI like never before",
      },
    ],
  },
  alternates: {
    canonical: "https://compadcn.lirena.in",
  },
  category: "utilities",
  keywords: [
    "shadcn cli",
    "shadcn-ui wrapper",
    "react components",
    "tailwind components",
    "component management",
    "interactive cli",
    "developer productivity",
    "shadcn presets",
    "component linting",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Alexandria, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Modern geometric Arabic sans — strong digital feel, pairs with Space Grotesk
const arabic = Alexandria({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mansajdigital.netlify.app"),
  title: "Mansaj Digital — Web Design & Development Agency | منسج الرقمية",
  description:
    "Mansaj Digital is a web design & development agency. We design and build websites, online stores, and digital experiences that work for your business — mobile-first, fast, and clear. / وكالة منسج الرقمية لتصميم وتطوير المواقع.",
  keywords: [
    "Mansaj Digital",
    "web design agency",
    "web development",
    "online stores",
    "landing pages",
    "منسج الرقمية",
    "تصميم مواقع",
    "برمجة مواقع",
  ],
  authors: [{ name: "Mansaj Digital" }],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mansaj Digital | We build your web presence",
    description:
      "Websites, stores, and digital experiences tailored to your business. Your project deserves a website that works for it.",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2426" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${grotesk.variable} ${arabic.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

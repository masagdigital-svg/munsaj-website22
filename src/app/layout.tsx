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
  metadataBase: new URL("https://munsajdigital.com"),
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar" } },
  title: { default: "Mansaj Digital | Web Design & Development", template: "%s | Mansaj Digital" },
  description:
    "Mansaj Digital is a web design and development agency building business websites, online stores, landing pages and tailored digital experiences.",
  keywords: [
    "Mansaj Digital",
    "Munsaj Digital",
    "منسج الرقمية",
    "منسج",
    "منسج ديجيتال",
    "web design agency",
    "web development",
    "online stores",
    "landing pages",
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
    siteName: "Mansaj Digital | منسج الرقمية",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2426" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://munsajdigital.com/#organization",
  name: "منسج الرقمية",
  alternateName: ["Mansaj Digital", "Munsaj Digital", "منسج", "منسج ديجيتال"],
  url: "https://munsajdigital.com/",
  description:
    "منسج الرقمية وكالة متخصصة في تصميم وتطوير المواقع الإلكترونية والحلول الرقمية.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://munsajdigital.com/#website",
  url: "https://munsajdigital.com/",
  name: "منسج الرقمية",
  alternateName: ["Mansaj Digital", "Munsaj Digital"],
  inLanguage: ["ar", "en"],
  publisher: { "@id": "https://munsajdigital.com/#organization" },
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c"),
            }}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

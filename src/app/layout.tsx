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
  title: { default: "منسج الرقمية | Mansaj Digital", template: "%s | منسج الرقمية" },
  description:
    "Mansaj Digital (also written Munsaj Digital) — منسج الرقمية، وكالة لتصميم وتطوير مواقع الشركات والمتاجر الإلكترونية وصفحات الهبوط والمواقع الشخصية والعقارية. We build clear, fast websites and online stores for businesses.",
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
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebSite",
                    "@id": "https://munsajdigital.com/#website",
                    "url": "https://munsajdigital.com/",
                    "name": "Mansaj Digital",
                    "alternateName": [
                      "منسج الرقمية",
                      "Munsaj Digital",
                      "منسج",
                      "Mansaj",
                      "Munsaj",
                      "منسج ديجيتال",
                      "munsajdigital.com"
                    ],
                    "publisher": { "@id": "https://munsajdigital.com/#organization" }
                  },
                  {
                    "@type": "Organization",
                    "@id": "https://munsajdigital.com/#organization",
                    "name": "Mansaj Digital",
                    "alternateName": [
                      "منسج الرقمية",
                      "Munsaj Digital",
                      "منسج",
                      "Mansaj",
                      "Munsaj",
                      "منسج ديجيتال"
                    ],
                    "url": "https://munsajdigital.com/"
                  }
                ]
              })
            }}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

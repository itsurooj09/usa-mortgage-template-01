import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CookieConsentBanner } from "@/components/navigation/CookieConsentBanner";
import { siteConfig } from "@/lib/config/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northstarmortgage.example.com"),
  title: {
    default: `${siteConfig.brand.name} | Premier USA Residential Mortgage Lending`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: [
    "Mortgage Lender USA",
    "Conventional Home Loan",
    "FHA Loan 3.5 Down",
    "VA Home Loans 0 Down",
    "Mortgage Payment Calculator",
    "Home Affordability Calculator",
    "Refinance Rates",
    "First-Time Homebuyer Grants",
    "Jumbo Mortgage",
    "NMLS #1948271",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://northstarmortgage.example.com",
    title: `${siteConfig.brand.name} | Precision American Mortgage Lending`,
    description: siteConfig.brand.description,
    siteName: siteConfig.brand.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${dmSerif.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-white text-navy-midnight selection:bg-brass/30 selection:text-navy-deep">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-brass text-navy-deep px-4 py-2 rounded-md font-bold text-sm shadow-lg"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}

import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Update NEXT_PUBLIC_SITE_URL in .env.local for production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://houseofhopechildren.vercel.app";
export const metadataBase = new URL(siteUrl);

export const metadata = {
  title: "House of Hope - Supporting Children & Families in Likoni",
  description:
    "House of Hope CBO provides educational support, mentorship, counseling and safe shelter for orphans and vulnerable children in Likoni, Mombasa.",
  keywords: [
    "House of Hope",
    "children charity",
    "education Mombasa",
    "mentorship programs",
    "Likoni children support",
    "orphan care Kenya",
    "vulnerable children",
  ],
  authors: [{ name: "House of Hope Children's Home" }],
  creator: "House of Hope CBO",
  openGraph: {
    title: "House of Hope - Supporting Children & Families in Likoni",
    description:
      "Empowering orphans and vulnerable children through education, mentorship, counseling and holistic care in Likoni, Kenya.",
    url: "/",
    siteName: "House of Hope",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "House of Hope Children's Home",
      },
    ],
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "House of Hope - Supporting Children & Families in Likoni",
    description:
      "Empowering orphans and vulnerable children through education, mentorship, counseling and holistic care.",
    images: ["/og-image.jpg"],
    creator: "@houseofhope",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": "-1",
    "max-video-preview": "-1",
  },
  alternates: {
    canonical: "/",
  },
};

// JSON-LD Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "additionalType": "NGO",
  name: "House of Hope Children's Home",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "House of Hope provides education, mentorship, counseling and safe shelter for orphans and vulnerable children in Likoni, Mombasa, Kenya.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Likoni",
    addressLocality: "Mombasa",
    addressRegion: "Coast",
    postalCode: "80100",
    addressCountry: "KE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254734037736",
    contactType: "Customer Service",
  },
  sameAs: [
    "https://www.facebook.com/share/1BomfS3GUZ/",
    
  ],
  founder: { "@type": "Person", name: "Miss Susan William" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="bg-white text-gray-900 font-sans">
        <Navbar />

        {/* Main Content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

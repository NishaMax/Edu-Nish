import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://edunish.lk"),
  title: {
    default: "EduNish — Free Past Papers & Exam Resources Sri Lanka",
    template: "%s | EduNish",
  },
  description:
    "Free O/L and A/L past papers, model papers, and marking schemes for Sri Lankan students. Available in Sinhala, English, and Tamil mediums. Instant downloads with zero lag.",
  keywords: [
    "O/L past papers",
    "A/L past papers",
    "Sri Lanka past papers",
    "Grade 11 maths past paper",
    "සාමාන්‍ය පෙළ පසුගිය ප්‍රශ්න පත්‍ර",
    "උසස් පෙළ පසුගිය විභාග ප්‍රශ්න පත්‍ර",
    "சா/த கடந்த கால வினாத்தாள்கள்",
    "edunish.lk",
    "marking schemes",
  ],
  authors: [{ name: "EduNish Team" }],
  creator: "EduNish",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "si_LK",
    alternateLocale: ["en_US", "ta_LK"],
    url: "https://edunish.lk",
    siteName: "EduNish",
    title: "EduNish — Free Past Papers & Exam Resources Sri Lanka",
    description:
      "Instant, lightweight past papers download for Grade 6-13 students in Sinhala, English, and Tamil.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060a13",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="si" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://drive.google.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}

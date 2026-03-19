import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Crimson_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ondama - Accompagnement bien-être pour femmes",
  description: "Accompagnement bien-être pour femmes : endométriose, grossesse, post partum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script defer src="https://umami.nicolasmaitre.dev/script.js" data-website-id="39cc0532-9e35-431f-af49-93e9338f23f1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${crimsonText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

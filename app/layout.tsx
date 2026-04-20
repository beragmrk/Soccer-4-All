import type { Metadata } from "next";
import type { ReactNode } from "react";
import AnimationProvider from "@/components/animation-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { images, site } from "@/data/site";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Soccer-4-All | Gear That Gets Kids in the Game",
    template: "%s | Soccer-4-All"
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Soccer-4-All",
    description: site.description,
    url: site.url,
    siteName: "Soccer-4-All",
    images: [
      {
        url: images.icon,
        width: 1200,
        height: 630,
        alt: "Soccer-4-All"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Soccer-4-All",
    description: site.description,
    images: [images.icon]
  },
  icons: {
    icon: images.icon,
    apple: images.icon
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnimationProvider />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

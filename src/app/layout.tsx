import type { Metadata, Viewport } from "next";
import { invitationConfig } from "@/config/invitation";
import "./globals.css";

export const metadata: Metadata = {
  title: invitationConfig.seo.pageTitle,
  description: invitationConfig.seo.metaDescription,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: invitationConfig.seo.pageTitle,
    description: invitationConfig.seo.metaDescription,
    images: [invitationConfig.seo.ogImageUrl],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: invitationConfig.seo.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#fdf5ea] text-[#3d0a10]">
        {children}
      </body>
    </html>
  );
}

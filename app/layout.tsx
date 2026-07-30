import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host =
    incomingHeaders.get("x-forwarded-host") ??
    incomingHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const description =
    "Rugby sevens arcade 2D, 7 contra 7, com os 24 clubes das duas divisões nacionais de 2026.";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Rugby BR 26",
      template: "%s · Rugby BR 26",
    },
    description,
    applicationName: "Rugby BR 26",
    manifest: "/manifest.webmanifest",
    alternates: { canonical: baseUrl },
    icons: {
      icon: [
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/icon-192.png", sizes: "192x192" }],
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: baseUrl,
      siteName: "Rugby BR 26",
      title: "Rugby BR 26 — rápido, físico, brasileiro",
      description,
      images: [
        {
          url: `${baseUrl}/og.png?v=3-sevens`,
          width: 1200,
          height: 800,
          alt: "Rugby BR 26 — campo tático com duas equipes de rugby",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rugby BR 26 — rápido, físico, brasileiro",
      description,
      images: [`${baseUrl}/og.png?v=3-sevens`],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#071611",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Now",
  description: "A responsive weather dashboard powered by Open-Meteo.",
  icons: {
    icon: "/assets/images/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

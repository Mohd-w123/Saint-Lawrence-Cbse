import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Saint Lawrence Public School Jaipur | CBSE School on Goner Road 2026",
  description:
    "Saint Lawrence Public School, Jaipur – A trusted CBSE school on Goner Road, Luniyawas. Admissions open 2026-27. Holistic education with empathy, integrity, and excellence.",
  keywords: [
    "Saint Lawrence Public School",
    "SLPS Jaipur",
    "CBSE school Goner Road",
    "school in Luniyawas Jaipur",
    "admissions 2026",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

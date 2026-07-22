import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Top School in Jaipur | Best School in Jaipur 2026 | Mayoor School",
  description:
    "Mayoor School Jaipur – One of the best CBSE schools in Jaipur. Admissions open 2026-27. Holistic education with empathy, integrity, perseverance, and autonomy.",
  keywords: [
    "best school in Jaipur",
    "CBSE school Jaipur",
    "Mayoor School Jaipur",
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

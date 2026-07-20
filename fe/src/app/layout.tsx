import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAB from "@/components/FAB";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi",
  description: "Trung tâm quản lý và chăm sóc tim mạch, huyết áp chuyên sâu tại Hải Phòng dưới sự trực tiếp thăm khám và điều trị của BSCKII Đoàn Khôi.",
  keywords: "phòng khám nội hải phòng, bác sĩ đoàn khôi hải phòng, phòng khám đoàn khôi hải phòng, tim mạch hải phòng, khám tim mạch hải phòng, holter điện tim, huyết áp",
  authors: [{ name: "BSCKII Đoàn Khôi" }],
  openGraph: {
    title: "Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi",
    description: "Khám & theo dõi tim mạch, huyết áp chuyên sâu tại Hải Phòng.",
    images: ["/assets/heart_care.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-neutral-bg text-text-primary">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FAB />
      </body>
    </html>
  );
}

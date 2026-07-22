import React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import FAB from "@/Components/FAB";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-neutral-bg text-text-primary">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FAB />
    </div>
  );
}

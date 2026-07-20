import ServicesTabs from "@/components/ServicesTabs";
import Image from "next/image";

export const metadata = {
  title: "Dịch vụ y tế chuyên sâu & Bảng giá - Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi",
  description: "Khám phá dải dịch vụ y khoa tim mạch toàn diện tại Phòng khám Chuyên khoa Nội - BSCKII Đoàn Khôi Hải Phòng: Khám tổng quát, điện tim ECG, tầm soát tăng huyết áp, Holter 24h, điều trị suy tim.",
};

export default function ServicesPage() {
  return (
    <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
      
      {/* Page Header */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
        <Image
          src="/assets/services_banner.jpg"
          alt="Dịch vụ banner"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            DỊCH VỤ & BẢNG GIÁ
          </h1>
          <div className="w-20 h-1 bg-secondary rounded-full" />
        </div>
      </section>

      {/* Main Tabs Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicesTabs />
      </section>

    </div>
  );
}

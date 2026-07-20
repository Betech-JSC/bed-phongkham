import NewsFilter from "@/components/NewsFilter";
import Image from "next/image";

export const metadata = {
  title: "Tin tức & Kiến thức y học tim mạch - Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi",
  description: "Trang tổng hợp kiến thức y khoa chuyên sâu về tim mạch, huyết áp, dinh dưỡng phòng bệnh và tin tức hoạt động tại Phòng khám Chuyên khoa Nội - BSCKII Đoàn Khôi Hải Phòng.",
};

export default function NewsPage() {
  return (
    <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
      
      {/* Page Header */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
        <Image
          src="/assets/news_banner.jpg"
          alt="Tin tức banner"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            TIN TỨC & Y HỌC
          </h1>
          <div className="w-20 h-1 bg-secondary rounded-full" />
        </div>
      </section>

      {/* Main Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NewsFilter />
      </section>

    </div>
  );
}

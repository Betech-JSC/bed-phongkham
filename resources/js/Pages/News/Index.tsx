import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  read_time: string;
  date: string;
}

interface Props {
  newsList: Article[];
}

export default function NewsIndex({ newsList = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const categories = [
    "Tất cả",
    ...Array.from(new Set(newsList.map((n) => n.category))),
  ];

  const filteredNews = selectedCategory === "Tất cả"
    ? newsList
    : newsList.filter((n) => n.category === selectedCategory);

  return (
    <MainLayout>
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Page Header */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src="/assets/news_banner.jpg"
            alt="Tin tức banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              TIN TỨC & Y HỌC
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full" />
          </div>
        </section>

        {/* Category Filters Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-secondary text-white border-secondary shadow-sm scale-102"
                    : "bg-white text-text-primary border-slate-200 hover:border-secondary hover:text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Status Count */}
          <div className="text-center text-xs text-text-light font-medium -mt-4">
            Hiển thị {filteredNews.length} bài viết trong chuyên mục <span className="text-secondary font-bold">"{selectedCategory}"</span>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <article 
                key={news.id}
                className="bg-white rounded-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between border border-slate-100"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-550"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-text-light mb-3 font-semibold">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {news.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-secondary" />
                        {news.read_time}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-primary mb-3 hover:text-secondary transition-colors leading-snug line-clamp-2">
                      <Link href={`/tin-tuc/${news.slug}`}>{news.title}</Link>
                    </h3>
                    <p className="text-xs text-text-light leading-relaxed line-clamp-3 mb-4">
                      {news.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 pt-0 border-t border-slate-50 flex justify-between items-center text-xs text-text-light">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-secondary" />
                    {news.date}
                  </span>
                  <Link 
                    href={`/tin-tuc/${news.slug}`}
                    className="text-secondary font-bold hover:underline inline-flex items-center gap-1 group"
                  >
                    Đọc bài viết
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </section>

      </div>
    </MainLayout>
  );
}

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, User, Calendar, Clock } from "lucide-react";
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

export default function NewsIndex({ newsList }: Props) {
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
        
        {/* Banner */}
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

        {/* Category Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-text-primary hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <article 
                key={news.id}
                className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-text-light mb-3">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold">
                        {news.category}
                      </span>
                      <span>{news.read_time}</span>
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
                  <span>Bởi {news.author}</span>
                  <Link 
                    href={`/tin-tuc/${news.slug}`}
                    className="text-secondary font-bold hover:underline inline-flex items-center gap-1 group"
                  >
                    Đọc tiếp
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

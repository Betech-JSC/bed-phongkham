"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { newsList, NewsItem } from "@/data/news";

export default function NewsFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const categories = ["Tất cả", "Kiến thức tim mạch", "Tin tức phòng khám", "Hướng dẫn điều trị"];

  const filteredNews = selectedCategory === "Tất cả" 
    ? newsList 
    : newsList.filter(news => news.category === selectedCategory);

  return (
    <div className="flex flex-col gap-10">
      
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

      {/* Filter status */}
      <div className="text-center text-xs text-text-light font-medium">
        Hiển thị {filteredNews.length} bài viết trong chuyên mục <span className="text-secondary font-bold">"{selectedCategory}"</span>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredNews.map((news, idx) => (
            <motion.article
              key={news.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="bg-white rounded-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill
                    className="object-cover hover:scale-103 transition-transform duration-550"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-text-light mb-3 font-semibold">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {news.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-secondary" />
                      {news.readTime}
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
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

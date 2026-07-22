import React from "react";
import { Link } from "@inertiajs/react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  CalendarCheck2,
  Share2
} from "lucide-react";
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
  news: Article;
  relatedNews: Article[];
  authorDetails?: {
    id: number;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    details?: string;
  } | null;
}

export default function NewsShow({ news, relatedNews, authorDetails }: Props) {
  return (
    <MainLayout>
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/tin-tuc" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-light hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Quay lại cẩm nang tin tức
          </Link>
        </div>

        {/* Main Post Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Post Content */}
            <article className="lg:col-span-8 bg-white p-6 md:p-10 rounded-card shadow-sm">
              
              <div className="flex flex-col gap-4 mb-6">
                <span className="self-start text-xs font-bold uppercase tracking-wider text-secondary px-3 py-1 bg-secondary/10 rounded-full">
                  {news.category}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary leading-tight">
                  {news.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-light border-y border-slate-100 py-3.5 mt-2">
                  <span className="flex items-center gap-1.5 font-semibold text-text-primary">
                    <User size={14} className="text-secondary" />
                    Bởi {news.author}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-secondary" />
                    {news.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-secondary" />
                    {news.read_time}
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative w-full aspect-[16/9] rounded-card overflow-hidden bg-slate-100 mb-8">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Body */}
              <div 
                className="text-sm text-text-primary leading-relaxed space-y-6 
                  [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-8 [&>h3]:mb-3
                  [&>p]:text-text-light [&>p]:leading-relaxed
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-text-light
                  [&>ul_li_strong]:text-text-primary [&>p_strong]:text-text-primary"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              {/* Author Box */}
              {authorDetails && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-2xs">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-slate-200 shrink-0 shadow-xs">
                    <img
                      src={authorDetails.avatar || '/assets/doctor_khoi.png'}
                      alt={authorDetails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a896] bg-[#00a896]/10 px-2.5 py-0.5 rounded-md">
                      TÁC GIẢ BÀI VIẾT
                    </span>
                    <h4 className="text-base font-extrabold text-[#004b87] leading-snug">
                      {authorDetails.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-500">
                      {authorDetails.title}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {authorDetails.bio}
                    </p>
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-6 mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs">
                <div className="text-text-light">
                  Chuyên mục: <span className="font-semibold text-primary">{news.category}</span>
                </div>
                <button className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-text-primary px-4 py-2 rounded-btn font-bold transition-all w-full sm:w-auto cursor-pointer">
                  <Share2 size={14} className="text-secondary" />
                  Chia sẻ bài viết
                </button>
              </div>

            </article>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="bg-white p-6 rounded-card shadow-sm flex flex-col gap-5">
                <h3 className="font-bold text-primary text-sm uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
                  Bài viết liên quan
                </h3>
                <div className="flex flex-col gap-4 mt-2">
                  {relatedNews.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b border-slate-50 pb-4 last:border-b-0 last:pb-0">
                      <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-xs font-bold text-primary hover:text-secondary leading-snug line-clamp-2">
                          <Link href={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                        </h4>
                        <span className="text-sm text-text-light mt-1">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary text-white p-6 rounded-card border border-primary/10 shadow-md flex flex-col gap-4 text-center">
                <h4 className="font-bold text-base leading-snug">Cần tầm soát sức khỏe tim mạch?</h4>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Đăng ký khám lâm sàng và đo điện tim trực tiếp cùng BSCKII Đoàn Khôi tại Hải Phòng.
                </p>
                <Link 
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold py-3 rounded-btn shadow-sm transition-all hover:scale-103 cursor-pointer"
                >
                  <CalendarCheck2 size={16} />
                  Đặt lịch khám ngay
                </Link>
                <a 
                  href="tel:0384326785" 
                  className="text-sm text-slate-350 hover:text-white underline font-semibold"
                >
                  Hotline tư vấn: 038 432 6785
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

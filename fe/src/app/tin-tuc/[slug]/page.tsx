import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CalendarCheck2,
  Share2
} from "lucide-react";
import { newsList } from "@/data/news";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsList.map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const news = newsList.find((n) => n.slug === slug);
  if (!news) {
    return {
      title: "Bài viết không tìm thấy",
    };
  }

  return {
    title: `${news.title} - MediPlus HP`,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = newsList.find((n) => n.slug === slug);

  if (!news) {
    notFound();
  }

  // Get other articles for sidebar suggestion
  const relatedNews = newsList.filter((n) => n.slug !== slug).slice(0, 3);

  return (
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

      {/* Main post container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Post content */}
          <article className="lg:col-span-8 bg-white p-6 md:p-10 rounded-card shadow-sm">
            
            {/* Meta info header */}
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
                  {news.readTime}
                </span>
              </div>
            </div>

            {/* Featured image */}
            <div className="relative w-full aspect-[16/9] rounded-card overflow-hidden bg-slate-100 mb-8">
              <Image 
                src={news.image} 
                alt={news.title} 
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Post body */}
            <div 
              className="text-sm text-text-primary leading-relaxed space-y-6 
                [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-8 [&>h3]:mb-3
                [&>p]:text-text-light [&>p]:leading-relaxed
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-text-light
                [&>ul_li_strong]:text-text-primary [&>p_strong]:text-text-primary"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {/* Bottom block sharing */}
            <div className="border-t border-slate-100 pt-6 mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs">
              <div className="text-text-light">
                Chuyên mục: <span className="font-semibold text-primary">{news.category}</span>
              </div>
              <button className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-text-primary px-4 py-2 rounded-btn font-bold transition-all w-full sm:w-auto">
                <Share2 size={14} className="text-secondary" />
                Chia sẻ bài viết
              </button>
            </div>

          </article>

          {/* Right Column: Sidebar suggestions */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Related posts */}
            <div className="bg-white p-6 rounded-card shadow-sm flex flex-col gap-5">
              <h3 className="font-bold text-primary text-sm uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
                Bài viết liên quan
              </h3>
              <div className="flex flex-col gap-4 mt-2">
                {relatedNews.map((item) => (
                  <div key={item.slug} className="flex gap-3 border-b border-slate-50 pb-4 last:border-b-0 last:pb-0">
                    <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-slate-100">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill
                        className="object-cover"
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

            {/* Sidebar CTA appointment */}
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
  );
}

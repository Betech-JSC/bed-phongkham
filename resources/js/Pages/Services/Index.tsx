import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Calendar, 
  HeartPulse 
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  pillar_title: string;
  tagline: string;
  description: string;
  detailed_description: string;
  includes: string[];
  candidates: string[];
  price: string;
  estimated_time: string;
}

interface ServicePillar {
  id: number;
  title: string;
  tagline: string;
  description: string;
  icon_name: string;
  services: ServiceDetail[];
}

interface Props {
  pillars: ServicePillar[];
  allServices: ServiceDetail[];
}

export default function ServicesIndex({ pillars, allServices }: Props) {
  const [activeTab, setActiveTab] = useState<number | 'all'>('all');

  const filteredPillars = activeTab === 'all' 
    ? pillars 
    : pillars.filter(p => p.id === activeTab);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <HeartPulse className="text-secondary" size={24} />;
      case "Stethoscope":
        return <Stethoscope className="text-secondary" size={24} />;
      case "Activity":
        return <Activity className="text-secondary" size={24} />;
      default:
        return <Heart className="text-secondary" size={24} />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Banner */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src="/assets/services_banner.jpg"
            alt="Dịch vụ y tế banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-slate-950/50 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              DỊCH VỤ THĂM KHÁM & TẦM SOÁT
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full" />
            <p className="text-sm md:text-base text-slate-200 max-w-2xl mt-2 leading-relaxed">
              Giải pháp toàn diện từ Tầm soát sớm, Điều trị liên tục đến Theo dõi sức khỏe tim mạch tại nhà.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-text-primary hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tất cả trụ cột dịch vụ
            </button>
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === pillar.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-text-primary hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {pillar.title.split(":")[0]}
              </button>
            ))}
          </div>
        </section>

        {/* Services List by Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col gap-16">
          {filteredPillars.map((pillar) => (
            <div key={pillar.id} className="flex flex-col gap-8">
              
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  {getIcon(pillar.icon_name)}
                </div>
                <div>
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider">{pillar.tagline}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary">{pillar.title}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pillar.services.map((service) => (
                  <div 
                    key={service.id} 
                    className="bg-white p-6 rounded-card border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{service.tagline}</span>
                      <h3 className="text-base font-bold text-primary mt-1 mb-3 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-text-light leading-relaxed mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-text-light mb-6 bg-slate-50 p-2.5 rounded-lg">
                        <Clock size={14} className="text-secondary shrink-0" />
                        <span>Thời gian: <strong className="text-text-primary">{service.estimated_time}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="text-xs font-bold text-primary border-t border-slate-100 pt-3">
                        Giá: {service.price.split("(")[0].trim()}
                      </div>
                      <Link 
                        href={`/dich-vu/${service.slug}`}
                        className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold py-2.5 px-4 rounded-btn transition-all text-center"
                      >
                        Xem chi tiết gói khám
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </section>

      </div>
    </MainLayout>
  );
}

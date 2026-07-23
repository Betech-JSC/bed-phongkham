import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
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

export default function ServicesIndex({ pillars = [], allServices = [] }: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const activePillar = pillars[activeTab] || pillars[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <HeartPulse size={20} />;
      case "Stethoscope":
        return <Stethoscope size={20} />;
      case "Activity":
        return <Activity size={20} />;
      default:
        return <HeartPulse size={20} />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Page Header */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src="/assets/services_banner.jpg"
            alt="Dịch vụ banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              DỊCH VỤ & BẢNG GIÁ
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full" />
          </div>
        </section>

        {/* Tabs Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10">
          
          {/* Tabs Navigation */}
          {pillars.length > 0 && (
            <div className="flex flex-col md:flex-row gap-2 bg-[#edf2f7] p-2 rounded-2xl max-w-4xl mx-auto w-full border-none shadow-sm">
              {pillars.map((pillar, idx) => (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer w-full ${
                    activeTab === idx
                      ? "bg-primary text-white shadow-md scale-102"
                      : "text-text-primary hover:bg-slate-200"
                  }`}
                >
                  {getIcon(pillar.icon_name)}
                  <span className="truncate">{pillar.title.split(":")[0]}</span>
                </button>
              ))}
            </div>
          )}

          {/* Tab description */}
          {activePillar && (
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-primary mb-2">
                {activePillar.title}
              </h3>
              <p className="text-sm text-text-light leading-relaxed">
                {activePillar.description}
              </p>
            </div>
          )}

          {/* Services Grid */}
          {activePillar && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activePillar.services.map((srv) => (
                <div
                  key={srv.slug}
                  className="bg-white p-8 rounded-card shadow-sm hover:shadow-lg transition-all flex flex-col justify-between border-none"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary px-2.5 py-1 bg-secondary/10 rounded-full">
                        {srv.tagline}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-text-light font-medium bg-slate-50 px-2 py-1 rounded">
                        <Clock size={12} className="text-secondary" />
                        <span>{srv.estimated_time}</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-3 leading-snug">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-text-light leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    {/* Sublist */}
                    {srv.includes && srv.includes.length > 0 && (
                      <>
                        <h5 className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">
                          Hạng mục khám bao gồm:
                        </h5>
                        <ul className="flex flex-col gap-2 mb-6">
                          {srv.includes.slice(0, 3).map((inc, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2 text-xs text-text-primary">
                              <CheckCircle2 size={14} className="text-secondary shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                          {srv.includes.length > 3 && (
                            <li className="text-[11px] text-text-light italic font-medium pl-6">
                              + Xem tiếp trong chi tiết dịch vụ...
                            </li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>

                  {/* Bottom detail */}
                  <div className="border-t border-slate-100 pt-6 mt-4 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-light font-semibold uppercase tracking-wider">
                        Chi phí khám
                      </span>
                      <span className="text-sm font-bold text-accent">
                        {srv.price.split("(")[0].trim()}
                      </span>
                    </div>
                    <Link
                      href={`/dich-vu/${srv.slug}`}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-btn shadow-sm transition-all hover:scale-103"
                    >
                      Chi tiết
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </MainLayout>
  );
}

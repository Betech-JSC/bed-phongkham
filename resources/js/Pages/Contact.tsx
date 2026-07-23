import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2 
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
}

interface Props {
  allServices: ServiceDetail[];
  settings: Record<string, string>;
  prefillService?: string;
}

export default function Contact({ allServices = [], settings = {}, prefillService }: Props) {
  const { flash } = usePage().props as any;

  const defaultNotes = prefillService 
    ? `Dịch vụ quan tâm: ${allServices.find(s => s.slug === prefillService)?.title || prefillService}\nNgày hẹn mong muốn: \nTriệu chứng hoặc ghi chú khác: `
    : '';

  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    patient_name: '',
    phone: '',
    notes: defaultNotes,
    service_slug: prefillService || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/lien-he', {
      onSuccess: () => {
        // Form submitted successfully
      }
    });
  };

  return (
    <MainLayout>
      <div className="bg-neutral-bg min-h-screen pt-24 pb-8">
        
        {/* Banner Header */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src="/assets/contact_banner.jpg"
            alt="Liên hệ banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              LIÊN HỆ
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full" />
          </div>
        </section>

        {/* Main Grid Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact info */}
            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-card shadow-sm flex flex-col gap-6">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider">
                  TRUNG TÂM TIM MẠCH SỐ & QUẢN LÝ TIM MẠCH CỘNG ĐỒNG
                </div>
                <h2 className="text-xl font-bold text-primary uppercase">
                  {settings.clinic_name || 'PHÒNG KHÁM CHUYÊN KHOA NỘI - BSCK II ĐOÀN KHÔI'}
                </h2>
                <div className="h-px bg-slate-100 w-full" />
                
                <ul className="flex flex-col gap-5 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Địa chỉ phòng khám:</h4>
                      <p className="text-text-light mt-0.5">{settings.address || '348 Nguyễn Lương Bằng, Lê Thanh Nghị, Hải Phòng'}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Số điện thoại Hotline:</h4>
                      <p className="text-text-light mt-0.5">
                        <a href={`tel:${settings.hotline_1_clean || '0384326785'}`} className="hover:underline font-semibold text-text-primary">
                          {settings.hotline_1 || '038 432 6785'}
                        </a> - <a href={`tel:${settings.hotline_2_clean || '0328699799'}`} className="hover:underline">
                          {settings.hotline_2 || '0328 699 799'}
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Thư điện tử:</h4>
                      <p className="text-text-light mt-0.5">{settings.email || 'doankhoiclinic@gmail.com'}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Giờ làm việc (Thứ 2 - Chủ Nhật):</h4>
                      <p className="text-text-light mt-0.5">{settings.working_hours || 'Sáng: 07:30 – 11:30 | Chiều: 13:30 – 18:30'}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-6">
              {wasSuccessful ? (
                <div className="bg-white p-8 md:p-10 rounded-card shadow-sm text-center flex flex-col items-center gap-6 animate-scale-in">
                  <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center text-secondary">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-primary">Đặt Lịch Hẹn Thành Công!</h3>
                    <p className="text-sm text-text-light leading-relaxed max-w-sm">
                      Cảm ơn bạn <span className="font-semibold text-text-primary">{flash?.success?.patient_name || data.patient_name}</span> đã đăng ký khám. 
                      Thông tin lịch hẹn đã được lưu vào hệ thống. Bác sĩ sẽ gọi lại tư vấn trực tiếp trong vòng 15 phút.
                    </p>
                  </div>
                  <button
                    onClick={() => reset()}
                    className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-2.5 rounded-btn shadow-sm transition-all cursor-pointer"
                  >
                    Đặt lịch hẹn khác
                  </button>
                </div>
              ) : (
                <div className="bg-white p-8 md:p-10 rounded-card shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-1 uppercase">
                    Đăng Ký Hẹn Lịch Khám
                  </h3>
                  <p className="text-xs text-text-light mb-6">
                    Vui lòng điền thông tin bên dưới, phòng khám sẽ gọi lại xác nhận lịch hẹn tức thì.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Patient Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
                        Họ và tên bệnh nhân <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={data.patient_name}
                        onChange={(e) => setData('patient_name', e.target.value)}
                        className="border border-slate-200 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 focus:bg-white transition-all text-text-primary font-medium"
                      />
                      {errors.patient_name && <span className="text-xs text-accent">{errors.patient_name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
                        Số điện thoại liên hệ <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0384326785"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="border border-slate-200 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 focus:bg-white transition-all text-text-primary font-medium"
                      />
                      {errors.phone && <span className="text-xs text-accent">{errors.phone}</span>}
                    </div>

                    {/* Notes / Symptoms */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
                        Yêu cầu khám chi tiết
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Gợi ý nhập: Dịch vụ cần khám gì, ngày giờ mong muốn ra sao, các triệu chứng hoặc ghi chú chi tiết khác..."
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        className="border border-slate-200 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 focus:bg-white transition-all text-text-primary font-medium resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={processing}
                      className="bg-secondary hover:bg-secondary-dark text-white text-sm font-bold py-3.5 rounded-btn shadow-md transition-all hover:scale-103 cursor-pointer mt-2 text-center disabled:opacity-50"
                    >
                      {processing ? 'Đang gửi thông tin...' : 'Xác nhận đặt lịch hẹn'}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>

          {/* Map Embed */}
          <div className="mt-12 w-full">
            <div className="bg-white p-2 rounded-card shadow-sm overflow-hidden relative w-full h-[500px] md:h-[600px]">
              <iframe
                title="Bản đồ chỉ đường Phòng khám BSCKII Đoàn Khôi"
                src="https://maps.google.com/maps?q=348%20Nguy%E1%BB%85n%20L%C6%B0%C6%A1ng%20B%E1%BA%B1ng,%20L%C3%AA%20Thanh%20Ngh%E1%BB%8B,%20H%E1%BA%A3i%20Ph%C3%B2ng&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}

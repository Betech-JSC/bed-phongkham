import React, { useState } from "react";
import { useForm, usePage, Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2,
  Send,
  Sparkles
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
      <Head title="Đặt Lịch Khám & Liên Hệ" />
      <div className="bg-neutral-bg min-h-screen pt-24 pb-8">
        
        {/* Banner Header */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src="/assets/contact_banner.jpg"
            alt="Liên hệ banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              LIÊN HỆ & ĐẶT LỊCH HẸN
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full" />
            <p className="text-sm sm:text-base text-slate-200 max-w-xl">
              Phòng khám luôn sẵn sàng lắng nghe và tư vấn sức khỏe tim mạch chuẩn y khoa cho bạn.
            </p>
          </motion.div>
        </section>

        {/* Main Grid Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="bg-white p-8 rounded-card shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col gap-6">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} />
                  TRUNG TÂM TIM MẠCH SỐ & QUẢN LÝ TIM MẠCH CỘNG ĐỒNG
                </div>
                <h2 className="text-xl font-bold text-primary uppercase leading-tight">
                  {settings.clinic_name || 'PHÒNG KHÁM CHUYÊN KHOA NỘI - BSCK II ĐOÀN KHÔI'}
                </h2>
                <div className="h-px bg-slate-100 w-full" />
                
                <ul className="flex flex-col gap-5 text-sm">
                  <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <MapPin className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Địa chỉ phòng khám:</h4>
                      <p className="text-text-light mt-0.5">{settings.address || '348 Nguyễn Lương Bằng, Lê Thanh Nghị, Hải Phòng'}</p>
                    </div>
                  </motion.li>
                  <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <Phone className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Số điện thoại Hotline:</h4>
                      <p className="text-text-light mt-0.5">
                        <a href={`tel:${settings.hotline_1_clean || '0585013013'}`} className="hover:underline font-extrabold text-primary text-base">
                          {settings.hotline_1 || '0585 013 013'}
                        </a>
                      </p>
                    </div>
                  </motion.li>
                  <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <Mail className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-text-primary">Thư điện tử:</h4>
                      <p className="text-text-light mt-0.5">{settings.email || 'doankhoiclinic@gmail.com'}</p>
                    </div>
                  </motion.li>
                  <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <Clock className="text-secondary shrink-0 mt-0.5" size={20} />
                    <div className="flex flex-col gap-2">
                      <div>
                        <h4 className="font-bold text-text-primary">1. Phòng khám Chuyên khoa Nội - BSCKII Đoàn Khôi:</h4>
                        {settings.working_hours ? (
                          <p className="text-text-light mt-0.5 font-medium whitespace-pre-line">{settings.working_hours}</p>
                        ) : (
                          <>
                            <p className="text-text-light mt-0.5 font-medium">Thứ 2 – Thứ 6: 17h15 – 20h00</p>
                            <p className="text-text-light mt-0.5 font-medium">Thứ 7, CN: Sáng 7h15 – 11h15 | Chiều 14h00 – 20h00</p>
                          </>
                        )}
                        <p className="text-xs text-slate-500 italic mt-0.5">* Tư vấn cấp cứu, dự phòng & điều trị toàn thời gian các ngày trong tuần</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <h4 className="font-bold text-text-primary">2. Trung tâm xét nghiệm Mediplus HP:</h4>
                        <p className="text-text-light mt-0.5 font-medium">Thứ 2 – Thứ 6: Sáng 7h15 – 11h15 | Chiều 17h00 – 20h00</p>
                        <p className="text-text-light mt-0.5 font-medium">Thứ 7, CN: Sáng 7h15 – 11h15 | Chiều 14h00 – 20h00</p>
                      </div>
                    </div>
                  </motion.li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Booking Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <AnimatePresence mode="wait">
                {wasSuccessful ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-8 md:p-10 rounded-card shadow-sm border border-emerald-100 text-center flex flex-col items-center gap-6"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner"
                    >
                      <CheckCircle2 size={36} />
                    </motion.div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-primary">Đặt Lịch Hẹn Thành Công!</h3>
                      <p className="text-sm text-text-light leading-relaxed max-w-sm">
                        Cảm ơn bạn <span className="font-semibold text-text-primary">{flash?.success?.patient_name || data.patient_name}</span> đã đăng ký khám. 
                        Thông tin lịch hẹn đã được lưu vào hệ thống. Bác sĩ sẽ gọi lại tư vấn trực tiếp trong vòng 15 phút.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => reset()}
                      className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3 rounded-btn shadow-sm transition-all cursor-pointer"
                    >
                      Đặt lịch hẹn khác
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white p-8 md:p-10 rounded-card shadow-sm border border-slate-100"
                  >
                    <h3 className="text-lg font-bold text-primary mb-1 uppercase tracking-tight">
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
                          className="border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 focus:bg-white transition-all text-text-primary font-medium"
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
                          placeholder="Ví dụ: 0585013013"
                          value={data.phone}
                          onChange={(e) => setData('phone', e.target.value)}
                          className="border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 focus:bg-white transition-all text-text-primary font-medium"
                        />
                        {errors.phone && <span className="text-xs text-accent">{errors.phone}</span>}
                      </div>

                      {/* Notes / Symptoms */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
                          Yêu cầu khám chi tiết
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Gợi ý nhập: Dịch vụ cần khám gì, ngày giờ mong muốn ra sao, các triệu chứng hoặc ghi chú chi tiết khác..."
                          value={data.notes}
                          onChange={(e) => setData('notes', e.target.value)}
                          className="border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 focus:bg-white transition-all text-text-primary font-medium resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={processing}
                        className="bg-secondary hover:bg-secondary-dark text-white text-sm font-bold py-3.5 rounded-btn shadow-md transition-all cursor-pointer mt-2 text-center disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {processing ? (
                          <span>Đang gửi thông tin...</span>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Xác nhận đặt lịch hẹn</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Map Embed */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 w-full"
          >
            <div className="bg-white p-2 rounded-card shadow-sm border border-slate-100 overflow-hidden relative w-full h-[450px] md:h-[550px] hover:shadow-md transition-all">
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
          </motion.div>
        </section>

      </div>
    </MainLayout>
  );
}

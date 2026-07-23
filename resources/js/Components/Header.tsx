import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Calendar, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { url, props } = usePage();
  const settings = (props as any).settings || {};
  const hotline1 = settings.hotline_1 || '038 432 6785';
  const hotline1Clean = settings.hotline_1_clean || '0384326785';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [url]);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    { name: "Dịch vụ", href: "/dich-vu" },
    { name: "Tin tức", href: "/tin-tuc" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return url === "/" || url === "";
    }
    return url.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={settings.logo_dark || "/assets/logo.png"}
                  alt="Phòng khám BSCKII Đoàn Khôi Logo"
                  width={44}
                  height={44}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-primary tracking-tight leading-none uppercase">
                  Phòng Khám Nội
                </span>
                <span className="text-[10px] text-text-light font-bold uppercase tracking-wider mt-1">
                  BSCKII Đoàn Khôi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold relative py-1 transition-colors ${
                    isActive(link.href)
                      ? "text-primary font-bold"
                      : "text-text-primary hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:${hotline1Clean}`}
                className="flex items-center gap-1.5 text-sm font-semibold text-text-primary hover:text-primary transition-colors pr-2"
              >
                <Phone size={15} className="text-secondary" />
                <span className="hidden lg:inline">Hotline:</span> {hotline1}
              </a>
              <Link
                href="/lien-he"
                className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold px-6 py-2.5 rounded-btn shadow-sm transition-all hover:scale-105 cursor-pointer"
              >
                <Calendar size={16} />
                Đặt lịch hẹn
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="tel:0384326785"
                className="p-2 text-text-primary hover:text-primary transition-colors"
                aria-label="Call clinic"
              >
                <Phone size={20} className="text-secondary" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-text-primary hover:text-primary transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-white shadow-xl border-b border-slate-100 flex flex-col p-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-semibold py-2.5 px-4 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-text-primary hover:text-primary hover:bg-slate-50/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="tel:0384326785"
                  className="flex items-center justify-center gap-2 text-sm font-bold text-text-primary border border-slate-200 py-3 rounded-btn hover:bg-slate-50 transition-all"
                >
                  <Phone size={16} className="text-secondary" />
                  Gọi Hotline: 038 432 6785
                </a>
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold py-3 rounded-btn shadow-sm transition-all text-center cursor-pointer"
                >
                  <Calendar size={16} />
                  Đặt lịch hẹn khám
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Building2, 
  ShieldCheck, 
  Globe, 
  LogIn, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  FileCheck2
} from "lucide-react";
import { ClientLoginModal } from "./ClientLoginModal";
import { ContractPreviewModal } from "./ContractPreviewModal";
import { isSoundEnabled, setSoundEnabled, playSciFiBeep } from "@/lib/soundFX";

interface NavbarProps {
  locale: string;
  messages: any;
}

export const Navbar: React.FC<NavbarProps> = ({ locale, messages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSciFiBeep(1200, 0.1);
  };

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    if (segments[1] === "uk" || segments[1] === "ru" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || `/${newLocale}`);
  };

  const navLinks = [
    { href: `/${locale}#candidates`, label: "[База кандидатів]" },
    { href: `/${locale}#knowledge`, label: "[Експертиза]" },
    { href: `/${locale}#terminal`, label: "[3D Термінал]" },
    { href: `/${locale}#fines-calculator`, label: "[Аудит 2026]" },
    { href: `/${locale}#faq`, label: "[Про нас]" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-slate-950/90 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Gold Medallion Logo + Ukrainian State Pride Badge */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logo.png" 
                  alt="Recruiter I Club Official Logo" 
                  className="w-full h-full rounded-full object-cover bg-black"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-sans">
                  <span>RECRUITER</span>
                  <span className="text-amber-400 font-black">I</span>
                  <span>CLUB</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono font-bold text-amber-300">
                    <span className="text-xs">🇺🇦</span> УКРАЇНА
                  </span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium font-mono">
                  Міжнародний найм у штат підприємства
                </span>
              </div>
            </Link>

            {/* Desktop Nav in Brackets Style from Reference */}
            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => playSciFiBeep(960, 0.04)}
                  className="text-xs font-mono font-medium text-slate-300 hover:text-amber-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => {
                  playSciFiBeep(1100, 0.06);
                  setIsContractModalOpen(true);
                }}
                className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>[Зразок договору]</span>
              </button>
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3.5">
              {/* Sound FX Toggle */}
              <button
                onClick={toggleSound}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                  soundOn
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                    : "bg-slate-900 border-white/5 text-slate-500"
                }`}
                title="Звукові ефекти терміналу"
              >
                {soundOn ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span className="text-[10px] font-bold">AUDIO</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="text-[10px]">MUTED</span>
                  </>
                )}
              </button>

              {/* Three-Language Switcher: UA / RU / EN */}
              <div className="flex items-center bg-slate-900/90 rounded-lg p-1 border border-amber-500/20 text-xs font-semibold">
                {([
                  { code: "uk", label: "UA" },
                  { code: "ru", label: "RU" },
                  { code: "en", label: "EN" }
                ] as const).map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => changeLocale(code)}
                    className={`px-2.5 py-1 rounded transition-all uppercase ${
                      locale === code
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-gold-glow font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Client Portal Button */}
              <button
                onClick={() => {
                  playSciFiBeep(1100, 0.06);
                  setIsLoginModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/60 transition-all duration-200"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Кабінет</span>
              </button>

              {/* CTA Button matching Reference Image */}
              <a
                href="#calculator"
                onClick={() => playSciFiBeep(1400, 0.08)}
                className="relative group overflow-hidden flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-gold-glow transition-all duration-300 active:scale-95"
              >
                <span>Замовити Персонал</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-900/50"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Мова інтерфейсу:</span>
                <div className="flex bg-slate-900 rounded-lg p-1 border border-white/5 text-xs font-semibold">
                  {([
                    { code: "uk", label: "UA" },
                    { code: "ru", label: "RU" },
                    { code: "en", label: "EN" }
                  ] as const).map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLocale(code);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-1 rounded uppercase ${
                        locale === code
                          ? "bg-amber-500 text-black font-bold shadow-gold-glow"
                          : "text-slate-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-slate-900 border border-slate-700"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                {messages.nav?.portalLogin || "Кабінет клієнта"}
              </button>

              <a
                href="#calculator"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 shadow-gold-glow"
              >
                {messages.nav?.orderWorkers || "Замовити персонал"}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Client Login Modal */}
      <ClientLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        locale={locale}
        messages={messages}
      />

      {/* Direct Employment Contract Preview Modal */}
      <ContractPreviewModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        locale={locale}
      />
    </>
  );
};
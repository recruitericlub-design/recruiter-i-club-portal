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
  VolumeX
} from "lucide-react";
import { ClientLoginModal } from "./ClientLoginModal";
import { isSoundEnabled, setSoundEnabled, playSciFiBeep } from "@/lib/soundFX";

interface NavbarProps {
  locale: string;
  messages: any;
}

export const Navbar: React.FC<NavbarProps> = ({ locale, messages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
    { href: "#roadmap", label: messages.nav?.roadmap || "Roadmap" },
    { href: "#terminal", label: "3D Термінал" },
    { href: "#calculator", label: messages.nav?.calculator || "Калькулятор" },
    { href: "#industries", label: messages.nav?.industries || "Галузі" },
    { href: "#candidates", label: messages.nav?.candidates || "Кандидати" },
    { href: "#faq", label: messages.nav?.faq || "FAQ" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-slate-950/90 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[1px] shadow-gold-glow">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                  <Building2 className="w-5 h-5 text-amber-400 group-hover:text-black transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                  RECRUITER <span className="text-amber-400 font-serif italic">I</span> CLUB
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium font-mono">
                  B2B Staffing Ecosystem
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => playSciFiBeep(960, 0.04)}
                  className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
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
                    <span className="text-[10px] font-bold">AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="text-[10px]">MUTED</span>
                  </>
                )}
              </button>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-900/80 rounded-lg p-1 border border-white/5 text-xs font-semibold">
                {(["uk", "ru", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLocale(l)}
                    className={`px-2.5 py-1 rounded transition-all uppercase ${
                      locale === l
                        ? "bg-amber-500 text-black shadow-sm font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Client Portal Button */}
              <button
                onClick={() => {
                  playSciFiBeep(1100, 0.06);
                  setIsLoginModalOpen(true);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/60 transition-all duration-200"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>{messages.nav?.portalLogin || "Кабінет клієнта"}</span>
              </button>

              {/* CTA Button */}
              <a
                href="#calculator"
                onClick={() => playSciFiBeep(1400, 0.08)}
                className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-gold-glow transition-all duration-300"
              >
                <span>{messages.nav?.orderWorkers || "Замовити персонал"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
                  {(["uk", "ru", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        changeLocale(l);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-1 rounded uppercase ${
                        locale === l
                          ? "bg-amber-500 text-black font-bold"
                          : "text-slate-400"
                      }`}
                    >
                      {l}
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
    </>
  );
};
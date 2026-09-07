import React from "react";
import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ShieldCheck, ArrowRight } from "lucide-react";

export const Footer: React.FC<{ locale: string }> = ({ locale }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[1px] shadow-gold-glow">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  RECRUITER <span className="text-amber-400 font-serif italic">I</span> CLUB
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                  B2B Staffing Ecosystem
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Міжнародна рекрутингова екосистема повного циклу. Офіційний прямий підбір, оформлення дозволів ДЦЗ, віз D та правовий супровід працевлаштування виробничого, будівельного та логістичного персоналу для бізнесу в Україні.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Офіційна ліцензія Державної служби зайнятості</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Навігація</h4>
            <ul className="space-y-2.5">
              <li><a href={`/${locale}#roadmap`} className="hover:text-amber-400 transition-colors">Як ми працюємо</a></li>
              <li><a href={`/${locale}#calculator`} className="hover:text-amber-400 transition-colors">Калькулятор персоналу</a></li>
              <li><a href={`/${locale}#industries`} className="hover:text-amber-400 transition-colors">Галузі підбору</a></li>
              <li><a href={`/${locale}#candidates`} className="hover:text-amber-400 transition-colors">База кандидатів</a></li>
              <li><a href={`/${locale}#knowledge`} className="hover:text-amber-400 transition-colors">База знань B2B</a></li>
              <li><a href={`/${locale}#faq`} className="hover:text-amber-400 transition-colors">Часті питання</a></li>
            </ul>
          </div>

          {/* Col 3: Knowledge Base SILO Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Експертиза & SILO</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href={`/${locale}/knowledge/cost-of-importing-workers-2026`} className="hover:text-amber-400 transition-colors">
                  Скільки коштує найняти робітника
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/knowledge/foreign-employee-taxation-ukraine-2026`} className="hover:text-amber-400 transition-colors">
                  Оподаткування зарплати 2026
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/knowledge/import-timeline-asia-to-ukraine`} className="hover:text-amber-400 transition-colors">
                  Терміни доставки 1–4 міс.
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/knowledge/work-permit-and-trc-guide`} className="hover:text-amber-400 transition-colors">
                  Дозвіл ДЦЗ та посвідка ДМС
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/knowledge/overcoming-language-barrier-on-production`} className="hover:text-amber-400 transition-colors">
                  Модель адаптації 360
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/knowledge/german-job-turbo-and-ikea-refugee-program-lessons`} className="hover:text-amber-400 transition-colors">
                  Досвід Job-Turbo та IKEA
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Контакти B2B</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>м. Київ, вул. Хрещатик, 22, БЦ «Хрещатик Плаза»</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+380501234567" className="hover:text-white">+38 (050) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:office@recruiter-club.com" className="hover:text-white">office@recruiter-club.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Recruiter I Club. Всі права захищено.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Політика конфіденційності</span>
            <span className="hover:text-slate-400 cursor-pointer">Умови надання послуг</span>
            <span className="hover:text-slate-400 cursor-pointer">Договір оферти B2B</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
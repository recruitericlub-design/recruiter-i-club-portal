"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { 
  Calculator, 
  Scan, 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  FileText,
  Building2,
  Sparkles
} from "lucide-react";
import { playSciFiBeep, playMechanicalClick } from "@/lib/soundFX";

interface DockNavigationProps {
  locale?: string;
}

export const DockNavigation: React.FC<DockNavigationProps> = ({ locale = "uk" }) => {
  const dockItems = [
    {
      title: "🇺🇦 Допомога заводам України",
      icon: <Building2 className="h-full w-full text-amber-400" />,
      href: `/${locale}#b2b-trust`,
    },
    {
      title: "Калькулятор окупності та штрафів",
      icon: <Calculator className="h-full w-full text-amber-300" />,
      href: `/${locale}#calculator`,
    },
    {
      title: "3D Рентген-термінал швів",
      icon: <Scan className="h-full w-full text-cyan-400" />,
      href: `/${locale}#terminal`,
    },
    {
      title: "База верифікованих робітників",
      icon: <Users className="h-full w-full text-amber-400" />,
      href: `/${locale}#candidates`,
    },
    {
      title: "100% Військовий імунітет (ст. 23)",
      icon: <ShieldCheck className="h-full w-full text-emerald-400" />,
      href: `/${locale}#mobilization`,
    },
    {
      title: "Експертна консультація (Telegram)",
      icon: <MessageSquare className="h-full w-full text-cyan-300" />,
      href: "https://t.me/recruiter_i_club",
    },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none flex justify-center">
      <div className="pointer-events-auto" onClick={() => playMechanicalClick()}>
        <FloatingDock items={dockItems} />
      </div>
    </div>
  );
};

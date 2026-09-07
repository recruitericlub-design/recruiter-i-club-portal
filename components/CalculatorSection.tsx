"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  Users, 
  Wrench, 
  Globe2, 
  Clock, 
  Coins, 
  Send, 
  CheckCircle2, 
  Building, 
  Phone, 
  Mail, 
  Sparkles,
  Loader2,
  AlertCircle
} from "lucide-react";

interface CalculatorSectionProps {
  messages: any;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ messages }) => {
  const [specialty, setSpecialty] = useState("welders");
  const [workersCount, setWorkersCount] = useState(10);
  const [country, setCountry] = useState("uzbekistan");
  const [experience, setExperience] = useState("3plus");

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [requirements, setRequirements] = useState("");

  const [loading, setLoading] = useState(false);
  const [successDealId, setSuccessDealId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Specialties list
  const specialties = [
    { id: "welders", name: "������������� (MIG/MAG/TIG)", baseSalary: "1 200 � 1 800 �", days: "21�28 ���" },
    { id: "builders", name: "����������� / ����������� / ������", baseSalary: "1 100 � 1 500 �", days: "25�30 ���" },
    { id: "cnc", name: "��������� �������� ��� / �����", baseSalary: "1 400 � 2 100 �", days: "28�35 ���" },
    { id: "warehouse", name: "����������������� / ��䳿 ��������������", baseSalary: "1 000 � 1 350 �", days: "20�25 ���" },
    { id: "meat_factory", name: "���������� �������� ����������", baseSalary: "950 � 1 250 �", days: "21�28 ���" },
    { id: "drivers", name: "��䳿 ������� CE (̳����������)", baseSalary: "1 800 � 2 500 �", days: "30�35 ���" },
  ];

  const currentSpec = useMemo(() => {
    return specialties.find((s) => s.id === specialty) || specialties[0];
  }, [specialty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          phone,
          email,
          city,
          specialty: currentSpec.name,
          workersCount,
          requirements: `�����: ${country}, �����: ${experience}. ���������: ${requirements}`,
          salaryOffered: currentSpec.baseSalary,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "������� �������� ������");
      }

      setSuccessDealId(data.dealId || "DEAL-CREATED");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <Calculator className="w-4 h-4" />
            <span>������������� B2B �����������</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {messages.calculator?.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            {messages.calculator?.subtitle}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/10 space-y-6">
              
              {/* 1. Specialty Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  {messages.calculator?.specialty}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {specialties.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSpecialty(item.id)}
                      className={`p-3 rounded-xl text-left text-xs font-medium transition-all border ${
                        specialty === item.id
                          ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-gold-glow"
                          : "bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Worker Count Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    {messages.calculator?.workersCount}
                  </label>
                  <span className="text-xl font-extrabold text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/30">
                    {workersCount} ���
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={workersCount}
                  onChange={(e) => setWorkersCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>2 ���</span>
                  <span>25 ���</span>
                  <span>50 ���</span>
                  <span>100+ ���</span>
                </div>
              </div>

              {/* 3. Source Region & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-amber-400" />
                    {messages.calculator?.country}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="uzbekistan">???? ���������� (����� ��� D)</option>
                    <option value="india">???? ���� (��������� �������)</option>
                    <option value="philippines">???? Գ����� (������ ���������)</option>
                    <option value="nepal">???? ����� (����������� / ������)</option>
                    <option value="europe">???? ������ ������ (�������, �����)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {messages.calculator?.experience}
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="1plus">³� 1 ���� (����������)</option>
                    <option value="3plus">³� 3 �� 5 ���� (������������)</option>
                    <option value="5plus">����� 5 ���� (������� / � Sous-���)</option>
                  </select>
                </div>
              </div>

              {/* Live Estimates Box */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div>
                  <span className="text-[11px] text-slate-400 block">{messages.calculator?.estTime}</span>
                  <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {currentSpec.days}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">{messages.calculator?.estCost}</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    {currentSpec.baseSalary}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant CRM Lead Submission Form */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-amber-500/20 shadow-2xl relative">
              {successDealId ? (
                <div className="text-center py-10 space-y-5 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {messages.calculator?.successTitle}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    {messages.calculator?.successDesc}
                  </p>
                  <div className="inline-block px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
                    ����� ������ � CRM: <span className="text-amber-400 font-bold">{successDealId}</span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSuccessDealId(null)}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                    >
                      ������ �� ���� ������
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">
                      �������� ����� ��������� �� 15 ������
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    �������� �������� ���� ������� ��� ����������� ������� ������ � ���� ����������:
                  </p>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ����� ������� / ���
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="��� '���-�������'"
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ��������� ����� (ϲ�)
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="��������� ��������"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ����� ��������
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+380..."
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ������������� Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hr@company.com"
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ̳��� ������������ ��?����
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="��� / ������� / ����"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ������� ������ / ���������
                      </label>
                      <input
                        type="text"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="���������: ������ ��������, �������� ����"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>��������� � CRM...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{messages.calculator?.submitBtn}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    ?? ���� ��� �������. ������ ����������� ������������ �� ������������ �������� � CRM.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

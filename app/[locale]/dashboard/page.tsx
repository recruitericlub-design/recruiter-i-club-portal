"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { 
  Building2, 
  Users, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plane, 
  Play, 
  Download, 
  LogOut, 
  ShieldCheck, 
  PlusCircle, 
  AlertCircle, 
  Briefcase, 
  ExternalLink,
  Loader2,
  RefreshCw
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  profession: string;
  country: string;
  status: string;
  videoUrl: string | null;
  resumeUrl: string | null;
  avatar: string | null;
  experienceYears: number | null;
  salaryExpectation: string | null;
  skills: string | null;
  languages: string | null;
  bio: string | null;
}

interface Deal {
  id: string;
  title: string;
  budget: number;
  stageName: string;
  stageColor: string;
  createdAt: string;
  contractDoc: { id: string; name: string; url: string; sizeKb: number } | null;
  contractStatus: string;
  paymentStatus: string;
  requisitionDetails: any;
  responsible: { name: string; email: string; phone: string } | null;
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "uk";

  const [client, setClient] = useState<any>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeTab, setActiveTab] = useState<"candidates" | "contracts" | "new_order">("candidates");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<{ [id: string]: string }>({});
  const [showRejectInput, setShowRejectInput] = useState<{ [id: string]: boolean }>({});
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New requisition form state
  const [newOrderSpecialty, setNewOrderSpecialty] = useState("Зварювальники MIG/MAG");
  const [newOrderCount, setNewOrderCount] = useState(5);
  const [newOrderNotes, setNewOrderNotes] = useState("");
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  useEffect(() => {
    fetchSessionAndData();
  }, []);

  const fetchSessionAndData = async () => {
    setLoading(true);
    try {
      // 1. Check me
      const meRes = await fetch("/api/auth/client-me");
      if (!meRes.ok) {
        router.push(`/${locale}`);
        return;
      }
      const meData = await meRes.json();
      setClient(meData.client);

      // 2. Fetch candidates
      const candRes = await fetch("/api/client/candidates");
      if (candRes.ok) {
        const candData = await candRes.json();
        setCandidates(candData.candidates || []);
      }

      // 3. Fetch deals
      const dealsRes = await fetch("/api/client/deals");
      if (dealsRes.ok) {
        const dealsData = await dealsRes.json();
        setDeals(dealsData.deals || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}`);
    router.refresh();
  };

  const handleCandidateAction = async (candidateId: string, action: "approve" | "reject") => {
    setActionLoading(candidateId);
    setNotification(null);
    try {
      const reason = rejectReason[candidateId] || "";
      const res = await fetch(`/api/client/candidates/${candidateId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка дії");

      setNotification({
        type: "success",
        text: data.message || "Статус успішно оновлено",
      });

      // Update local candidate status
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? { ...c, status: data.newStatus } : c))
      );
      setShowRejectInput((prev) => ({ ...prev, [candidateId]: false }));
    } catch (err: any) {
      setNotification({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleNewOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;
    setOrderSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: client.companyName,
          contactName: client.clientName,
          phone: client.phone || "+380000000000",
          email: client.email || "client@portal.com",
          specialty: newOrderSpecialty,
          workersCount: newOrderCount,
          requirements: newOrderNotes || "Заявка з особистого кабінету B2B",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка створення заявки");

      setNotification({
        type: "success",
        text: `Заявку #${data.dealId} успішно передано до CRM. Рекрутер розпочав відбір анкет.`,
      });

      setNewOrderNotes("");
      setActiveTab("candidates");
      fetchSessionAndData();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message });
    } finally {
      setOrderSubmitting(false);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "screening":
        return { text: "🔍 На розгляді", bg: "bg-slate-800 text-slate-300 border-slate-700" };
      case "approved_by_client":
        return { text: "✅ Утверджено вами", bg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" };
      case "rejected_by_client":
        return { text: "❌ Відхилено (Пошук заміни)", bg: "bg-red-950/80 text-red-300 border-red-500/40" };
      case "visa_d_processing":
        return { text: "📑 Оформлення візи D", bg: "bg-amber-950/80 text-amber-300 border-amber-500/40" };
      case "visa_ready":
        return { text: "✈️ Віза D готова", bg: "bg-blue-950/80 text-blue-300 border-blue-500/40" };
      case "in_transit":
        return { text: "🧳 В дорозі / Квитки куплено", bg: "bg-indigo-950/80 text-indigo-300 border-indigo-500/40" };
      case "working":
        return { text: "🏭 Вийшов на зміну", bg: "bg-teal-950/80 text-teal-300 border-teal-500/40" };
      default:
        return { text: "🔍 Підбір", bg: "bg-slate-800 text-slate-300 border-slate-700" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
        <p className="text-sm text-slate-400">Завантаження кабінету роботодавця...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Portal Header */}
      <header className="bg-slate-900/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-bold text-white tracking-tight hidden sm:inline">
                RECRUITER <span className="text-amber-400 italic">I</span> CLUB
              </span>
            </Link>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            {/* Company Badge */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">
                  {client?.companyName || "ТОВ Роботодавець"}
                </span>
                <span className="text-[10px] text-slate-400">
                  {client?.clientName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSessionAndData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Оновити дані"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Вийти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Portal Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        
        {/* Toast Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center justify-between gap-3 text-sm animate-in fade-in duration-200 ${
              notification.type === "success"
                ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-200"
                : "bg-red-950/70 border-red-500/40 text-red-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{notification.text}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white text-xs underline"
            >
              Закрити
            </button>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("candidates")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "candidates"
                ? "bg-amber-500 text-black shadow-gold-glow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Прикріплені працівники ({candidates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("contracts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "contracts"
                ? "bg-amber-500 text-black shadow-gold-glow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Договори та рахунки ({deals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("new_order")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "new_order"
                ? "bg-amber-500 text-black shadow-gold-glow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Замовити додаткових працівників</span>
          </button>
        </div>

        {/* TAB 1: Candidates Management */}
        {activeTab === "candidates" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Кандидати на затвердження та в процесі релокації
                </h2>
                <p className="text-xs text-slate-400">
                  Натисніть «✅ Утвердити», щоб запустити оформлення візи D, або запросіть безкоштовну заміну.
                </p>
              </div>
            </div>

            {candidates.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
                <Users className="w-12 h-12 text-amber-400/50 mx-auto" />
                <h3 className="text-lg font-bold text-white">Кандидати підбираються</h3>
                <p className="text-xs text-slate-400">
                  Ваш персональний рекрутер проводить співбесіди та записує практичні відеозвіти. Анкети зʼявляться тут протягом найближчих годин.
                </p>
                <button
                  onClick={() => setActiveTab("new_order")}
                  className="px-4 py-2 bg-amber-500 text-black rounded-xl text-xs font-bold shadow-gold-glow"
                >
                  Подати нову потребу
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((cand) => {
                  const badge = getStatusBadge(cand.status);
                  const isActionDisabled = actionLoading === cand.id;

                  return (
                    <div
                      key={cand.id}
                      className="glass-card rounded-2xl p-6 border-white/10 flex flex-col justify-between space-y-4 relative"
                    >
                      <div>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${badge.bg}`}>
                            {badge.text}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            ID: {cand.id.slice(0, 8)}
                          </span>
                        </div>

                        {/* Candidate Details */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                            {cand.avatar ? (
                              <img src={cand.avatar} alt={cand.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold text-lg">
                                {cand.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white leading-tight">
                              {cand.name}
                            </h3>
                            <p className="text-xs text-amber-400 font-medium">
                              {cand.profession || "Спеціаліст"}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {cand.country || "За кордоном"} • {cand.experienceYears ? `${cand.experienceYears} років досвіду` : "Досвід перевірено"}
                            </p>
                          </div>
                        </div>

                        {/* Bio / Skills */}
                        {cand.skills && (
                          <div className="text-xs bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1 mb-4">
                            <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                              Кваліфікація та навички:
                            </span>
                            <p className="text-slate-300 text-[11px]">{cand.skills}</p>
                          </div>
                        )}

                        {/* Media Links: Video Pitch & CV */}
                        <div className="flex items-center gap-2 pt-1 pb-3">
                          {cand.videoUrl ? (
                            <a
                              href={cand.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
                            >
                              <Play className="w-3.5 h-3.5 fill-amber-300" />
                              <span>Відеовізитка</span>
                            </a>
                          ) : (
                            <span className="flex-1 text-center py-2 text-[11px] text-slate-600 bg-slate-950 rounded-lg">
                              Відео готується
                            </span>
                          )}

                          {cand.resumeUrl && (
                            <a
                              href={cand.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Завантажити резюме (PDF)"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Client Action Buttons */}
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        {cand.status === "screening" ? (
                          <>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                disabled={isActionDisabled}
                                onClick={() => handleCandidateAction(cand.id, "approve")}
                                className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                              >
                                {isActionDisabled ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                )}
                                <span>Утвердити</span>
                              </button>

                              <button
                                disabled={isActionDisabled}
                                onClick={() =>
                                  setShowRejectInput((p) => ({ ...p, [cand.id]: !p[cand.id] }))
                                }
                                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-300 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                              >
                                <XCircle className="w-3.5 h-3.5 text-red-400" />
                                <span>Відхилити</span>
                              </button>
                            </div>

                            {/* Reject Reason input slide down */}
                            {showRejectInput[cand.id] && (
                              <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                                <input
                                  type="text"
                                  placeholder="Причина (напр. потрібен досвід TIG)"
                                  value={rejectReason[cand.id] || ""}
                                  onChange={(e) =>
                                    setRejectReason((p) => ({ ...p, [cand.id]: e.target.value }))
                                  }
                                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-red-400"
                                />
                                <button
                                  disabled={isActionDisabled}
                                  onClick={() => handleCandidateAction(cand.id, "reject")}
                                  className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg transition-colors"
                                >
                                  Підтвердити запит на заміну
                                </button>
                              </div>
                            )}
                          </>
                        ) : cand.status === "approved_by_client" ? (
                          <div className="text-center py-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/40 rounded-lg border border-emerald-500/20">
                            Кандидата узгоджено. Документи передано у візовий центр.
                          </div>
                        ) : (
                          <div className="text-center py-1.5 text-xs text-slate-400">
                            Статус оновлюється вашим рекрутером.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Contracts & Documents */}
        {activeTab === "contracts" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Офіційні договори та фінансовий статус
              </h2>
              <p className="text-xs text-slate-400">
                Завантажуйте підписані угоди постачання персоналу та відстежуйте розрахунки.
              </p>
            </div>

            {deals.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto">
                <FileText className="w-12 h-12 text-amber-400/50 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">Немає активних договорів</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Договір формується автоматично після затвердження першої заявки на персонал.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="glass-card rounded-2xl p-6 border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: deal.stageColor }}
                        />
                        <span className="text-xs font-semibold text-slate-400">
                          Етап у CRM: <strong className="text-white">{deal.stageName}</strong>
                        </span>
                        <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md ml-2 font-mono">
                          ID: {deal.id.slice(0, 8)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white">{deal.title}</h3>

                      {deal.requisitionDetails && (
                        <p className="text-xs text-slate-300">
                          Потреба: <strong className="text-amber-400">{deal.requisitionDetails.workersCount} осіб</strong> ({deal.requisitionDetails.specialty})
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                        <span>
                          Сума контракту: <strong className="text-white font-bold">{deal.budget} EUR</strong>
                        </span>
                        <span>
                          Статус оплати:{" "}
                          <strong className={deal.paymentStatus === "paid" ? "text-emerald-400 font-bold" : "text-amber-400"}>
                            {deal.paymentStatus === "paid" ? "✅ Оплачено" : "⏳ Очікує оплати"}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* PDF Download Button */}
                    <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
                      {deal.contractDoc ? (
                        <a
                          href={deal.contractDoc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-gold-glow transition-all"
                        >
                          <Download className="w-4 h-4" />
                          <span>Завантажити договір (PDF)</span>
                        </a>
                      ) : (
                        <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/5 text-xs text-slate-400 text-center">
                          Договір готується юристом
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Direct Requisition Form */}
        {activeTab === "new_order" && (
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-amber-500/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Замовити додатковий персонал</h3>
                  <p className="text-xs text-slate-400">
                    Заявка миттєво додається у воронку відповідального рекрутера вашої компанії.
                  </p>
                </div>
              </div>

              <form onSubmit={handleNewOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Необхідна спеціальність
                  </label>
                  <select
                    value={newOrderSpecialty}
                    onChange={(e) => setNewOrderSpecialty(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Зварювальники MIG/MAG 135/136">Зварювальники MIG/MAG 135/136</option>
                    <option value="Арматурники & Бетонники">Арматурники & Бетонники</option>
                    <option value="Оператори верстатів ЧПК">Оператори верстатів ЧПК</option>
                    <option value="Водії електронавантажувачів (High Reach)">Водії електронавантажувачів (High Reach)</option>
                    <option value="Працівники харчових виробництв">Працівники харчових виробництв</option>
                    <option value="Водії категорії C+E">Водії категорії C+E</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Кількість робітників
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="150"
                    value={newOrderCount}
                    onChange={(e) => setNewOrderCount(Number(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Додаткові специфічні вимоги (мова, читання креслень, локація)
                  </label>
                  <textarea
                    rows={4}
                    value={newOrderNotes}
                    onChange={(e) => setNewOrderNotes(e.target.value)}
                    placeholder="Вкажіть особливості роботи, необхідність інструменту або специфіку графіка змін..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={orderSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all"
                >
                  {orderSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Відправка до CRM...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Надіслати заявку в роботу</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
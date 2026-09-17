import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Search,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Shield,
  Globe2,
  Building2,
  UserRound,
  Info,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { BankSelect, type Bank, NG_BANKS } from "@/components/BankSelect";
import { AmountField } from "@/components/AmountField";
import { BottomSheet } from "@/components/BottomSheet";
import { PinPad } from "@/components/PinPad";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/transfer")({
  head: () => ({
    meta: [
      { title: "Transfer · Payroxa" },
      { name: "description", content: "Send money to any Payroxa user, Nigerian bank account, or globally." },
    ],
  }),
  component: TransferPage,
});

type Tab = "payroxa" | "bank" | "international";

const TABS: { id: Tab; label: string; icon: typeof UserRound }[] = [
  { id: "payroxa", label: "To Payroxa", icon: UserRound },
  { id: "bank", label: "To Bank", icon: Building2 },
  { id: "international", label: "Global", icon: Globe2 },
];

const recentsPayroxa = [
  { name: "Ada Ibeh", handle: "@ada", initials: "AI" },
  { name: "Tolu J.", handle: "@tolu_j", initials: "TJ" },
  { name: "Segun O.", handle: "@segz", initials: "SO" },
];

const recentBanks = [
  { name: "Chidi Okoro", bank: "Kuda MFB", acct: "2087443921", initials: "CO" },
  { name: "Fatima Yusuf", bank: "GTBank", acct: "0221547788", initials: "FY" },
  { name: "Emeka Uba", bank: "Opay", acct: "8102203344", initials: "EU" },
];

function TransferPage() {
  const [tab, setTab] = useState<Tab>("bank");
  const navigate = useNavigate();

  // Bank flow state
  const [bank, setBank] = useState<Bank | null>(NG_BANKS[8]); // Kuda default
  const [acct, setAcct] = useState("");
  const [resolved, setResolved] = useState<{ name: string } | null>(null);
  const [resolving, setResolving] = useState(false);
  const [amount, setAmount] = useState("12,500");
  const [narration, setNarration] = useState("");
  const [saveBene, setSaveBene] = useState(true);

  // Confirm + PIN
  const [review, setReview] = useState(false);
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);

  const onAcctChange = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    setAcct(digits);
    setResolved(null);
    if (digits.length === 10 && bank) {
      setResolving(true);
      setTimeout(() => {
        setResolving(false);
        setResolved({
          name: ["CHIDI OKORO", "FATIMA YUSUF", "EMEKA UBA", "ADA IBEH"][
            Number(digits.slice(-1)) % 4
          ],
        });
      }, 900);
    }
  };

  const canReview = tab === "bank" ? !!resolved && !!amount : true;

  const submitPin = (v: string) => {
    setPin(v);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setReview(false);
      setPin("");
      navigate({ to: "/receipt" });
    }, 1400);
  };

  return (
    <AppShell>
      <PageHeader title="Transfer" subtitle="Send money in seconds" />

      <div className="px-5">
        {/* Tabs */}
        <div className="flex rounded-xl bg-secondary p-1 text-xs font-semibold">
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 transition",
                  active ? "bg-background text-foreground shadow-soft" : "text-muted-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "payroxa" && <PayroxaTab />}
        {tab === "bank" && (
          <BankTab
            bank={bank}
            setBank={setBank}
            acct={acct}
            onAcctChange={onAcctChange}
            resolved={resolved}
            resolving={resolving}
            narration={narration}
            setNarration={setNarration}
            saveBene={saveBene}
            setSaveBene={setSaveBene}
          />
        )}
        {tab === "international" && <InternationalTab />}

        {/* Amount always shown, adapted */}
        <div className="mt-6">
          <AmountField
            defaultValue={amount}
            hint={
              tab === "payroxa"
                ? "No fees on Payroxa → Payroxa transfers."
                : tab === "bank"
                  ? "Free instant transfers to all Nigerian banks."
                  : "FX rate locked at review · 1 USD ≈ ₦1,612"
            }
          />
        </div>

        <button
          disabled={!canReview}
          onClick={() => setReview(true)}
          className={cn(
            "mt-6 w-full rounded-xl py-3.5 text-sm font-semibold transition",
            canReview
              ? "bg-primary text-primary-foreground shadow-primary hover:opacity-95"
              : "bg-secondary text-muted-foreground",
          )}
        >
          Review transfer
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <Shield className="h-3 w-3" /> Secured by Payroxa Safe · CBN licensed
        </p>
      </div>

      {/* Review sheet */}
      <BottomSheet
        open={review}
        onClose={() => {
          setReview(false);
          setPin("");
        }}
        title={pin.length === 0 ? "Confirm transfer" : "Authorize"}
      >
        {pin.length === 0 && !processing && (
          <>
            <div className="rounded-2xl bg-secondary/60 p-4">
              <p className="text-center text-xs text-muted-foreground">You're sending</p>
              <p className="mt-1 text-center text-3xl font-semibold tracking-tight text-foreground">
                ₦{amount}
              </p>
              <p className="mt-0.5 text-center text-[11px] text-muted-foreground">Fee ₦0.00</p>
            </div>

            <dl className="mt-4 space-y-3 rounded-2xl border border-border p-4 text-sm">
              <Row k="Recipient" v={resolved?.name ?? "Ada Ibeh"} />
              <Row k="Bank" v={bank?.name ?? "Payroxa"} />
              <Row k="Account" v={acct || "@ada"} mono />
              <Row k="Narration" v={narration || "Transfer"} />
              <Row k="Arrives" v="Instant" success />
            </dl>

            <button
              onClick={() => setPin(" ")}
              className="mt-5 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-primary"
            >
              Slide to send · ₦{amount}
            </button>
            <button
              onClick={() => setReview(false)}
              className="mt-2 w-full rounded-xl py-3 text-sm font-medium text-muted-foreground"
            >
              Edit details
            </button>
          </>
        )}

        {pin.length > 0 && !processing && (
          <div className="pt-2">
            <PinPad
              value={pin.trim()}
              onChange={(v) => setPin(v || " ")}
              onComplete={submitPin}
            />
          </div>
        )}

        {processing && (
          <div className="flex flex-col items-center gap-3 py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground">Processing transfer…</p>
            <p className="text-xs text-muted-foreground">Do not close this window</p>
          </div>
        )}
      </BottomSheet>
    </AppShell>
  );
}

function Row({
  k,
  v,
  mono,
  success,
}: {
  k: string;
  v: string;
  mono?: boolean;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{k}</dt>
      <dd
        className={cn(
          "truncate text-right text-sm font-semibold text-foreground",
          mono && "font-mono tracking-wider",
          success && "text-success",
        )}
      >
        {v}
      </dd>
    </div>
  );
}

/* ------------------------------ TAB PANELS ------------------------------ */

function PayroxaTab() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search @username, phone or email"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <p className="mb-3 mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Users className="h-3 w-3" /> Recent
      </p>

      <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
        {recentsPayroxa.map((r, i) => (
          <button
            key={r.handle}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-left",
              i !== 0 && "border-t border-border/60",
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
              {r.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-[11px] text-muted-foreground">{r.handle}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function BankTab({
  bank,
  setBank,
  acct,
  onAcctChange,
  resolved,
  resolving,
  narration,
  setNarration,
  saveBene,
  setSaveBene,
}: {
  bank: Bank | null;
  setBank: (b: Bank) => void;
  acct: string;
  onAcctChange: (v: string) => void;
  resolved: { name: string } | null;
  resolving: boolean;
  narration: string;
  setNarration: (v: string) => void;
  saveBene: boolean;
  setSaveBene: (v: boolean) => void;
}) {
  return (
    <div className="mt-4 space-y-3">
      <BankSelect value={bank} onChange={setBank} />

      <div className="rounded-xl border border-border bg-card px-3.5 py-3">
        <label className="block text-[11px] font-medium text-muted-foreground">
          Account number
        </label>
        <input
          inputMode="numeric"
          value={acct}
          onChange={(e) => onAcctChange(e.target.value)}
          placeholder="10-digit NUBAN"
          className="mt-0.5 w-full bg-transparent text-base font-semibold tracking-wider text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/60"
        />
        <div className="mt-1 flex min-h-[18px] items-center gap-1.5 text-[11px]">
          {resolving && (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              <span className="text-muted-foreground">Verifying account…</span>
            </>
          )}
          {resolved && !resolving && (
            <>
              <CheckCircle2 className="h-3 w-3 text-success" />
              <span className="font-semibold uppercase text-success">{resolved.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card px-3.5 py-3">
        <label className="block text-[11px] font-medium text-muted-foreground">
          Narration (optional)
        </label>
        <input
          value={narration}
          onChange={(e) => setNarration(e.target.value.slice(0, 60))}
          placeholder="What's this for?"
          className="mt-0.5 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      <label className="flex items-center gap-2.5 px-1 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={saveBene}
          onChange={(e) => setSaveBene(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-[var(--primary)]"
        />
        Save as beneficiary for faster next time
      </label>

      <div>
        <p className="mb-2 mt-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Users className="h-3 w-3" /> Recent beneficiaries
        </p>
        <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
          {recentBanks.map((r, i) => (
            <button
              key={r.acct}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left",
                i !== 0 && "border-t border-border/60",
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                {r.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {r.bank} · {r.acct.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternationalTab() {
  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-[11px] font-medium text-muted-foreground">Destination country</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {[
            { f: "🇺🇸", c: "USA" },
            { f: "🇬🇧", c: "UK" },
            { f: "🇨🇦", c: "CA" },
            { f: "🇬🇭", c: "GHA" },
            { f: "🇰🇪", c: "KEN" },
            { f: "🇿🇦", c: "ZA" },
            { f: "🇪🇺", c: "EU" },
            { f: "🇦🇪", c: "UAE" },
          ].map((x, i) => (
            <button
              key={x.c}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border p-2 text-[11px] font-semibold transition",
                i === 0
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border text-foreground",
              )}
            >
              <span className="text-lg leading-none">{x.f}</span>
              {x.c}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card px-3.5 py-3">
        <label className="block text-[11px] font-medium text-muted-foreground">
          Recipient full name
        </label>
        <input
          placeholder="As on government ID"
          className="mt-0.5 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </div>
      <div className="rounded-xl border border-border bg-card px-3.5 py-3">
        <label className="block text-[11px] font-medium text-muted-foreground">
          IBAN / Routing / SWIFT
        </label>
        <input
          placeholder="Enter account details"
          className="mt-0.5 w-full bg-transparent text-sm font-mono text-foreground outline-none placeholder:font-sans placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3">
        <Info className="mt-0.5 h-4 w-4 flex-none text-warning" />
        <p className="text-[11px] leading-relaxed text-foreground/80">
          International settlements clear in 1–2 business days. FX rate is locked at review.
          KYC Tier&nbsp;3 required for transfers above $2,000.
        </p>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const TITLE = "The Legal Notice Board — Recent public notices (trial layout)";
const DESC =
  "A broadsheet-style stream of recently posted legal public notices across India, searchable by state, category and date.";

export const Route = createFileRoute("/home_/newspaper_v1")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewspaperHome,
});

type Base = { category: string; state: string; city: string; titles: string; body: string };

const BASES: Base[] = [
  {
    category: "Property Title",
    state: "Karnataka",
    city: "Bengaluru",
    titles: "Title Investigation: Survey No. 42/3, Varthur Hobli, Bengaluru East",
    body: "Notice is hereby given that my client intends to purchase the schedule property bearing Survey No. 42/3, Varthur Hobli, Bengaluru East Taluk, from its present owners. Any person having any claim, right, title or interest by way of sale, mortgage, lease, lien, gift or inheritance shall notify the undersigned in writing within 14 days with supporting documents, failing which the transaction shall be completed.",
  },
  {
    category: "Bank / SARFAESI",
    state: "Maharashtra",
    city: "Mumbai",
    titles: "Possession Notice under SARFAESI Act: Flat 402, Andheri East",
    body: "Whereas the authorised officer of the bank issued a demand notice under Section 13(2) of the SARFAESI Act, 2002 calling upon the borrower to repay the outstanding amount within 60 days, and the borrower having failed to repay, notice is hereby given that the bank has taken symbolic possession of the property described herein. The public is cautioned not to deal with the property.",
  },
  {
    category: "Court Notice",
    state: "Delhi",
    city: "New Delhi",
    titles: "Summons: Civil Suit before the District Court, Saket",
    body: "Take notice that a civil suit for recovery has been instituted against you before the Court of the Civil Judge, Saket. You are hereby summoned to appear in person or through a duly instructed advocate on the next date of hearing, failing which the matter shall be heard and decided in your absence. Copies of the plaint may be collected from the court registry during working hours.",
  },
  {
    category: "Lost Documents",
    state: "Tamil Nadu",
    city: "Chennai",
    titles: "Lost Share Certificate: Folio No. A-10482, Certificate Nos. 5521–5530",
    body: "Notice is hereby given that the original share certificates bearing the above numbers registered in the name of the undersigned have been lost and are not traceable. Application has been made to the company for issue of duplicate certificates. Any person having a claim in respect of the said shares should lodge it with the company within 15 days, after which duplicates will be issued.",
  },
];

const STATES = [...new Set(BASES.map((b) => b.state))];
const CATS = [...new Set(BASES.map((b) => b.category))];
const DATES = { today: 0, "7d": 7, "30d": 30 } as const;
const DATE_LABEL = { today: "Today", "7d": "Last 7 days", "30d": "Last 30 days" };

/** Deterministic PRNG so server and browser render the same lengths. */
function rand(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const between = (seed: number, min: number, max: number) => min + Math.floor(rand(seed) * (max - min + 1));

function clip(text: string, len: number) {
  if (text.length <= len) return text;
  const cut = text.slice(0, len);
  const sp = cut.lastIndexOf(" ");
  return (sp > len * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:\s]+$/, "") + (len < text.length ? "…" : "");
}

type Item = Base & { id: string; title: string; text: string; daysAgo: number; index: number };

function makeItem(i: number): Item {
  const b = BASES[i % BASES.length]!;
  return {
    ...b,
    index: i,
    id: `LNB-2026-${String(4800 + i).padStart(6, "0")}`,
    title: clip(b.titles, between(i * 7 + 1, 5, 30)),
    text: clip(b.body, between(i * 13 + 3, 50, 300)),
    daysAgo: Math.floor(i / 3),
  };
}

const BATCH = 12;
const TODAY = new Date(Date.UTC(2026, 10, 24));
const fmt = (daysAgo: number) =>
  new Date(TODAY.getTime() - daysAgo * 86400000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

function NewspaperHome() {
  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [cat, setCat] = useState("");
  const [date, setDate] = useState<"" | keyof typeof DATES>("");
  const [count, setCount] = useState(BATCH * 2);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const out: Item[] = [];
    // scan generated stream until we have `count` matches (cap to avoid runaway on empty filters)
    for (let i = 0; out.length < count && i < count * 8; i++) {
      const it = makeItem(i);
      if (state && it.state !== state) continue;
      if (cat && it.category !== cat) continue;
      if (date && it.daysAgo > DATES[date]) continue;
      const s = q.trim().toLowerCase();
      if (s && !`${it.id} ${it.title} ${it.text} ${it.city}`.toLowerCase().includes(s)) continue;
      out.push(it);
    }
    return out;
  }, [q, state, cat, date, count]);

  const exhausted = items.length < count;

  useEffect(() => setCount(BATCH * 2), [q, state, cat, date]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || exhausted) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !timer) {
        setLoading(true);
        timer = setTimeout(() => {
          setCount((c) => c + BATCH);
          setLoading(false);
          timer = undefined;
        }, 400);
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [exhausted, items.length]);

  const sel = "h-10 rounded-sm border border-foreground/30 bg-card px-2 text-sm";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto max-w-7xl px-4 pt-6">
        <div className="flex items-center justify-between border-b border-foreground/20 pb-2 font-mono text-xs text-muted-foreground">
          <span>Tuesday, 24 November 2026 · IST</span>
          <span>All-India Edition · Public record</span>
        </div>
        <h1 className="py-5 text-center font-serif text-4xl font-bold uppercase tracking-tight sm:text-6xl">
          The Legal Notice Board
        </h1>
        <p className="smallcaps -mt-3 pb-3 text-center text-xs text-muted-foreground">
          Permanent · Searchable · Verified public notices of India
        </p>
        <div className="border-y-4 border-double border-foreground" />
      </header>

      <div className="sticky top-0 z-10 border-b border-foreground/20 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notice ID, property, city…"
              aria-label="Search notices"
              className={`${sel} w-full pl-9`}
            />
          </div>
          <select aria-label="State" value={state} onChange={(e) => setState(e.target.value)} className={sel}>
            <option value="">All states</option>
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)} className={sel}>
            <option value="">All categories</option>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select aria-label="Date" value={date} onChange={(e) => setDate(e.target.value as typeof date)} className={sel}>
            <option value="">Any date</option>
            {Object.entries(DATE_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <Link to="/post-a-notice" className="h-10 rounded-sm bg-primary px-4 text-sm font-medium leading-10 text-primary-foreground">
            Post a notice
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="smallcaps mb-4 border-b border-foreground pb-1 text-sm font-semibold">Recently posted notices</h2>
        {items.length === 0 ? (
          <p className="py-16 text-center font-serif text-xl text-muted-foreground">No notices match these filters.</p>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-rule:1px_solid_var(--border)]">
            {items.map((n) => (
              <article key={n.index} className="mb-6 break-inside-avoid border-b border-foreground/20 pb-5">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="smallcaps font-semibold text-primary">{n.category}</span>
                  <span className="font-mono text-muted-foreground">{n.id}</span>
                </div>
                {n.index % 3 === 0 && (
                  <div className="mt-3 flex aspect-[16/9] items-center justify-center border border-dashed border-foreground/30 bg-secondary/50 text-muted-foreground">
                    <FileText className="h-8 w-8" aria-hidden="true" />
                    <span className="sr-only">Image placeholder</span>
                  </div>
                )}
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">{n.title}</h3>
                <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-foreground/85">{n.text}</p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  {n.city}, {n.state} · {fmt(n.daysAgo)}
                </p>
              </article>
            ))}
          </div>
        )}
        <div ref={sentinel} className="flex h-16 items-center justify-center text-sm text-muted-foreground">
          {loading && (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading older notices…</>)}
          {exhausted && items.length > 0 && "End of matching notices"}
        </div>
      </main>
    </div>
  );
}

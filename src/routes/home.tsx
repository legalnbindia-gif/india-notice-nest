import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { NoticeCard } from "@/components/site/NoticeCard";
import { PortalFooter, PortalHeader } from "@/components/site/PortalHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  CATEGORIES,
  INDIAN_STATES,
  NOTICES,
  PERIODS,
  PUBLISHER_TYPES,
  SORTS,
  filterNotices,
  getCategory,
  parseNoticeFilters,
  type NoticeFilters,
} from "@/lib/notices";
import { cn } from "@/lib/utils";

const TITLE = "Search legal public notices across India — Legal Notice Board";
const DESCRIPTION =
  "Search, filter and read published legal notices: property title investigations, lost documents, court notices, corporate filings and more.";

export const Route = createFileRoute("/home")({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>): NoticeFilters => parseNoticeFilters(search),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoticePortal,
});

const ALL = "__all";
const STATES_WITH_NOTICES = INDIAN_STATES.filter((s) => NOTICES.some((n) => n.state === s));

function withFilter<K extends keyof NoticeFilters>(
  prev: NoticeFilters,
  key: K,
  value: NoticeFilters[K] | undefined,
): NoticeFilters {
  const next: NoticeFilters = { ...prev };
  if (value === undefined || value === "") delete next[key];
  else next[key] = value;
  return next;
}

function NoticePortal() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(filters.q ?? "");

  useEffect(() => setQuery(filters.q ?? ""), [filters.q]);

  const results = filterNotices(NOTICES, filters);
  const active = (["category", "state", "publisher", "period"] as const).filter((k) => filters[k]);

  const set = <K extends keyof NoticeFilters>(key: K, value: NoticeFilters[K] | undefined) =>
    navigate({ search: (prev) => withFilter(prev, key, value), replace: true, resetScroll: false });

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    set("q", query.trim() || undefined);
  };

  const filterPanel = <FilterPanel filters={filters} set={set} />;

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:pt-16">
          <p className="smallcaps text-sm font-medium text-primary">Public notice record</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Search legal public notices across India
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search by name, property, company, case number, city or notice reference.
          </p>
          <form onSubmit={onSearch} className="mt-7 flex max-w-3xl gap-2" role="search">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Varthur, share certificate, LNB-2026-004812"
                aria-label="Search notices"
                maxLength={120}
                className="h-12 rounded-sm bg-card pl-10 text-base"
              />
            </div>
            <Button type="submit" className="h-12 rounded-sm px-6">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            <CategoryChip active={!filters.category} onClick={() => set("category", undefined)}>
              All notices
            </CategoryChip>
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c.slug}
                active={filters.category === c.slug}
                onClick={() => set("category", filters.category === c.slug ? undefined : c.slug)}
              >
                {c.name}
              </CategoryChip>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        <section aria-label="Results">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/80 pb-3">
            <p className="text-sm">
              <span className="font-semibold">{results.length}</span>{" "}
              {results.length === 1 ? "notice" : "notices"}
              {filters.q && (
                <>
                  {" "}
                  for “<span className="font-medium">{filters.q}</span>”
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters{active.length ? ` (${active.length})` : ""}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter notices</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-6">{filterPanel}</div>
                </SheetContent>
              </Sheet>
              <Select
                value={filters.sort ?? "newest"}
                onValueChange={(v) =>
                  set("sort", v === "newest" ? undefined : (v as NoticeFilters["sort"]))
                }
              >
                <SelectTrigger className="h-9 w-[220px] rounded-sm bg-card" aria-label="Sort by">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SORTS).map(([k, label]) => (
                    <SelectItem key={k} value={k}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(active.length > 0 || filters.q) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {filters.q && <ActiveChip label={`“${filters.q}”`} onClear={() => set("q", undefined)} />}
              {filters.category && (
                <ActiveChip
                  label={getCategory(filters.category).name}
                  onClear={() => set("category", undefined)}
                />
              )}
              {filters.state && (
                <ActiveChip label={filters.state} onClear={() => set("state", undefined)} />
              )}
              {filters.publisher && (
                <ActiveChip
                  label={PUBLISHER_TYPES[filters.publisher]}
                  onClear={() => set("publisher", undefined)}
                />
              )}
              {filters.period && (
                <ActiveChip
                  label={PERIODS[filters.period].label}
                  onClear={() => set("period", undefined)}
                />
              )}
              <button
                type="button"
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                onClick={() =>
                  navigate({
                    search: filters.sort ? { sort: filters.sort } : {},
                    replace: true,
                    resetScroll: false,
                  })
                }
              >
                Clear all
              </button>
            </div>
          )}

          {results.length > 0 ? (
            <div className="mt-6 space-y-4">
              {results.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-dashed border-border p-10 text-center">
              <p className="font-serif text-2xl">No notices match your search</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try fewer words, a different category, or clear the filters.
              </p>
              <Button variant="outline" className="mt-5" asChild>
                <Link to="/home">Show all notices</Link>
              </Button>
            </div>
          )}

          <div className="mt-12 flex flex-col items-start justify-between gap-5 border border-foreground/80 bg-card p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Need to publish a notice?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Submit it once. After verification it stays on the public record, searchable
                nationwide.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-sm">
              <Link to="/post-a-notice">
                Post a notice <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <PortalFooter />
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-foreground/80 hover:border-foreground/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-1 text-xs">
      {label}
      <button type="button" onClick={onClear} aria-label={`Remove ${label}`} className="hover:text-primary">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function FilterPanel({
  filters,
  set,
}: {
  filters: NoticeFilters;
  set: <K extends keyof NoticeFilters>(key: K, value: NoticeFilters[K] | undefined) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <p className="smallcaps text-sm text-muted-foreground">Category</p>
        <ul className="mt-2 space-y-0.5">
          {CATEGORIES.map((c) => {
            const count = NOTICES.filter((n) => n.category === c.slug).length;
            const active = filters.category === c.slug;
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => set("category", active ? undefined : c.slug)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm transition-colors",
                    active ? "bg-primary/10 font-medium text-primary" : "hover:bg-secondary",
                  )}
                >
                  <span>{c.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-2">
        <Label className="smallcaps text-sm font-normal text-muted-foreground">State</Label>
        <Select value={filters.state ?? ALL} onValueChange={(v) => set("state", v === ALL ? undefined : v)}>
          <SelectTrigger className="w-full rounded-sm bg-card" aria-label="State">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All states</SelectItem>
            {STATES_WITH_NOTICES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="smallcaps text-sm font-normal text-muted-foreground">Published by</Label>
        <Select
          value={filters.publisher ?? ALL}
          onValueChange={(v) =>
            set("publisher", v === ALL ? undefined : (v as NoticeFilters["publisher"]))
          }
        >
          <SelectTrigger className="w-full rounded-sm bg-card" aria-label="Published by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Anyone</SelectItem>
            {Object.entries(PUBLISHER_TYPES).map(([k, label]) => (
              <SelectItem key={k} value={k}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="smallcaps text-sm font-normal text-muted-foreground">Published</Label>
        <Select
          value={filters.period ?? ALL}
          onValueChange={(v) => set("period", v === ALL ? undefined : (v as NoticeFilters["period"]))}
        >
          <SelectTrigger className="w-full rounded-sm bg-card" aria-label="Published">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Any time</SelectItem>
            {Object.entries(PERIODS).map(([k, p]) => (
              <SelectItem key={k} value={k}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

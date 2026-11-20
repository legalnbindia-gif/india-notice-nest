import { createFileRoute } from "@tanstack/react-router";
import { BookLock, Mail, Search, ShieldCheck } from "lucide-react";

import { Seal } from "@/components/site/Seal";
import { CATEGORIES } from "@/lib/notices";

const TITLE = "Legal Notice Board — Coming soon to India";
const DESCRIPTION =
  "Legal public notices are moving from scattered print newspapers to one permanent, searchable, verified online record for businesses and individuals across India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: ComingSoon,
});

const BENEFITS = [
  {
    numeral: "I",
    icon: BookLock,
    title: "Permanent record",
    text: "A notice published once stays on record — dated, referenced and retrievable years later, long after the newspaper has been discarded.",
  },
  {
    numeral: "II",
    icon: Search,
    title: "Nationwide search",
    text: "Search every notice across every state by name, property, company, court case or reference number, from one place.",
  },
  {
    numeral: "III",
    icon: ShieldCheck,
    title: "Verification",
    text: "Every publisher is identified — advocates, companies, banks and individuals — so readers can trust who stands behind a notice.",
  },
];

const PRINT_TODAY = [
  "Spread across hundreds of editions, cities and languages",
  "Read for a day, then lost with the newspaper",
  "Difficult to find, and harder to prove, years later",
  "No easy way to know who published a notice",
];

const ONLINE_SOON = [
  "One centralised record for the whole country",
  "Permanently available, with a fixed reference number",
  "Searchable by anyone, at any time, at no cost to read",
  "Publishers verified before a notice appears",
];

function ComingSoon() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-2.5 font-mono text-xs text-muted-foreground">
          <span>legalnoticeboard.com</span>
          <span>India · Est. 2026</span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-5">
        {/* Masthead */}
        <section className="flex flex-col items-center pb-16 pt-16 text-center sm:pt-24">
          <Seal className="h-16 w-16 sm:h-20 sm:w-20" />
          <p className="smallcaps mt-6 text-sm font-medium text-primary">Coming soon</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
            Legal Notice Board
          </h1>
          <div className="rule-double mt-8 w-full max-w-xl" />
          <p className="mt-6 font-serif text-xl italic text-muted-foreground sm:text-2xl">
            Every public notice in India, permanently on the record.
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            For decades, legal public notices have been printed in newspapers — scattered across
            editions and cities, read for a day, and then lost. Legal Notice Board is building one
            centralised, permanent and searchable home for them, so that businesses and everyday
            individuals can publish a notice once and anyone can find it, anytime.
          </p>
        </section>

        {/* From print to record */}
        <section aria-labelledby="transition" className="border-t border-foreground/80 py-14">
          <h2 id="transition" className="text-center text-3xl font-semibold sm:text-4xl">
            From the newspaper to the record
          </h2>
          <div className="mt-10 grid border border-border md:grid-cols-2">
            <div className="border-b border-border p-7 md:border-b-0 md:border-r">
              <p className="smallcaps text-sm text-muted-foreground">Today, in print</p>
              <ul className="mt-5 space-y-3.5">
                {PRINT_TODAY.map((t) => (
                  <li key={t} className="flex gap-3 text-foreground/75">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-muted-foreground" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-7">
              <p className="smallcaps text-sm text-primary">Soon, on Legal Notice Board</p>
              <ul className="mt-5 space-y-3.5">
                {ONLINE_SOON.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section aria-labelledby="categories" className="border-t border-border py-14 text-center">
          <h2 id="categories" className="text-3xl font-semibold sm:text-4xl">
            Notices we will carry
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            The everyday legal notices that individuals, advocates, companies and banks publish.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map((c) => (
              <li
                key={c.slug}
                className="rounded-sm border border-foreground/25 bg-card px-3.5 py-1.5 text-sm"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits" className="border-t border-border py-14">
          <h2 id="benefits" className="sr-only">
            Core benefits
          </h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-0">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className={i > 0 ? "md:border-l md:border-border md:pl-8" : "md:pr-8"}
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg italic text-brass">{b.numeral}.</span>
                  <b.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h3 className="mt-3 text-2xl font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          aria-labelledby="contact"
          className="mb-16 border border-foreground/80 bg-card px-6 py-12 text-center"
        >
          <h2 id="contact" className="text-3xl font-semibold">
            Write to us
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Advocates, companies, banks, publishers and members of the public are welcome to get in
            touch ahead of launch.
          </p>
          <a
            href="mailto:hello@legalnoticeboard.com"
            className="mt-6 inline-flex items-center gap-2 font-serif text-xl text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary sm:text-2xl"
          >
            <Mail className="h-5 w-5" aria-hidden />
            hello@legalnoticeboard.com
          </a>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Legal Notice Board</span>
          <span className="font-mono">legalnoticeboard.com</span>
        </div>
      </footer>
    </div>
  );
}

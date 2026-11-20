import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Link2, Printer } from "lucide-react";
import { toast } from "sonner";

import { CategoryTag, NoticeCard, ObjectionStatus } from "@/components/site/NoticeCard";
import { PortalFooter, PortalHeader } from "@/components/site/PortalHeader";
import { Button } from "@/components/ui/button";
import {
  NOTICES,
  PUBLISHER_TYPES,
  formatDate,
  getCategory,
  getNotice,
  objectionDeadline,
  publishedDate,
} from "@/lib/notices";

export const Route = createFileRoute("/notices/$noticeId")({
  loader: ({ params }) => {
    const notice = getNotice(params.noticeId);
    if (!notice) throw notFound();
    return { notice };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Notice not found — Legal Notice Board" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const n = loaderData.notice;
    const title = `${n.title} — Legal Notice Board`;
    return {
      meta: [
        { title },
        { name: "description", content: n.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: n.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NoticeNotFound,
  component: NoticeDetail,
});

function NoticeNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-4xl font-semibold">Notice not found</h1>
        <p className="mt-3 text-muted-foreground">
          There is no notice with that reference number. Check the number and try again.
        </p>
        <Button asChild className="mt-6">
          <Link to="/home">Search notices</Link>
        </Button>
      </main>
    </div>
  );
}

function NoticeDetail() {
  const { notice } = Route.useLoaderData();
  const deadline = objectionDeadline(notice);
  const related = NOTICES.filter((n) => n.category === notice.category && n.id !== notice.id).slice(0, 2);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          to="/home"
          className="no-print inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All notices
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
          <article className="border border-foreground/80 bg-card px-6 py-8 sm:px-12 sm:py-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CategoryTag notice={notice} />
              <span className="font-mono text-xs text-muted-foreground">{notice.id}</span>
            </div>
            <p className="smallcaps mt-8 text-center text-sm tracking-[0.3em] text-muted-foreground">
              Public notice
            </p>
            <h1 className="mt-3 text-center text-3xl font-semibold leading-tight sm:text-4xl">
              {notice.title}
            </h1>
            <div className="rule-double mx-auto mt-6 max-w-xs" />

            <div className="mt-8 space-y-5 font-serif text-lg leading-relaxed text-foreground/90">
              {notice.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {notice.schedule && (
              <div className="mt-8">
                <p className="smallcaps text-center text-sm text-muted-foreground">Schedule</p>
                <dl className="mt-3 divide-y divide-border border-y border-border">
                  {notice.schedule.map((s) => (
                    <div key={s.label} className="grid gap-1 py-2.5 sm:grid-cols-[160px_1fr] sm:gap-4">
                      <dt className="text-sm text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-10 text-right">
              <p className="font-serif text-lg font-semibold">{notice.publisher.name}</p>
              <p className="text-sm text-muted-foreground">{notice.publisher.detail}</p>
              <p className="text-sm text-muted-foreground">{notice.publisher.address}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {notice.city}, {formatDate(publishedDate(notice))}
              </p>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border border-border bg-card p-5">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="smallcaps text-muted-foreground">Reference</dt>
                  <dd className="mt-0.5 font-mono">{notice.id}</dd>
                </div>
                <div>
                  <dt className="smallcaps text-muted-foreground">Published</dt>
                  <dd className="mt-0.5">{formatDate(publishedDate(notice))}</dd>
                </div>
                <div>
                  <dt className="smallcaps text-muted-foreground">Category</dt>
                  <dd className="mt-0.5">{getCategory(notice.category).name}</dd>
                </div>
                <div>
                  <dt className="smallcaps text-muted-foreground">Location</dt>
                  <dd className="mt-0.5">
                    {notice.city}, {notice.state}
                  </dd>
                </div>
                {deadline && (
                  <div>
                    <dt className="smallcaps text-muted-foreground">Objections / claims</dt>
                    <dd className="mt-1">
                      <ObjectionStatus notice={notice} />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Within {notice.objectionDays} days of publication
                      </p>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="border border-seal/40 bg-seal/5 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-seal">
                <BadgeCheck className="h-4 w-4" /> Verified publisher
              </p>
              <p className="mt-2 text-sm">{notice.publisher.name}</p>
              <p className="text-xs text-muted-foreground">
                {PUBLISHER_TYPES[notice.publisher.type]} · {notice.verification}
              </p>
            </div>

            <div className="no-print flex gap-2">
              <Button variant="outline" className="flex-1 rounded-sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button variant="outline" className="flex-1 rounded-sm" onClick={copyLink}>
                <Link2 className="h-4 w-4" /> Copy link
              </Button>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="no-print mt-16">
            <h2 className="border-b border-foreground/80 pb-3 text-2xl font-semibold">
              More in {getCategory(notice.category).name}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          </section>
        )}
      </main>
      <PortalFooter />
    </div>
  );
}

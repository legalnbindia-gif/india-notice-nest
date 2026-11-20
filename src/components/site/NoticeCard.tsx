import { Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarDays, MapPin } from "lucide-react";

import {
  formatDate,
  getCategory,
  isObjectionOpen,
  objectionDeadline,
  publishedDate,
  type Notice,
} from "@/lib/notices";

export function CategoryTag({ notice }: { notice: Pick<Notice, "category"> }) {
  return (
    <span className="smallcaps inline-flex items-center rounded-sm border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
      {getCategory(notice.category).name}
    </span>
  );
}

export function ObjectionStatus({ notice }: { notice: Notice }) {
  const deadline = objectionDeadline(notice);
  if (!deadline) return null;
  const open = isObjectionOpen(notice);
  return (
    <span
      className={
        open
          ? "inline-flex items-center gap-1.5 text-xs font-medium text-seal"
          : "inline-flex items-center gap-1.5 text-xs text-muted-foreground"
      }
    >
      <span className={open ? "h-1.5 w-1.5 rounded-full bg-seal" : "h-1.5 w-1.5 rounded-full bg-muted-foreground/50"} />
      {open ? `Objections open until ${formatDate(deadline)}` : `Objections closed ${formatDate(deadline)}`}
    </span>
  );
}

export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className="group relative border border-border bg-card p-5 transition-colors hover:border-foreground/40 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CategoryTag notice={notice} />
        <span className="font-mono text-xs text-muted-foreground">{notice.id}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground">
        <Link
          to="/notices/$noticeId"
          params={{ noticeId: notice.id }}
          className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"
        >
          {notice.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{notice.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(publishedDate(notice))}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {notice.city}, {notice.state}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BadgeCheck className="h-3.5 w-3.5 text-seal" />
          {notice.publisher.name}
        </span>
        <ObjectionStatus notice={notice} />
      </div>
    </article>
  );
}

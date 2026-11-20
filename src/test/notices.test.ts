import { describe, expect, it } from "vitest";

import { NOTICES, filterNotices, getNotice, parseNoticeFilters } from "@/lib/notices";
import { publisherStepSchema } from "@/lib/post-notice";

const NOW = new Date("2026-11-20T12:00:00+05:30");

describe("notice search", () => {
  it("finds a notice by its reference number", () => {
    const r = filterNotices(NOTICES, { q: "LNB-2026-004812" }, NOW);
    expect(r.map((n) => n.id)).toEqual(["LNB-2026-004812"]);
  });

  it("filters by category", () => {
    const r = filterNotices(NOTICES, { category: "lost-documents" }, NOW);
    expect(r.length).toBe(3);
    expect(r.every((n) => n.category === "lost-documents")).toBe(true);
  });

  it("only returns notices from the chosen period", () => {
    const r = filterNotices(NOTICES, { period: "7d" }, NOW);
    expect(r.map((n) => n.id)).toEqual(["LNB-2026-004812", "LNB-2026-004798"]);
  });

  it("lists newest first by default", () => {
    const r = filterNotices(NOTICES, {}, NOW);
    expect(r[0]?.id).toBe("LNB-2026-004812");
    expect(r.at(-1)?.id).toBe("LNB-2026-004467");
  });

  it("ignores unknown filter values in the address bar", () => {
    expect(parseNoticeFilters({ category: "nonsense", state: "Atlantis", q: "deed" })).toEqual({ q: "deed" });
  });

  it("looks up notices case-insensitively", () => {
    expect(getNotice("lnb-2026-004812")?.city).toBe("Bengaluru");
  });
});

describe("post a notice", () => {
  const base = { name: "Meera Krishnan", type: "advocate", registration: "", email: "m@example.com", phone: "+91 98765 43210" };

  it("requires an enrolment number from advocates", () => {
    expect(publisherStepSchema.safeParse(base).success).toBe(false);
    expect(publisherStepSchema.safeParse({ ...base, registration: "KAR/2194/2009" }).success).toBe(true);
  });

  it("rejects mobile numbers that aren't Indian", () => {
    expect(publisherStepSchema.safeParse({ ...base, registration: "KAR/1", phone: "12345" }).success).toBe(false);
  });
});

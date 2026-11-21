import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CircleCheckBig } from "lucide-react";
import { useState, type ReactNode } from "react";

import { PortalFooter, PortalHeader } from "@/components/site/PortalHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, INDIAN_STATES, PUBLISHER_TYPES, getCategory, type CategorySlug } from "@/lib/notices";
import {
  OBJECTION_OPTIONS,
  categoryStepSchema,
  collectErrors,
  declarationSchema,
  detailsStepSchema,
  publisherStepSchema,
  type FieldErrors,
} from "@/lib/post-notice";
import { cn } from "@/lib/utils";

const TITLE = "Post a legal public notice — Legal Notice Board";
const DESCRIPTION =
  "Submit a legal public notice for verification and permanent, searchable publication across India.";

export const Route = createFileRoute("/post-a-notice")({
  staticData: { sitemap: true },
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
  component: PostNotice,
});

const STEPS = ["Category", "Notice", "Your details", "Review"] as const;

type Draft = {
  category: string;
  title: string;
  city: string;
  state: string;
  body: string;
  objectionDays: string;
  name: string;
  type: string;
  registration: string;
  email: string;
  phone: string;
  declaration: boolean;
};

const EMPTY: Draft = {
  category: "",
  title: "",
  city: "",
  state: "",
  body: "",
  objectionDays: "14",
  name: "",
  type: "",
  registration: "",
  email: "",
  phone: "",
  declaration: false,
};

function PostNotice() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState<string | null>(null);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const { [key]: _omit, ...rest } = e;
      return rest;
    });
  };

  const validate = (s: number) => {
    const schema = [categoryStepSchema, detailsStepSchema, publisherStepSchema, declarationSchema][s];
    const result = schema!.safeParse(draft);
    const errs = collectErrors(result);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === STEPS.length - 1) {
      setReference(`LNB-2026-${String(Math.floor(100000 + Math.random() * 900000))}`);
    } else {
      setStep(step + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  if (reference) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl border border-foreground/80 bg-card px-6 py-12 text-center sm:px-10">
          <CircleCheckBig className="mx-auto h-12 w-12 text-seal" />
          <h1 className="mt-5 text-3xl font-semibold">Notice submitted for verification</h1>
          <p className="mt-3 text-muted-foreground">
            Your reference number is
          </p>
          <p className="mt-1 font-mono text-xl">{reference}</p>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            This is a platform preview, so your notice has not been saved or published. Once live,
            notices are checked against the publisher's identity before they appear on the public
            record.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="rounded-sm">
              <Link to="/home">Browse notices</Link>
            </Button>
            <Button
              className="rounded-sm"
              onClick={() => {
                setDraft(EMPTY);
                setStep(0);
                setReference(null);
              }}
            >
              Post another notice
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <p className="smallcaps text-sm font-medium text-primary">Post a notice</p>
        <h1 className="mt-2 text-4xl font-semibold">Publish a legal public notice</h1>
        <p className="mt-2 text-muted-foreground">
          Four short steps. Your notice is verified before it joins the permanent public record.
        </p>

        <ol className="mt-8 grid grid-cols-4 border-y border-foreground/80">
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 py-3 text-xs sm:text-sm",
                i > 0 && "border-l border-border pl-3",
                i === step ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                  i < step && "border-seal bg-seal text-seal-foreground",
                  i === step && "border-primary bg-primary text-primary-foreground",
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          {step === 0 && (
            <fieldset>
              <legend className="font-serif text-2xl font-semibold">What kind of notice is it?</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {CATEGORIES.map((c) => {
                  const selected = draft.category === c.slug;
                  return (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => update("category", c.slug)}
                      aria-pressed={selected}
                      className={cn(
                        "border bg-card p-4 text-left transition-colors",
                        selected
                          ? "border-primary ring-1 ring-primary"
                          : "border-border hover:border-foreground/50",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2 font-medium">
                        {c.name}
                        {selected && <Check className="h-4 w-4 text-primary" />}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                    </button>
                  );
                })}
              </div>
              <FieldError msg={errors["category"]} />
            </fieldset>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">The notice</h2>
              <Field id="title" label="Title" error={errors["title"]} hint="A short heading readers will see in search results.">
                <Input
                  id="title"
                  value={draft.title}
                  maxLength={150}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Title investigation — Flat No. 702, Tower B, Varthur, Bengaluru"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="city" label="City or town" error={errors["city"]}>
                  <Input id="city" value={draft.city} maxLength={60} onChange={(e) => update("city", e.target.value)} />
                </Field>
                <Field id="state" label="State / Union Territory" error={errors["state"]}>
                  <Select value={draft.state} onValueChange={(v) => update("state", v)}>
                    <SelectTrigger id="state" className="w-full">
                      <SelectValue placeholder="Choose a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field
                id="body"
                label="Full text of the notice"
                error={errors["body"]}
                hint={`${draft.body.trim().length} / 5,000 characters`}
              >
                <Textarea
                  id="body"
                  rows={10}
                  maxLength={5000}
                  value={draft.body}
                  onChange={(e) => update("body", e.target.value)}
                  className="font-serif text-base leading-relaxed"
                  placeholder="NOTICE is hereby given that…"
                />
              </Field>
              <Field id="objectionDays" label="Period for objections or claims" error={errors["objectionDays"]}>
                <Select value={draft.objectionDays} onValueChange={(v) => update("objectionDays", v)}>
                  <SelectTrigger id="objectionDays" className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OBJECTION_OPTIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d === "0" ? "Not applicable" : `${d} days from publication`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Who is publishing this notice?</h2>
              <Field id="type" label="Publishing as" error={errors["type"]}>
                <Select value={draft.type} onValueChange={(v) => update("type", v)}>
                  <SelectTrigger id="type" className="w-full sm:w-72">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PUBLISHER_TYPES).map(([k, label]) => (
                      <SelectItem key={k} value={k}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field
                id="name"
                label={draft.type === "company" || draft.type === "institution" ? "Name of organisation" : "Full name"}
                error={errors["name"]}
              >
                <Input id="name" value={draft.name} maxLength={100} onChange={(e) => update("name", e.target.value)} />
              </Field>
              {(draft.type === "advocate" || draft.type === "company" || draft.type === "institution") && (
                <Field
                  id="registration"
                  label={
                    draft.type === "advocate"
                      ? "Bar Council enrolment number"
                      : draft.type === "company"
                        ? "CIN or LLPIN"
                        : "Registration or licence number (optional)"
                  }
                  error={errors["registration"]}
                  hint="Used only to verify who is publishing."
                >
                  <Input
                    id="registration"
                    value={draft.registration}
                    maxLength={50}
                    onChange={(e) => update("registration", e.target.value)}
                    className="font-mono"
                  />
                </Field>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="email" label="Email" error={errors["email"]}>
                  <Input id="email" type="email" value={draft.email} maxLength={255} onChange={(e) => update("email", e.target.value)} />
                </Field>
                <Field id="phone" label="Mobile number" error={errors["phone"]}>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={draft.phone}
                    maxLength={16}
                    placeholder="98765 43210"
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold">Review your notice</h2>
              <p className="mt-1 text-sm text-muted-foreground">This is how your notice will appear on the record.</p>
              <article className="mt-5 border border-foreground/80 bg-card px-6 py-8 sm:px-10">
                <span className="smallcaps inline-flex rounded-sm border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                  {getCategory(draft.category as CategorySlug).name}
                </span>
                <h3 className="mt-4 text-center text-2xl font-semibold">{draft.title}</h3>
                <div className="rule-double mx-auto mt-4 max-w-[10rem]" />
                <p className="mt-6 whitespace-pre-line font-serif text-lg leading-relaxed">{draft.body}</p>
                <div className="mt-8 text-right text-sm">
                  <p className="font-serif text-base font-semibold">{draft.name}</p>
                  <p className="text-muted-foreground">
                    {PUBLISHER_TYPES[draft.type as keyof typeof PUBLISHER_TYPES]}
                    {draft.registration && ` · ${draft.registration}`}
                  </p>
                  <p className="text-muted-foreground">
                    {draft.city}, {draft.state}
                  </p>
                </div>
              </article>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <Summary label="Objection period" value={draft.objectionDays === "0" ? "Not applicable" : `${draft.objectionDays} days`} />
                <Summary label="Email" value={draft.email} />
                <Summary label="Mobile" value={draft.phone} />
              </dl>
              <div className="mt-6 flex items-start gap-3 border border-border bg-secondary p-4">
                <Checkbox
                  id="declaration"
                  checked={draft.declaration}
                  onCheckedChange={(v) => update("declaration", v === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="declaration" className="text-sm font-normal leading-relaxed">
                  I declare that the information in this notice is true, that I am authorised to
                  publish it, and that I understand it will be publicly and permanently available.
                </Label>
              </div>
              <FieldError msg={errors["declaration"]} />
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          {step > 0 ? (
            <Button variant="ghost" onClick={back}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={next} size="lg" className="rounded-sm">
            {step === STEPS.length - 1 ? "Submit for verification" : "Continue"}
            {step < STEPS.length - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="px-4 py-12">{children}</main>
      <PortalFooter />
    </div>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <FieldError msg={error} /> : hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function FieldError({ msg }: { msg?: string | undefined }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-destructive">
      {msg}
    </p>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-card p-3">
      <dt className="smallcaps text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 break-words">{value}</dd>
    </div>
  );
}

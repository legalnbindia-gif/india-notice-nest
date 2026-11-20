import { z } from "zod";

import { CATEGORIES, INDIAN_STATES, PUBLISHER_TYPES } from "./notices";

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];
const publisherTypes = Object.keys(PUBLISHER_TYPES) as [string, ...string[]];

export const OBJECTION_OPTIONS = ["0", "7", "14", "15", "21", "30"] as const;

export const categoryStepSchema = z.object({
  category: z.enum(categorySlugs, { errorMap: () => ({ message: "Choose a category" }) }),
});

export const detailsStepSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Title must be at least 10 characters")
    .max(150, "Title must be under 150 characters"),
  city: z.string().trim().min(2, "Enter a city or town").max(60, "City must be under 60 characters"),
  state: z.enum(INDIAN_STATES as unknown as [string, ...string[]], {
    errorMap: () => ({ message: "Choose a state" }),
  }),
  body: z
    .string()
    .trim()
    .min(80, "The notice text must be at least 80 characters")
    .max(5000, "The notice text must be under 5,000 characters"),
  objectionDays: z.enum(OBJECTION_OPTIONS),
});

export const publisherStepSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(100, "Name must be under 100 characters"),
    type: z.enum(publisherTypes, { errorMap: () => ({ message: "Choose who is publishing" }) }),
    registration: z.string().trim().max(50, "Must be under 50 characters"),
    email: z.string().trim().email("Enter a valid email address").max(255),
    phone: z
      .string()
      .trim()
      .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|0)/, ""))
      .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  })
  .superRefine((v, ctx) => {
    if ((v.type === "advocate" || v.type === "company") && v.registration.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["registration"],
        message:
          v.type === "advocate"
            ? "Enter your Bar Council enrolment number"
            : "Enter your company CIN or LLPIN",
      });
    }
  });

export const declarationSchema = z.object({
  declaration: z.literal(true, {
    errorMap: () => ({ message: "Please confirm the declaration to continue" }),
  }),
});

export type FieldErrors = Record<string, string>;

export function collectErrors(result: z.SafeParseReturnType<unknown, unknown>): FieldErrors {
  if (result.success) return {};
  const out: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

import { cn } from "@/lib/utils";

/** Circular seal mark used as the Legal Notice Board emblem. */
export function Seal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-10 w-10 text-primary", className)}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="32" cy="32" r="30" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="25.5" strokeWidth="0.75" strokeDasharray="1.5 2.2" />
      <circle cx="32" cy="32" r="21" strokeWidth="1.25" />
      {/* Scales of justice */}
      <path d="M32 18v26M24 44h16M20 24h24" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M20 24l-5 10a5 5 0 0 0 10 0zM44 24l-5 10a5 5 0 0 0 10 0z"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Seal className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Legal Notice Board
        </span>
        <span className="smallcaps mt-0.5 text-xs text-muted-foreground">India · Public record</span>
      </span>
    </span>
  );
}

import { Link } from "@tanstack/react-router";
import { FilePlus2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Wordmark } from "./Seal";

export function PortalHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="border-b border-border bg-secondary">
        <p className="mx-auto max-w-6xl px-4 py-1.5 text-center text-xs text-muted-foreground">
          Platform preview — the notices shown here are samples for demonstration.
        </p>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/home" aria-label="Legal Notice Board — browse notices">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/home"
            className="hidden rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ includeSearch: false }}
          >
            Browse notices
          </Link>
          <Button asChild size="sm">
            <Link to="/post-a-notice">
              <FilePlus2 className="h-4 w-4" />
              Post a notice
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export function PortalFooter() {
  return (
    <footer className="no-print mt-20 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Wordmark />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A permanent, searchable home for legal public notices across India — for businesses,
            advocates, institutions and individuals.
          </p>
        </div>
        <div className="text-sm">
          <p className="smallcaps text-muted-foreground">Contact</p>
          <a
            href="mailto:hello@legalnoticeboard.com"
            className="mt-2 block text-foreground underline-offset-4 hover:underline"
          >
            hello@legalnoticeboard.com
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          © 2026 Legal Notice Board · legalnoticeboard.com
        </p>
      </div>
    </footer>
  );
}

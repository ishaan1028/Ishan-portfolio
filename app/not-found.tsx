import { Button } from "@ui/components/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Button asChild className="mt-8">
        <Link href="/">Back to the portfolio</Link>
      </Button>
    </div>
  );
}

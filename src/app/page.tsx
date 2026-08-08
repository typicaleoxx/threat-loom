// renders the minimal application foundation status page.
import type { ReactElement } from "react";

/**
 * Renders the initial Threat Loom application shell.
 *
 * @returns A minimal status page confirming that the foundation is running.
 */
export default function Home(): ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
      <section aria-labelledby="page-title" className="max-w-xl text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
          Application foundation
        </p>
        <h1 id="page-title" className="text-5xl font-semibold tracking-tight">
          Threat Loom
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          The application foundation is running.
        </p>
      </section>
    </main>
  );
}

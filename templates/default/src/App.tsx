import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";

const highlights = ["Frontend-only", "Local mock data", "Ready to customize"];

export const App = () => (
  <main data-sparkta-starter="ready" className="min-h-screen bg-slate-950 px-6 py-20 text-slate-50">
    <section className="mx-auto max-w-3xl">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
        <Sparkles aria-hidden="true" className="size-4" /> Sparkta starter
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight">
        Build the interface, not the scaffolding.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Start with the bundled UI stack and replace this local mock content with the prototype you
        need.
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {highlights.map((highlight) => (
          <li key={highlight} className="rounded-full border border-slate-700 px-4 py-2 text-sm">
            {highlight}
          </li>
        ))}
      </ul>
      <Button className="mt-10" type="button">
        Start designing <ArrowRight aria-hidden="true" className="size-4" />
      </Button>
    </section>
  </main>
);

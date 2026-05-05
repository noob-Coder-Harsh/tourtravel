import { SiteShell } from "@/components/site-shell";

const values = [
  {
    title: "Story-first journeys",
    text: "We design routes around meaningful moments, not checklist tourism.",
  },
  {
    title: "Local expertise",
    text: "Our curated partners and destination experts keep every plan practical and personal.",
  },
  {
    title: "Transparent planning",
    text: "Clear inclusions, realistic expectations, and dedicated support throughout your trip.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">About LuxeVoyage</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl md:text-5xl">
          We are building a modern travel catalog for curious, experience-first travelers.
        </h1>
        <p className="mt-6 max-w-3xl text-gray-600">
          LuxeVoyage blends editorial storytelling with package clarity so travelers can browse deeply and plan confidently.
          From mountains to coastlines, every recommendation is curated for comfort, culture, and memorable pacing.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-16 md:grid-cols-3 md:px-8">
        {values.map((item) => (
          <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-3 text-sm text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}

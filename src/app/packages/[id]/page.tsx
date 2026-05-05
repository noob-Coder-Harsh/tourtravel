import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { DESTINATIONS, TOUR_PACKAGES } from "@/lib/travel-data";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = TOUR_PACKAGES.find((item) => item.id === id);
  if (!pkg) notFound();

  const destination = DESTINATIONS.find((item) => item.id === pkg.destinationId);

  return (
    <SiteShell>
      <section className="relative min-h-[52vh]">
        <img src={pkg.image} alt={pkg.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-white sm:py-20 md:px-8">
          <p className="text-sm uppercase tracking-wider text-teal-300">{pkg.type}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black sm:text-5xl">{pkg.title}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{pkg.tagline}</p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 sm:gap-8 px-4 py-14 md:grid-cols-3 md:px-8">
        <article className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 md:col-span-2">
          <h2 className="text-2xl font-bold">What is included</h2>
          <ul className="mt-4 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
            {pkg.highlights.map((item) => (
              <li key={item} className="rounded-lg bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </article>
        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500">Starting from</p>
          <p className="mt-2 text-3xl font-black sm:text-4xl text-gray-900">INR {pkg.price.toLocaleString()}</p>
          <p className="mt-1 text-sm text-gray-600">{pkg.duration}</p>
          <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
            <Star className="h-4 w-4 fill-current" /> {pkg.rating}
          </p>
          <p className="mt-4 text-sm text-gray-600">Destination: {destination?.name}</p>
          <button className="mt-6 w-full cursor-pointer rounded-full bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-500">
            Book this package
          </button>
        </aside>
      </section>
    </SiteShell>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { DESTINATIONS, TOUR_PACKAGES } from "@/lib/travel-data";

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = DESTINATIONS.find((item) => item.id === id);
  if (!destination) notFound();

  const relatedPackages = TOUR_PACKAGES.filter((item) => item.destinationId === destination.id);

  return (
    <SiteShell>
      <section className="relative min-h-[52vh]">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-white sm:py-20 md:px-8">
          <p className="text-sm uppercase tracking-wider text-teal-300">{destination.state}</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">{destination.name}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{destination.description}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14 md:px-8">
        <h2 className="text-2xl font-bold">Highlights</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {destination.highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-8">
        <h2 className="text-2xl font-bold">Related packages</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {relatedPackages.length > 0 ? (
            relatedPackages.map((item) => (
              <Link
                key={item.id}
                href={`/packages/${item.id}`}
                className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.tagline}</p>
                <p className="mt-3 text-sm font-semibold text-teal-700">
                  {item.duration} · INR {item.price.toLocaleString()}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">No packages listed yet for this destination.</p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

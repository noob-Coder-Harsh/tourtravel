import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { DESTINATIONS } from "@/lib/travel-data";

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const selectedCategory = category?.trim();
  const visibleDestinations = selectedCategory
    ? DESTINATIONS.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    : DESTINATIONS;

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 md:px-8">
        <h1 className="text-3xl font-black sm:text-4xl">Destinations</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Discover destinations by mood, geography, and travel style. Each place is curated with practical highlights.
          {selectedCategory ? ` Showing category: ${selectedCategory}.` : ""}
        </p>
        <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((item) => (
            <Link
              key={item.id}
              href={`/destinations/${item.id}`}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 overflow-hidden sm:h-56">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{item.category}</p>
                <h2 className="mt-1 text-xl font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.state}</p>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        {visibleDestinations.length === 0 && (
          <p className="mt-8 text-sm text-gray-500">No destinations found for this category yet.</p>
        )}
      </section>
    </SiteShell>
  );
}

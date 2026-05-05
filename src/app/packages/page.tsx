import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { DESTINATIONS, TOUR_PACKAGES } from "@/lib/travel-data";

export default function PackagesPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 md:px-8">
        <h1 className="text-3xl font-black sm:text-4xl">Packages</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Ready-to-book curated plans with clear pricing, duration, and travel style.
        </p>
        <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-6 md:grid-cols-2">
          {TOUR_PACKAGES.map((item) => {
            const destination = DESTINATIONS.find((dest) => dest.id === item.destinationId);
            return (
              <Link
                key={item.id}
                href={`/packages/${item.id}`}
                className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-44 overflow-hidden sm:h-52 rounded-2xl">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <h2 className="mt-4 text-2xl font-bold">{item.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{item.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-600">{destination?.name}</span>
                  <span className="font-bold text-teal-700">INR {item.price.toLocaleString()}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}

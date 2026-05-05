"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Navigation, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { DESTINATIONS, TOUR_PACKAGES } from "@/lib/travel-data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (value.length < 2) return { destinations: [], packages: [] };
    return {
      destinations: DESTINATIONS.filter(
        (item) => item.name.toLowerCase().includes(value) || item.state.toLowerCase().includes(value),
      ).slice(0, 4),
      packages: TOUR_PACKAGES.filter((item) => item.title.toLowerCase().includes(value)).slice(0, 4),
    };
  }, [query]);

  const isOpen = focused && (results.destinations.length > 0 || results.packages.length > 0);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border-none bg-transparent px-2 py-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          placeholder="Search destinations or packages..."
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
          >
            {results.destinations.length > 0 && (
              <div className="p-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase text-gray-400">Destinations</p>
                {results.destinations.map((item) => (
                  <Link
                    key={item.id}
                    href={`/destinations/${item.id}`}
                    className="block cursor-pointer rounded-lg px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                  >
                    {item.name} · {item.state}
                  </Link>
                ))}
              </div>
            )}
            {results.packages.length > 0 && (
              <div className="border-t border-gray-100 p-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase text-gray-400">Packages</p>
                {results.packages.map((item) => (
                  <Link
                    key={item.id}
                    href={`/packages/${item.id}`}
                    className="block cursor-pointer rounded-lg px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-8">
          <Link href="/" className="flex cursor-pointer items-center gap-2">
            <span className="rounded-lg bg-teal-600 p-2 text-white">
              <Navigation className="h-4 w-4" />
            </span>
            <span className="text-base font-bold sm:text-lg">LuxeVoyage</span>
          </Link>
          <div className="hidden flex-1 justify-center lg:flex">
            <GlobalSearch />
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 bg-white md:hidden"
            >
              <div className="mx-auto w-full max-w-7xl space-y-3 px-4 py-4">
                <GlobalSearch />
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition ${
                          active ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-gray-200 bg-gray-950 py-12 text-gray-300">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-8">
          <div>
            <h4 className="mb-2 text-white">LuxeVoyage</h4>
            <p className="text-sm text-gray-400">
              A modern travel and tour catalog built to inspire discovery before booking.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-2 text-white">Explore</p>
            <div className="space-y-1">
              <Link href="/destinations" className="block cursor-pointer hover:text-teal-400">
                Destinations
              </Link>
              <Link href="/packages" className="block cursor-pointer hover:text-teal-400">
                Packages
              </Link>
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-2 text-white">Contact</p>
            <p className="text-gray-400">hello@luxevoyage.in</p>
            <p className="text-gray-400">+91 99999 88888</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

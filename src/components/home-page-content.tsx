"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Compass,
  HeartHandshake,
  Leaf,
  Mountain,
  Sparkles,
  Sun,
} from "lucide-react";
import { DESTINATIONS, TOUR_PACKAGES, TRAVEL_STORIES } from "@/lib/travel-data";

function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SplitSection({
  title,
  text,
  image,
  reverse = false,
  className = "",
}: {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <SectionWrapper
      className={`mx-auto grid w-full max-w-7xl items-center gap-6 px-4 py-10 sm:gap-8 sm:py-14 md:grid-cols-2 md:px-8 ${className}`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <img src={image} alt={title} className="h-64 w-full rounded-3xl object-cover sm:h-80" />
      </div>
      <article className={reverse ? "md:order-1" : ""}>
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{text}</p>
      </article>
    </SectionWrapper>
  );
}

function CategoryCard({
  title,
  line,
  image,
  href,
}: {
  title: string;
  line: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-44 overflow-hidden sm:h-52">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{line}</p>
      </div>
    </Link>
  );
}

function TestimonialCard({
  name,
  location,
  text,
}: {
  name: string;
  location: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-700">
        {name[0]}
      </div>
      <p className="text-sm text-gray-700">&quot;{text}&quot;</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {name} · {location}
      </p>
    </article>
  );
}

function BlogSection({
  title,
  text,
  image,
  reverse = false,
}: {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-5 rounded-3xl border border-gray-100 bg-white p-4 sm:gap-6 sm:p-6 md:grid-cols-2">
      <img
        src={image}
        alt={title}
        className={`h-52 w-full rounded-2xl object-cover sm:h-60 ${reverse ? "md:order-2" : ""}`}
      />
      <div className={reverse ? "md:order-1" : ""}>
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
      </div>
    </article>
  );
}

const carouselSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&q=80&w=2000",
    title: "Wake up in the Himalayas",
    text: "Mornings where silence, sunlight, and snow peaks feel like a private ritual.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=2000",
    title: "Sunsets you will never forget",
    text: "Golden coastlines, warm skies, and the kind of evenings that slow time down.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000",
    title: "Journeys that reset your rhythm",
    text: "From city escapes to spiritual pauses, travel that feels personal and renewing.",
  },
];

function CarouselHeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const active = carouselSlides[index];

  return (
    <SectionWrapper className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14 md:px-8">
      <div className="relative min-h-[56vh] overflow-hidden rounded-3xl">
        <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full min-h-[56vh] flex-col justify-end p-6 text-white sm:p-10">
          <h3 className="max-w-2xl text-3xl font-black sm:text-5xl">{active.title}</h3>
          <p className="mt-4 max-w-xl text-sm text-white/85 sm:text-base">{active.text}</p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
              className="inline-flex cursor-pointer rounded-full border border-white/40 bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Previous story"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % carouselSlides.length)}
              className="inline-flex cursor-pointer rounded-full border border-white/40 bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Next story"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function StickyStorySection() {
  return (
    <SectionWrapper className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14 md:px-8">
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="md:sticky md:top-28 md:h-fit">
          <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-2 backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1500"
              alt="Scenic road through valley"
              className="h-64 w-full rounded-2xl object-cover sm:h-[28rem]"
            />
          </div>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Arrival",
              text: "The first day is less about landmarks and more about your breathing slowing down.",
            },
            {
              title: "Immersion",
              text: "As streets and people become familiar, the destination starts to feel less like a postcard.",
            },
            {
              title: "Shift",
              text: "Somewhere between meals, walks, and views, your mind quietly rearranges itself.",
            },
            {
              title: "Return",
              text: "You come back carrying a softer pace that lingers long after unpacking.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-sm">
              <h4 className="text-lg font-bold">{item.title}</h4>
              <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default function HomePageContent() {
  const featuredDestinations = useMemo(
    () => DESTINATIONS.filter((item) => item.popular).slice(0, 6),
    [],
  );

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative flex min-h-[72vh] items-center sm:min-h-[82vh]">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
          alt="Scenic mountain view"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-white md:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4" /> Escape the ordinary
          </p>
          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            A travel magazine with routes, stories, and experiences you can truly feel.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base">
            This is not just booking. It is about finding the mood, place, and pace that matches your life right now.
          </p>
          <Link
            href="/packages"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-400"
          >
            Start your next escape <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SplitSection
        title="Why travel matters"
        text="Travel is one of the few experiences that makes us both smaller and larger at the same time. Smaller in ego, larger in empathy. It lets us step out of urgency and into wonder, even if just for a week."
        image="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=1500"
        className="bg-gradient-to-r from-sky-50 to-white"
      />

      <SplitSection
        title="Not all classrooms have four walls"
        text="A fort can teach history better than a chapter. A mountain village can teach resilience without saying a word. The right journey leaves you with stories, not just photos."
        image="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1500"
        reverse
        className="bg-gradient-to-r from-white to-emerald-50/70"
      />

      <SectionWrapper className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14 md:px-8">
        <h3 className="mb-5 text-2xl font-black sm:text-3xl">Explore by vibe</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            title="Mountains"
            line="Cold air, warm cups, long views."
            image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
            href="/destinations?category=Mountain"
          />
          <CategoryCard
            title="Beaches"
            line="Sunsets, sea breeze, and soft resets."
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"
            href="/destinations?category=Beach"
          />
          <CategoryCard
            title="Heritage"
            line="Timeless cities with living stories."
            image="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200"
            href="/destinations?category=City"
          />
          <CategoryCard
            title="Spiritual"
            line="Quiet spaces to breathe and reflect."
            image="https://images.unsplash.com/photo-1595815771614-ade5015c29c8?auto=format&fit=crop&q=80&w=1200"
            href="/destinations?category=Spiritual"
          />
        </div>
      </SectionWrapper>

      <CarouselHeroSection />

      <SectionWrapper className="mx-auto w-full max-w-7xl rounded-[2rem] border border-teal-100/70 bg-gradient-to-br from-teal-50/60 via-white to-cyan-50/50 px-4 py-10 sm:py-14 md:px-8">
        <h3 className="mb-5 text-2xl font-black sm:text-3xl">What travel gives back</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Sun,
              title: "Mental peace",
              text: "Distance from routine helps your mind settle into clarity.",
            },
            {
              icon: Compass,
              title: "Breaks routine",
              text: "New routes interrupt autopilot and make days feel fresh again.",
            },
            {
              icon: HeartHandshake,
              title: "Cultural exposure",
              text: "People, food, language, and rituals expand how you see life.",
            },
            {
              icon: Brain,
              title: "Creativity boost",
              text: "Unfamiliar places give your thinking space to evolve.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5">
              <item.icon className="h-7 w-7 text-teal-600" />
              <h4 className="mt-3 text-lg font-bold">{item.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <StickyStorySection />

      <SectionWrapper className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14 md:px-8">
        <h3 className="mb-5 text-2xl font-black sm:text-3xl">Featured destinations</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDestinations.map((item) => (
            <Link
              key={item.id}
              href={`/destinations/${item.id}`}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-52 overflow-hidden sm:h-56">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{item.state}</p>
                <h4 className="mt-1 text-xl font-bold">{item.name}</h4>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto w-full max-w-7xl rounded-[2rem] border border-gray-200 bg-white px-4 py-10 shadow-sm sm:py-14 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-black sm:text-3xl">Popular packages</h3>
          <Link href="/packages" className="cursor-pointer text-sm font-semibold text-teal-700 hover:text-teal-500">
            View all
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {TOUR_PACKAGES.map((item) => (
            <Link
              key={item.id}
              href={`/packages/${item.id}`}
              className="group min-w-[84%] snap-start cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:min-w-[360px]"
            >
              <div className="mb-4 h-40 overflow-hidden rounded-2xl sm:h-44">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{item.tagline}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-700">{item.duration}</span>
                <span className="font-bold text-teal-700">INR {item.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative bg-gradient-to-r from-[#f6faf8] via-[#f8fcfb] to-[#f6faf8] py-10 sm:py-14">
        <Leaf className="pointer-events-none absolute left-10 top-8 h-24 w-24 text-emerald-200/60" />
        <Leaf className="pointer-events-none absolute bottom-8 right-10 h-20 w-20 rotate-180 text-emerald-200/50" />
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <h3 className="mb-5 text-2xl font-black sm:text-3xl">Real traveler stories</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {TRAVEL_STORIES.map((item) => (
              <TestimonialCard key={item.name} name={item.name} location={item.location} text={item.text} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto w-full max-w-7xl rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-cyan-50/30 px-4 py-10 sm:py-14 md:px-8">
        <h3 className="mb-5 text-2xl font-black sm:text-3xl">Travel notes and reflections</h3>
        <div className="space-y-4">
          <BlogSection
            title="Why hill stations help you reset"
            text="Cool weather, long walks, and slower mornings gently move your nervous system out of rush mode and back into balance."
            image="https://images.unsplash.com/photo-1486179814561-91c2d61316b1?auto=format&fit=crop&q=80&w=1400"
          />
          <BlogSection
            title="Beach vs mountains: what you need right now"
            text="If you crave stillness and horizon, choose beaches. If you want perspective and challenge, choose mountains. Both can heal in different ways."
            image="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=1400"
            reverse
          />
          <BlogSection
            title="Travel once a year, think differently all year"
            text="A single meaningful trip can shift your conversations, your priorities, and your energy for months after you return."
            image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1400"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto w-full max-w-7xl px-4 pb-12 pt-4 sm:pb-16 md:px-8">
        <div className="rounded-3xl bg-gray-900 p-6 text-white sm:p-8 md:p-12">
          <h3 className="text-2xl font-black sm:text-3xl">Start planning your next escape</h3>
          <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            Explore thoughtfully designed journeys and choose the destination that feels right for this season of your life.
          </p>
          <Link
            href="/packages"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold transition hover:bg-teal-400"
          >
            Browse packages <Mountain className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
}

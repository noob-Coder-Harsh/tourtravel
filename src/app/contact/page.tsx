"use client";

import { useState } from "react";
import { SiteShell } from "@/components/site-shell";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16 md:px-8">
        <h1 className="text-3xl font-black sm:text-4xl">Contact our travel experts</h1>
        <p className="mt-3 text-gray-600">
          Share your travel preferences and we will send a curated plan with best-fit destinations and packages.
        </p>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {!submitted ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
              className="grid gap-4"
            >
              <input required placeholder="Full name" className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal-500" />
              <input required type="email" placeholder="Email" className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal-500" />
              <textarea
                required
                rows={5}
                placeholder="Where do you want to travel, and what vibe are you looking for?"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="w-fit cursor-pointer rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-500"
              >
                Send inquiry
              </button>
            </form>
          ) : (
            <div className="rounded-2xl bg-teal-50 p-6">
              <h2 className="text-xl font-bold text-teal-800">Inquiry received</h2>
              <p className="mt-2 text-sm text-teal-700">Thank you. Our team will contact you within 24 hours.</p>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

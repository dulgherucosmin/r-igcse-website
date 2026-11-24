"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { type FAQCategory, faqCategories, faqs } from "@/data/faq";

export default function FAQPage() {
  const [category, setCategory] = useState<FAQCategory | "All">("All");

  const visibleFAQs = useMemo(() => {
    return faqs.filter(
      (faq) => category === "All" || faq.category === category,
    );
  }, [category]);

  return (
    <main className="page-container pt-12 pb-24 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight md:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Find quick answers about resources, exam information, assessment
          routes and the r/IGCSE community.
        </p>
      </header>

      <div className="mt-2 rounded-xl">
        <nav aria-label="FAQ categories" className="mt-4 flex flex-wrap gap-2">
          {(["All", ...faqCategories] as const).map((item) => (
            <Button
              key={item}
              type="button"
              variant={category === item ? "default" : "outline"}
              size="sm"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </nav>
      </div>

      <section aria-labelledby="faq-results-heading" className="mt-10">
        <h2
          id="faq-results-heading"
          className="mb-5 text-2xl font-bold tracking-tight"
        >
          {category === "All" ? "All questions" : category}
        </h2>

        {visibleFAQs.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {visibleFAQs.map((faq) => (
              <details
                key={faq.question}
                className="group border-border [&:not(:last-child)]:border-b"
              >
                <summary className="cursor-pointer px-5 py-5 font-bold focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring sm:px-6">
                  {faq.question}
                </summary>
                <div className="px-5 pb-5 sm:px-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary">
                    {faq.category}
                  </p>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">
            No FAQs match your search.
          </p>
        )}
      </section>
    </main>
  );
}

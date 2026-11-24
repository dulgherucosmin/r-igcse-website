import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  return (
    <section aria-labelledby="faq-heading" className="page-container py-16">
      <h2
        id="faq-heading"
        className="text-center text-4xl font-bold underline decoration-primary decoration-3 underline-offset-8"
      >
        Frequently Asked Questions
      </h2>

      <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border border-border bg-card">
        {faqs.slice(0, 5).map((faq, index) => (
          <details
            key={faq.question}
            className="group border-border [&:not(:last-child)]:border-b"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-bold transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring sm:px-6">
              <span>
                {index + 1}. {faq.question}
              </span>
              <CaretDownIcon
                weight="bold"
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted-foreground sm:px-6">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/faq"
          className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}
        >
          View All FAQs
        </Link>
      </div>
    </section>
  );
}

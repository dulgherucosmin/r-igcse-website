import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/thebot");

const stats = [
  { label: "Total Users", value: "130,000+" },
  { label: "Discord Guilds", value: "550+" },
];

const features: { title: string; description: ReactNode }[] = [
  {
    title: "Reputation Points",
    description: (
      <>
        <p>
          A reputation system, which is based on the karma system on Reddit, is
          a points-based system which awards a digital point (rep) for every
          time a member thanks another member for answering their question or
          pointing them to the right answer.
        </p>
        <p>
          This allows us to reward our most valued and helpful community members
          and helpers for their hard work. Message content is essential as we
          need to check if the member has actually thanked the person or not.
          This also works if the person helping replies to the thank you with no
          problem or similar phrases if they didn't get the rep.
        </p>
      </>
    ),
  },
  {
    title: "Feature 2",
    description: <p>Describe what this feature does here.</p>,
  },
  {
    title: "Feature 3",
    description: <p>Describe what this feature does here.</p>,
  },
];

const contributors: { name: string; contribution: string }[] = [];

function FeatureScreenshot({ feature }: { feature: string }) {
  return (
    <Image
      src="/bot_examples/bot_rep_showcase.png"
      alt={`Screenshot showing ${feature}`}
      width={852}
      height={431}
      className="h-auto w-full rounded-xl border border-border"
    />
  );
}

export default function TheBot() {
  return (
    <main className="page-container pt-12 pb-24 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight md:text-6xl">
          The r/IGCSE Bot
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          r/IGCSE Bot is a TypeScript Discord Bot primarily developed for the r/IGCSE Discord Community, made public for other educational communities to use. We feature a fully fledged moderation system for admins and moderators to take advantage of, a reputation system for rewarding active members, functionality to search for resources and keywords, and more.
        </p>
      </header>

      <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse border-l-4 border-primary pl-4"
          >
            <dt className="mt-1 text-sm font-medium text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="text-3xl font-extrabold text-highlight md:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14">
        {features.map((feature, index) => (
          <section
            key={feature.title}
            aria-labelledby={`feature-${index + 1}-heading`}
          >
            <Separator />
            <div className="grid items-center gap-6 py-10 md:grid-cols-2 md:gap-12">
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <FeatureScreenshot feature={feature.title} />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : undefined}>
                <h2
                  id={`feature-${index + 1}-heading`}
                  className="text-2xl font-bold tracking-tight"
                >
                  {feature.title}
                </h2>
                <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            </div>
          </section>
        ))}
        <Separator />
      </div>

      <section
        aria-labelledby="invite-heading"
        className="mt-16 flex flex-col items-center gap-4 py-6 text-center"
      >
        <div>
          <h2 id="invite-heading" className="text-2xl font-bold tracking-tight">
            Add the bot to your server
          </h2>
          <p className="mt-2 text-muted-foreground">
            The bot invite link will be added here.
          </p>
        </div>
        <Button size="lg" disabled>
          Invite the bot
        </Button>
      </section>

      <section aria-labelledby="contributors-heading" className="mt-16">
        <Separator />
        <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
          <h2
            id="contributors-heading"
            className="text-2xl font-bold tracking-tight"
          >
            Bot contributors
          </h2>
          {contributors.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {contributors.map((contributor) => (
                <li
                  key={contributor.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <h3 className="font-semibold">{contributor.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {contributor.contribution}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg leading-relaxed text-muted-foreground">
              Contributor credits will be added here.
            </p>
          )}
        </div>
        <Separator />
      </section>
    </main>
  );
}

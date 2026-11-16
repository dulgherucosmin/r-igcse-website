import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Image from "next/image";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/thebot");

const stats = { users: "130,000+", guilds: "550+" };

const features: { title: string; description: ReactNode; image: string }[] = [
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
    image: "/bot_examples/bot_rep_showcase.png",
  },
  {
    title: "Moderation Commands",
    description: (
      <>
        <p>
          We handle moderation in-house with tools for warnings, user notes,
          kicks, bans, timeouts, and other infractions. The bot records actions
          with their rule and case number, so staff can keep track of what
          happened.
        </p>
        <p>
          Members can contact staff directly through modmail to report users,
          appeal infractions, arrange study sessions, or ask other questions
          about the server.
        </p>
      </>
    ),
    image: "/bot_examples/bot_infraction_showcase.png",
  },
  {
    title: "Statistics",
    description: (
      <>
        <p>
          The <code>/rep user</code> command gives members a snapshot of their
          reputation: their total points and position on the community
          leaderboard. It also highlights the channels where they have earned
          the most reputation, making it easy to see where their help has made
          an impact.
        </p>
        <p>
          A recent activity summary tracks reputation earned over the last 24
          hours, 7 days, and 30 days, so members can compare their latest
          contributions with their longer-term activity. The More Statistics
          option provides an expanded view for anyone who wants to explore the
          numbers further.
        </p>
      </>
    ),
    image: "/bot_examples/bot_stats_showcase.png",
  },
];

type GitHubContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
};

function isGitHubContributor(value: unknown): value is GitHubContributor {
  return (
    typeof value === "object" &&
    value !== null &&
    "login" in value &&
    typeof value.login === "string" &&
    "avatar_url" in value &&
    typeof value.avatar_url === "string" &&
    "html_url" in value &&
    typeof value.html_url === "string" &&
    "type" in value &&
    typeof value.type === "string"
  );
}

async function getGitHubContributors() {
  "use cache";

  cacheLife("days");

  const response = await fetch(
    "https://api.github.com/repos/r-IGCSE/r-igcse-bot/contributors?per_page=100",
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "r-igcse-website",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub contributors request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isGitHubContributor)) {
    throw new Error("GitHub returned an unexpected contributors response");
  }

  return data.filter((contributor) => contributor.type === "User");
}

export default async function TheBot() {
  const contributors = await getGitHubContributors();

  return (
    <main className="page-container pt-12 pb-24 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight underline decoration-primary decoration-3 underline-offset-10 md:text-6xl">
          The r/IGCSE Bot
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          r/IGCSE Bot is a TypeScript Discord Bot primarily developed for the
          r/IGCSE Discord Community, made public for other educational
          communities to use. We feature a fully fledged moderation system for
          admins and moderators to take advantage of, a reputation system for
          rewarding active members, functionality to search for resources and
          keywords, and more.
        </p>
      </header>

      <div className="mt-0 py-6 text-left">
        <p className="text-2xl leading-snug font-bold md:text-3xl">
          Powering <span className="text-highlight">{stats.users}</span> users
          across <span className="text-highlight">{stats.guilds}</span> Discord
          guilds
        </p>
      </div>
      <div className="mb-2 flex flex-wrap gap-4">
        <a
          href="https://discord.com/oauth2/authorize?client_id=861445044790886467"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "2xl" })}
        >
          Invite Bot
        </a>
        <a
          href="https://github.com/r-IGCSE/r-igcse-bot"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "2xl" }),
            "bg-[#24292f] text-white hover:bg-[#24292f]/90",
          )}
        >
          GitHub
        </a>
      </div>

      <div className="mt-8">
        {features.map((feature, index) => (
          <section
            key={feature.title}
            aria-labelledby={`feature-${index + 1}-heading`}
          >
            <Separator />
            <div className="grid items-center gap-6 py-10 md:grid-cols-2 md:gap-12">
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <Image
                  src={feature.image}
                  alt={`Screenshot showing ${feature}`}
                  width={852}
                  height={431}
                  className="h-auto w-full rounded-xl border border-border"
                />
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
      </div>

      <section aria-labelledby="contributors-heading" className="mt-16">
        <Separator />
        <div className="py-10 text-center">
          <h2
            id="contributors-heading"
            className="text-2xl font-bold tracking-tight underline decoration-primary decoration-3 underline-offset-10"
          >
            r/IGCSE Bot Contributors
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Our Bot Contributors are volunteers who have dedicated their time to adding new features and submitting PRs for the r/IGCSE Bot. 
          </p>
          {contributors.length > 0 ? (
            <ul className="mt-8 grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {contributors.map((contributor) => (
                <li
                  key={contributor.login}
                  className="flex flex-col items-center gap-3"
                >
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${contributor.login}'s GitHub profile`}
                  >
                    <Image
                      src={contributor.avatar_url}
                      alt=""
                      width={96}
                      height={96}
                      className="size-24 rounded-full border border-border object-cover"
                    />
                  </a>
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white no-underline hover:text-white hover:no-underline focus-visible:no-underline"
                  >
                    {contributor.login}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-muted-foreground">
              No GitHub contributors found.
            </p>
          )}
        </div>
        <Separator />
      </section>
    </main>
  );
}

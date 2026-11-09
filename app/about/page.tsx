import {
  ArrowRightIcon,
  BooksIcon,
  HandshakeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Discord } from "@/components/ui/svgs/discord";
import { Reddit } from "@/components/ui/svgs/reddit";
import { socials } from "@/data/footer";
import { stats } from "@/data/home";
import { timeline } from "@/data/timeline";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/about");

const timelineIcons = {
  reddit: Reddit,
  discord: Discord,
  handshake: HandshakeIcon,
  users: UsersThreeIcon,
};

const publishedResources =
  stats.find((stat) => stat.label === "Published Resources")?.value ?? "100+";

const facts = [...stats, { label: "Cost to students", value: "Free" }];

function Row({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <Separator />
      <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
        <h2 id={id} className="text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="page-container pt-12 pb-24 md:pt-20">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-brand uppercase">
          About r/IGCSE
        </p>
        <h1 className="mt-2 text-4xl leading-tight font-black tracking-tight md:text-6xl">
          Built by students, for students
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          r/IGCSE is a student-run community for CAIE and Edexcel IGCSE, O Level
          and AS/A Level students around the world, with notes, subject guides,
          study sessions and help from people who have sat the same exams.
        </p>
      </header>

      <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col-reverse border-l-4 border-primary pl-4"
          >
            <dt className="mt-1 text-sm font-medium text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="text-3xl font-extrabold text-highlight md:text-4xl">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14">
        <Row id="mission-heading" title="Our mission">
          <p>
            We help students around the globe with IGCSE and AS/A Level notes,
            subject guides and study sessions. Our{" "}
            <TextLink href={socials.discord}>Discord server</TextLink> has
            subject-specific channels where you can ask verified Subject Helpers
            for help.
          </p>
          <p>
            We are completely student-run, and every resource is written by
            other IGCSE and AS/A Level students. r/IGCSE is free and will always
            stay free.
          </p>
        </Row>

        <Row id="repository-heading" title="The resource repository">
          <p>
            Our members have published {publishedResources} resources, all free
            to read in the{" "}
            <TextLink href="/resources">resource repository</TextLink>.
          </p>
          <p>
            Spotted a mistake in one of our resources? Let us know at{" "}
            <TextLink href="mailto:igcseresources.1@gmail.com">
              igcseresources.1@gmail.com
            </TextLink>
            .
          </p>
        </Row>

        <section aria-labelledby="story-heading">
          <Separator />
          <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
            <h2
              id="story-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Our story
            </h2>
            <ol className="relative max-w-2xl space-y-2 before:absolute before:top-4 before:bottom-4 before:left-[1.625rem] before:w-px before:bg-border">
              {timeline.map((event) => {
                const TimelineIcon = timelineIcons[event.icon];
                return (
                  <Item
                    key={event.title}
                    render={<li />}
                    className="relative items-start px-2"
                  >
                    <ItemMedia
                      variant="icon"
                      className="size-9 rounded-full bg-secondary text-brand ring-4 ring-background"
                    >
                      <TimelineIcon className="size-5" />
                    </ItemMedia>
                    <ItemContent>
                      <Badge variant="secondary">{event.date}</Badge>
                      <ItemTitle className="mt-1 text-lg font-semibold">
                        {event.title}
                      </ItemTitle>
                      <ItemDescription className="line-clamp-none text-base">
                        {event.body}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                );
              })}
            </ol>
          </div>
        </section>
        <Separator />
      </div>

      <section
        aria-labelledby="involved-heading"
        className="mt-16 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-xl">
          <h2
            id="involved-heading"
            className="text-2xl font-bold tracking-tight"
          >
            Get involved
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Write a resource, help other students or join the team. Everything
            here is made by volunteers like you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resources"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "font-bold",
            )}
          >
            <BooksIcon weight="fill" />
            Browse resources
          </Link>
          <Link
            href="/opportunities"
            className={cn(buttonVariants({ size: "lg" }), "font-bold")}
          >
            See opportunities
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}

import { BooksIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import CountdownSection from "@/components/CountdownSection";
import CoverStack from "@/components/CoverStack";
import FAQSection from "@/components/faq-section";
import StatsAnimation from "@/components/StatsAnimation";
import { TextLink } from "@/components/text-link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/data/footer";
import { introduction, stats } from "@/data/home";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("");

const why = [
  {
    title: "Student-Led & Free Resources",
    body: "Our resources are created by volunteer alumni students who have studied for and taken these exams. We are completely student-run, and all resources displayed have been created by other IGCSE and AS/A Level students. We aim to keep resources free for all students, always.",
  },
  {
    title: "Discord Partner Community ",
    body: (
      <>
        Since 2021, <TextLink href={socials.reddit}>r/IGCSE</TextLink> has been
        officially recognised as a{" "}
        <TextLink href="https://support.discord.com/hc/en-us/articles/360047236171-Partnered-vs-Verified-Servers">
          Discord Partner
        </TextLink>
        , giving our server access to high quality voice channels and
        recognition from Discord itself.
      </>
    ),
  },
  {
    title: "Peer-to-Peer Mentorship",
    body: (
      <>
      Our community members and helpers regularly host group study sessions where they tackle a variety of subjects, 
      past papers, tips and tricks, syllabus content, & more! Recordings of these sessions can 
      be found on our <TextLink href={socials.youtube}>YouTube Channel</TextLink> they are 
      active daily in our Discord community, helping other students by answering any questions or doubts that arise.
      </>
    ),
  },
  {
    title: "Student Well-being",
    body: "We value student welfare and aim to foster a nurturing environment by understanding and uplifting one another, ensuring that no student feels alone when navigating their academic journey, and that every student has access to support from a like-minded and welcoming community.",
  },
];

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="text-center text-4xl font-bold underline decoration-primary decoration-3 underline-offset-8"
    >
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main>
      <section
        aria-labelledby="homepage-title"
        className="-mt-(--site-header-height) flex min-h-svh items-center overflow-x-clip pt-(--site-header-height)"
      >
        <div className="page-container grid items-center gap-10 py-12 md:grid-cols-2">
          <div>
            <p className="text-lg font-semibold md:text-2xl">
              Welcome to<span className="hidden md:inline"> the</span>
            </p>
            <h1
              id="homepage-title"
              className="text-6xl leading-tight font-black text-primary md:text-7xl xl:text-8xl"
            >
              r/IGCSE
            </h1>
            <p className="text-2xl font-semibold md:text-4xl xl:text-5xl">
              Resource Repository
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {introduction}
            </p>

            <ul
              aria-label="Repository statistics"
              className="mt-8 flex flex-wrap gap-x-12 gap-y-6"
            >
              {stats.map((stat) => (
                <Item
                  key={stat.label}
                  render={<li />}
                  className="line-clamp-none w-auto rounded-none border-0 border-l-4 border-l-primary py-0 pl-4"
                >
                  <ItemContent className="gap-0">
                    <ItemTitle className="line-clamp-none line-text-base font-extrabold md:text-xl">
                      {stat.label}
                    </ItemTitle>
                    <ItemDescription className="line-clamp-none text-2xl font-extrabold text-highlight md:text-4xl">
                      <StatsAnimation value={stat.value} from={stat.from} />
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ul>

            <Link
              href="/resources"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-12 gap-2 px-6 text-xl font-bold",
              )}
            >
              <BooksIcon weight="fill" aria-hidden="true" className="size-6" />
              Browse Resources
            </Link>
          </div>

          <CoverStack />
        </div>
      </section>

      <div className="page-container">
        <Separator />
      </div>
      <CountdownSection key="homepage-countdown" />
      <div className="page-container">
        <Separator />
      </div>

      <FAQSection />

      <div className="page-container">
        <Separator />
      </div>

      <section aria-labelledby="why-title" className="py-16">
        <div className="page-container">
          <SectionHeading id="why-title">Why r/IGCSE?</SectionHeading>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {why.map((reason) => (
              <Card key={reason.title}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {reason.body}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/about"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2 px-6 text-xl font-bold",
              )}
            >
              Learn More About r/IGCSE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import StatsAnimation from "@/components/StatsAnimation";
import { countdownEvent } from "@/data/events";

const introduction =
  "The largest student-run community for CAIE/Edexcel IGCSE, O Level, and AS/A Level examinations! The place to go for subject help, advice, and tips. Home of the r/IGCSE subreddit.";

const stats = [
  { label: "Total Users", value: "235,000+" },
  { label: "Published Resources", value: "130+" },
];

const aboutCards = [
  {
    title: "How We Started",
    icon: "/r.igcse_logo.png",
    accent: "border-[#FF5729]",
    body: (
      <>
        Beginning in 2019, the r/IGCSE Community caters to students around the globe,
        providing IGCSE and AS/A Level notes, subject guides, study sessions,
        and more. Our{" "}
        <a
          href="https://discord.gg/igcse"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300"
        >
          Discord Server
        </a>{" "}
        has subject-specific channels where you can ask our verified Subject
        Helpers for assistance.
      </>
    ),
  },
  {
    title: "Student-Run & Free",
    icon: "/book1.png",
    accent: "border-[#A78BFA]",
    body: (
      <>
        We are completely student-run, and all resources displayed have been
        created by other IGCSE and AS/A Level students. r/IGCSE is free and will
        always remain free.
      </>
    ),
  },
];

const why = [
  {
    title: "Student-Made Resources",
    accent: "border-[#A78BFA]",
    body: "Our resources are created by volunteer alumni students who have studied for and taken these exams. We aim to keep resources free for all students, always.",
  },
  {
    title: "Student Well-being",
    accent: "border-[#ffac5e]",
    body: "We value student welfare and aim to foster a nurturing environment by understanding and uplifting one another, ensuring that no student feels alone when navigating their academic journey, and that every student has access to support from a like-minded and welcoming community.",
  },
  {
    title: "Peer to Peer Mentorship",
    accent: "border-[#d1ff91]",
    body: "We have a wide range of volunteer subject helpers that are active every day in our Discord community helping other students by answering doubts, giving advice, etc.",
  },
  {
    title: "Discord Partner Community ",
    accent: "border-[#5865F2]",
    body: (
      <>
        Since 2021, r/IGCSE has been officially recognised as a {" "}
        <a
          href="https://support.discord.com/hc/en-us/articles/360047236171-Partnered-vs-Verified-Servers"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300"
        >
          Discord Partner
        </a>,{" "} giving our server access to high quality voice channels and recognition from Discord itself.
      </>
      ),
  },
];

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="text-center text-4xl font-bold underline decoration-red-500 decoration-3 underline-offset-8"
    >
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main className="bg-[#121010] text-white">
      {/* Hero */}
      <section
        aria-labelledby="homepage-title"
        className="-mt-[var(--site-header-height)] flex min-h-svh items-center pt-[var(--site-header-height)]"
      >
        <div className="mx-auto grid w-full max-w-[1920px] items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-12 lg:px-[5%]">
          <div>
            <p className="text-lg font-semibold md:text-2xl">
              Welcome to<span className="hidden md:inline"> the</span>
            </p>
            <h1
              id="homepage-title"
              className="text-6xl leading-tight font-black text-primary-500 md:text-7xl xl:text-8xl"
            >
              r/IGCSE
            </h1>
            <p className="text-2xl font-semibold md:text-4xl xl:text-5xl">
              Resource Repository
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-200 md:text-lg">
              {introduction}
            </p>

            <dl
              className="mt-8 flex flex-wrap gap-x-12 gap-y-6"
              aria-label="Repository statistics"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-4 border-primary-500 pl-4"
                >
                  <dt className="text-base font-extrabold md:text-xl">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-extrabold text-[#fefb88] md:text-4xl">
                    <StatsAnimation value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-center">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-xl font-bold text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Browse Resources
              </Link>
            </div>
          </div>

          <div
            role="img"
            aria-label="A collection of r/IGCSE study resource covers"
            className="select-none"
          >
            <Image
              src="/home-collage-desktop.png"
              alt=""
              width={1217}
              height={1074}
              sizes="50vw"
              className="hidden h-auto w-full md:block"
            />
            <Image
              src="/home-collage-mobile.png"
              alt=""
              width={668}
              height={716}
              sizes="100vw"
              className="mx-auto h-auto w-full max-w-sm md:hidden"
            />
          </div>
        </div>
      </section>

      {/* Countdown */}
      <Countdown event={countdownEvent} />

      {/* About Us */}
      <section
        aria-labelledby="about-us-title"
        className="border-t border-zinc-800 px-6 py-16 md:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="about-us-title">About Us</SectionHeading>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {aboutCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-lg border-t-4 bg-[#141417] p-6 ${card.accent}`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={card.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-zinc-300">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-title"
        className="border-t border-zinc-800 px-6 py-16 md:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="why-title">Why r/IGCSE?</SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-zinc-300">
            We want every IGCSE and A Level student to have the resources and
            support they need to do their best in their exams.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {why.map((reason) => (
              <article
                key={reason.title}
                className={`rounded-lg border-t-4 bg-[#141417] p-6 ${reason.accent}`}
              >
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-300">
                  {reason.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
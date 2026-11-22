import {
  ArrowUpRightIcon,
  CheckIcon,
  GlobeIcon,
  LinkSimpleIcon,
  NotePencilIcon,
  StarIcon,
  TiktokLogoIcon,
  ArrowDownIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Discord } from "@/components/ui/svgs/discord";
import { Instagram } from "@/components/ui/svgs/instagram";
import { LinkedIn } from "@/components/ui/svgs/linkedin";
import { socials } from "@/data/footer";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/partners");

type PartnerLink = {
  label: string;
  href: string;
  /** Picks the default icon from `linkIcons` below. */
  kind:
    | "website"
    | "discord"
    | "instagram"
    | "linkedin"
    | "tiktok"
    | "linktree"
    | "apply";
  /** Optional custom icon from /public, e.g. "/partners/icons/quickmark-site.svg". Overrides `kind`. */
  icon?: string;
};

type Partner = {
  name: string;
  description: string;
  /** Path inside /public, e.g. "/partners/quickmark.png". Falls back to an initial. */
  logo?: string;
  links: PartnerLink[];
};

const partners: Partner[] = [
  {
    name: "ProjectEnlight",
    description:
      "ProjectEnlight is one of Asia's largest youth-led, student-run tutoring initiatives, dedicated to making quality IGCSE education more accessible. Through free academic resources, peer tutoring, and a community of student tutors, ProjectEnlight supports students in achieving stronger academic outcomes regardless of their background.",
    logo: undefined, // e.g. "/partners/projectenlight.png"
    links: [
      {
        label: "Website",
        href: "https://www.projectenlight.my/",
        kind: "website",
        // icon: "/partners/icons/projectenlight-website.svg",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/projectenlight_/",
        kind: "instagram",
        // icon: "/partners/icons/projectenlight-instagram.svg",
      },
      {
        label: "Linktree",
        href: "https://linktr.ee/projectenlightt",
        kind: "linktree",
        // icon: "/partners/icons/projectenlight-linktree.svg",
      },
    ],
  },
  {
    name: "SimplifyIGCSE",
    description:
      "Established in 2025, SimplifyIGCSE is a global student-led educational platform dedicated to making IGCSE preparation simpler, more accessible, and more collaborative. Built on the philosophy of “By students, for students,” SimplifyIGCSE provides free, high-quality revision resources for 16+ subjects, created by a team of 30 student contributors from over 20 countries who understand the challenges of exam preparation. Today, as the platform continues to expand globally, it has gained over 7,400 active IGCSE learners from 130+ countries and over 109K total audience views across TikTok and Instagram. As quality education should not be limited by cost or geography, SimplifyIGCSE welcomes students, educators, and educational platforms interested in contributing resources, partnering, and creating a stronger global legacy of free education.",
    logo: "/partners/SimplifyIGCSE.png",
    links: [
      {
        label: "Website",
        href: "https://www.simplifyigcse.org/",
        kind: "website",
        // icon: "/partners/icons/simplifyigcse-website.svg",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/simplify_igcse/",
        kind: "instagram",
        // icon: "/partners/icons/simplifyigcse-instagram.svg",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@simplifyigcse?_r=1&_t=ZS-94AqpmdgGOY",
        kind: "tiktok",
        // icon: "/partners/icons/simplifyigcse-tiktok.svg",
      },
    ],
  },
  {
    name: "QuickMark",
    description:
      "A free practice tool for Cambridge IGCSE, O Level and A Level multiple choice. Pick any past paper, answer it on your phone or laptop, and it's marked the moment you finish, with an explanation for every question you got wrong. Topical drills let you attack one weak chapter at a time, and ranked mode puts you head to head with other students for a place on the leaderboard. No account needed.",
    logo: "/partners/quickmark.webp",
    links: [
      {
        label: "Website",
        href: "https://www.quickmark.co/",
        kind: "website",
        // icon: "/partners/icons/quickmark-website.svg",
      },
      {
        label: "Discord",
        href: "https://discord.gg/9q5vRgsMV7",
        kind: "discord",
        // icon: "/partners/icons/quickmark-discord.svg",
      },
      {
        label: "Instagram",
        href: "https://instagram.com/quickmark.co",
        kind: "instagram",
        // icon: "/partners/icons/quickmark-instagram.svg",
      },
    ],
  },
  {
    name: "Markern",
    description:
      "A completely free, student-built revision platform for IGCSE and AS/A Level students, built around a clean and minimalistic UI. It brings past papers, syllabuses, revision resources and progress tracking together in one organised place, with Cambridge resources available now and Edexcel coverage continuing to expand. There are no ads, subscriptions or required sign-ups.",
    logo: "/partners/markern.webp",
    links: [
      {
        label: "Website",
        href: "https://markern.com/",
        kind: "website",
        // icon: "/partners/icons/markern-website.svg",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/igcsefy/",
        kind: "instagram",
        // icon: "/partners/icons/markern-instagram.svg",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/igcsefy/",
        kind: "linkedin",
        // icon: "/partners/icons/markern-linkedin.svg",
      },
    ],
  },
  {
    name: "The Teachers' Garden",
    description:
      "Built by a team of volunteer teachers, The Teachers' Garden is a language learning community of students, teachers and enthusiasts. We provide free language classes, activities and support to fulfil our ambition of cultivating a welcoming, encouraging environment for students and language lovers worldwide. Whether you are a language student, budding polyglot or just want to make some new friends, The Teachers' Garden is the perfect community for you. Pop in, say hi and explore our classes and community. We can't wait to meet you!",
    logo: "/partners/tg.webp",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/MPfmxR4DJX",
        kind: "discord",
        // icon: "/partners/icons/teachers-garden-discord.svg",
      },
    ],
  },
];

type Requirement = { text: string; note?: string };

const websiteRequirements: Requirement[] = [
  {
    text: "Must be a fully developed, functional product, including but not limited to a terms of service and privacy policy.",
    note: "The privacy policy must clearly state what data is shared when interacting with an AI model, and which third-party apps receive this data.",
  },
  {
    text: "Must be educational or study related.",
    note: "IGCSE/A Levels, university applications, subject-specific resources, etc.",
  },
  { text: "Must have real users and activity." },
  { text: "Must not have any pirated content available." },
  {
    text: "Must have a free plan or alternative. Fully paid content is not allowed.",
  },
  {
    text: "Must have minimal usage of artificial intelligence.",
    note: "AI must not be used to generate, modify, or review educational content.",
  },
];

const serverRequirements: Requirement[] = [
  {
    text: "Must have at least 1,000 members and a generally active community.",
    note: "Activity requirements may vary based on member count.",
  },
  { text: "Must be educational or study related." },
  {
    text: "Must be an improvement to the lives of students.",
    note: "We look for servers that can help our students in other areas of their studies.",
  },
  { text: "Must not have any pirated content available." },
  {
    text: "Must have minimal usage of artificial intelligence.",
    note: "AI must not be used to generate, modify, or review educational content.",
  },
];

const benefits: { text: string; note?: string }[] = [
  {
    text: "A permanent post in #partners",
    note: "Detailing what your website or server is, plus links.",
  },
  {
    text: "An announcement ping in #announcements",
    note: "Detailing what your website or server is, plus links.",
  },
  { text: "Direct communication with r/IGCSE",
    note: "We'll set up your own personal channel with our staff team.",
  },
  {
    text: "Opportunities to collaborate on future events",
    note: "Study sessions, workshops, MUNs, etc.",
  },
  { text: "The r/IGCSE Partner role",
    note: "A special role on our server to stand out!"
   },
];


const linkIcons: Record<
  PartnerLink["kind"],
  ComponentType<{ className?: string }>
> = {
  website: GlobeIcon,
  discord: Discord,
  instagram: Instagram,
  linkedin: LinkedIn,
  tiktok: TiktokLogoIcon,
  linktree: LinkSimpleIcon,
  apply: NotePencilIcon,
};

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div
      className={cn(
        "relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-3xl bg-secondary ring-1 ring-border md:size-32",
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-rotate-3 motion-safe:hover:scale-105",
      )}
    >
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={128}
          height={128}
          className="size-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="text-5xl font-black text-foreground md:text-6xl"
        >
          {partner.name.charAt(0)}
        </span>
      )}
    </div>  
  );
}

function PartnerRow({ partner, index }: { partner: Partner; index: number }) {
  const headingId = `partner-${index + 1}-heading`;

  return (
    <li>
      <article aria-labelledby={headingId}>
        <Separator />
        <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
          <div>
            <PartnerLogo partner={partner} />
          </div>

          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <h3
                id={headingId}
                className="text-3xl font-black tracking-tight md:text-4xl"
              >
                {partner.name}
              </h3>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {partner.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {partner.links.map((link) => {
                const Icon = linkIcons[link.kind];
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "font-semibold",
                      )}
                    >
                      {/* Custom icon (from `icon`) wins, otherwise the default for `kind` */}
                      {link.icon ? (
                        <Image
                          src={link.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="size-4"
                        />
                      ) : (
                        <Icon aria-hidden="true" />
                      )}
                      {link.label}
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        data-icon="inline-end"
                        className="text-muted-foreground"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </article>
    </li>
  );
}

function Mention({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-discord-mention px-1 font-medium text-discord-mention-foreground">
      {children}
    </span>
  );
}

function RequirementList({
  items,
  label,
}: {
  items: Requirement[];
  label: string;
}) {
  return (
    <ul aria-label={label} className="space-y-4">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3">
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-brand">
            <CheckIcon weight="bold" aria-hidden="true" className="size-3" />
          </span>
          <div>
            <p className="leading-snug font-semibold">{item.text}</p>
            {item.note && (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Partners() {
  return (
    <main className="page-container pt-12 pb-24 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight underline decoration-primary decoration-3 underline-offset-10 md:text-6xl">
          Our Partners
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          These are the websites, apps and communities we've officially teamed
          up with. Every one of them is built to make studying easier for
          students, and we only partner with projects we'd happily recommend
          ourselves.
        </p>
        <a
            href="#partner-with-us"
            className={cn(buttonVariants({ size: "xlg" }), "mt-4 font-bold")}
        >
            Partner With Us
        <ArrowDownIcon aria-hidden="true" data-icon="inline-end" />
        </a>
      </header>

      {/* Partner list */}
      <section aria-label="Official partners" className="mt-8">
        <ul>
          {partners.map((partner, index) => (
            <PartnerRow key={partner.name} partner={partner} index={index} />
          ))}
        </ul>
        <Separator />
      </section>

      {/* Want to partner with us? */}
      <section
        id="partner-with-us"
        aria-labelledby="apply-heading"
        className="mt-20 scroll-mt-24"
        >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-brand">
            <span className="text-sm font-bold tracking-widest uppercase">
              r/IGCSE Partnership Program
            </span>
          </div>
          <h2
            id="apply-heading"
            className="mt-3 text-3xl font-black tracking-tight md:text-5xl"
          >
            Want to partner with us?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            If you're looking to partner with r/IGCSE, you've come to the right
            place. To be eligible you must meet{" "}
            <strong className="font-bold text-foreground">
              all the requirements
            </strong>{" "}
            for the type of organisation you're trying to partner with, and then
            send a message to <Mention>@r/IGCSE Bot</Mention> on Discord
            detailing who you are, your role at said organisation, why you would
            like to partner with us, and details about your organisation.
          </p>

          <div className="mt-6 flex gap-3 rounded-xl border border-highlight/25 bg-highlight/5 p-4">
            <WarningCircleIcon
              weight="fill"
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-highlight"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Please note: simply fulfilling the requirements does not entitle
              you to being partnered with us. We reserve the right to reject any
              partnership proposal if we do not see mutual benefit.
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-14">
          <Separator />
          <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <GlobeIcon aria-hidden="true" className="size-6 text-brand" />
                Websites & Apps
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                For study tools, resource platforms and applications.
              </p>
            </div>
            <div className="max-w-2xl">
              <RequirementList
                items={websiteRequirements}
                label="Website or app requirements"
              />
            </div>
          </div>

          <Separator />
          <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <Discord aria-hidden="true" className="size-6 text-brand" />
                Discord Servers
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                For study communities and student-run servers.
              </p>
            </div>
            <div className="max-w-2xl">
              <RequirementList
                items={serverRequirements}
                label="Discord server requirements"
              />
            </div>
          </div>

          <Separator />
          <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <StarIcon
                  weight="fill"
                  aria-hidden="true"
                  className="size-6 text-highlight"
                />
                Partner Benefits
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                What you get once you're on board.
              </p>
            </div>
            <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit.text}
                  className="rounded-xl border border-border bg-card/60 p-4"
                >
                  <p className="leading-snug font-semibold">{benefit.text}</p>
                  {benefit.note && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Separator />
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-6 py-6 text-center">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight">
              Ready to apply?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Join our Discord server and send a message to the r/IGCSE Bot to
              get started.
            </p>
          </div>
          <a
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "font-bold")}
          >
            <Discord aria-hidden="true" data-icon="inline-start" />
            Join the Discord
            <ArrowUpRightIcon aria-hidden="true" data-icon="inline-end" />
          </a>
        </div>
      </section>
    </main>
  );
}
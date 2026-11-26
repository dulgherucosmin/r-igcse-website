import {
  ArrowSquareOutIcon,
  ArrowDownIcon,
  CertificateIcon,
  EnvelopeSimpleIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Discord } from "@/components/ui/svgs/discord";
import { socials } from "@/data/footer";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/opportunities");

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Apply =
  /** Shows an "Apply" button that opens the form. */
  | { type: "link"; url: string }
  /** For roles applied for with a Discord command, e.g. "/apply". */
  | { type: "command"; command: string }
  /** Shows a "Closed" badge. */
  | { type: "closed" }
  /** Shows a "No application needed" badge. */
  | { type: "none" };

type Role = {
  id: string;
  title: string;
  /** Hex colour used for the embed's left bar and the @role chips. */
  color: string;
  /**
   * Plain text with a little markup:
   *   {@Role Name}    -> coloured role mention
   *   {#channel-name} -> channel mention
   *   **bold**        -> bold
   */
  description: string;
  requirements?: string[];
  /** Small muted text under the requirements. */
  note?: string;
  apply: Apply;
};

type Section = {
  id: string;
  title: string;
  blurb: string;
  roles: Role[];
};

// TODO: replace each `url` below with the real application form link.
const APPLICATION_PLACEHOLDER = socials.discord;

const sections: Section[] = [
  {
    id: "helpers",
    title: "Subject Helpers",
    blurb: "Answer questions and support students in the subject channels.",
    roles: [
      {
        id: "subject-helper",
        title: "Subject Helper",
        color: "#2ecc71",
        description:
          "An {@IGCSE Helper} / {@AS/AL Helper} is a member who has shown consistent helping activity on the server, and wants to continue helping server members. They will be pinged when someone asks a question via the helper ping command and are recognised as knowledgeable in their subject.",
        requirements: [
          "Have at least **2 months** of helping activity in the subject channel.",
          "Be a member for at least **2 months** on the server.",
          "Have a clean recent infraction history.",
        ],
        apply: { type: "link", url: "https://forms.r-igcse.com/f/helper-application" },
      },
      {
        id: "ib-helper",
        title: "IB Helper",
        color: "#9b59b6",
        description:
          "An {@IB Helper} is a member who has shown consistent helping activity in the {#ib-chat} channel, and wants to continue helping members.",
        requirements: [
          "Be a current DP2 student or have completed your IBDP.",
          "Have a clean recent infraction history.",
        ],
        apply: { type: "link", url: "https://forms.r-igcse.com/f/helper-application" },
      },
      {
        id: "sat-ap-helper",
        title: "SAT & AP Helper",
        color: "#3498db",
        description:
          "An {@SAT & AP Helper} is a member who has shown consistent helping activity in the {#sat-and-ap-testing} channel, and wants to continue helping members.",
        requirements: [
          "Be either an SAT or AP alumni.",
          "Have a clean recent infraction history.",
        ],
        apply: { type: "link", url: "https://forms.r-igcse.com/f/helper-application" },
      },
      {
        id: "ielts-toefl-helper",
        title: "IELTS & TOEFL Helper",
        color: "#e67e22",
        description:
          "An {@IELTS & TOEFL Helper} is a member who has shown consistent helping activity in the {#ielts-toefl-chat} channel, and wants to continue helping members.",
        requirements: [
          "Be either an IELTS or TOEFL alumni.",
          "Have a clean recent infraction history.",
        ],
        apply: { type: "link", url: "https://forms.r-igcse.com/f/helper-application" },
      },
      {
        id: "university-applications-helper",
        title: "University Applications Helper",
        color: "#e91e8c",
        description:
          "An {@University Application Helper} is a member who has shown consistent helping activity in the {#applying-to-unis} channel, and wants to continue helping members.",
        requirements: [
          "Must have completed the university application process, however a decision is not required.",
        ],
        apply: { type: "link", url: "https://forms.r-igcse.com/f/helper-application" },
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    blurb: "Create or share study resources for other students.",
    roles: [
      {
        id: "resource-creator",
        title: "Resource Creator",
        color: "#f5a04a",
        description:
          "A {@Resource Creator} is a member who has created custom resources for the students of r/IGCSE. They are given freedom on what subject(s) they want to create resources for and what they will cover.",
        apply: { type: "link", url: "https://forms.r-igcse.com/f/resource-contribution" },
      },
      
    ],
  },
  {
    id: "teams",
    title: "Development & Community Teams",
    blurb: "Help build and run r/IGCSE behind the scenes.",
    roles: [
      {
        id: "bot-developer",
        title: "Bot Developer",
        color: "#5865f2",
        description:
          "Bot Developers are members from our Development Team who help maintain {@r/IGCSE Bot}. The bot is written primarily in TypeScript using Discord.js. Generally anyone can apply for this position, however there are slight requirements.",
        requirements: [
          "Must have some experience in TypeScript.",
          "Must have some experience with Discord bot development.",
        ],
        apply: { type: "closed" },
      },
      {
        id: "website-developer",
        title: "Website Developer",
        color: "#e62317",
        description:
          "Website Developers are members from our Development Team who help maintain and develop the official r/IGCSE website.",
        note: "Applications for this position are not open at this time.",
        apply: { type: "closed" },
      },
      {
        id: "events-team",
        title: "Events Team",
        color: "#1abc9c",
        description:
          "{@Events Team} are members from our Community Team who host and manage events on the r/IGCSE Discord server.",
        note: "Applications for this position are not open at this time.",
        apply: { type: "closed" },
      },
      {
        id: "media-team",
        title: "Media Team",
        color: "#00b8d9",
        description:
          "{@Content Team} and {@Graphics Team} are members from our Community Team who create graphics and content for the r/IGCSE Discord server and other social media accounts.",
        note: "Applications for this position are not open at this time.",
        apply: { type: "closed" },
      },
    ],
  },
  {
    id: "moderation",
    title: "Community Moderation",
    blurb: "Help keep the community safe and friendly.",
    roles: [
      {
        id: "chat-moderator",
        title: "Chat Moderator",
        color: "#47a676",
        description:
          "{@Chat Moderator} are trusted members that have been given moderation permissions in order to help keep order and uphold the rules. You may apply any time and be eligible for the next month's application cycle, as Chat Moderators refresh on the 1st of every month.",
        requirements: [
          "Must be at least 15 years old.",
          "Must be a member for at least 6 months.",
          "Contribute and be an active member of the server.",
          "Have a clean recent infraction history.",
        ],
        note: "We choose the most active and trustworthy applicants. This may include picking the same person for multiple cycles. No announcements are made when the new Chat Moderators are chosen.",
        apply: { type: "command", command: "/apply" },
      },
      {
        id: "staff-moderator",
        title: "Staff Moderator",
        color: "#5478fa",
        description:
          "{@Moderator} are trusted members that are responsible for managing the r/IGCSE Discord Server and overseeing moderation, resource creation, applications, and more. Applications for Staff Moderator open around twice a year depending on the demand for new members.",
        requirements: [
          "Must be at least 16 years old.",
          "Must be a member for at least 6 months.",
          "Contribute and be an active member of the server.",
          "Have a clean recent infraction history.",
        ],
        note: "Applications for this position are not open at this time.",
        apply: { type: "closed" },
      },
    ],
  },
  
];

const certificateDetails = [
  "Your eligible role: Subject Helper, Resource Creator, Community Team member, Developer, or Discord/Reddit staff.",
  "Your name, exactly as you want it to appear on the certificate.",
  "Details of your contribution, such as the subjects and syllabus codes you help with, resources you created, or your team/staff role.",
  "Your Discord or Reddit username, so we can verify your role.",
];

function RoleChip({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="rounded-sm px-1 font-medium"
      style={{
        // blended with the theme's text colour so it stays readable in light and dark
        color: `color-mix(in oklab, ${color} 65%, var(--foreground))`,
        backgroundColor: `color-mix(in oklab, ${color} 18%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

function ChannelChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-discord-mention px-1 font-medium text-discord-mention-foreground">
      {children}
    </span>
  );
}

const BOT_COLOR = "#5865f2";

/** Renders the tiny {@role} / {#channel} / **bold** markup used in the data. */
function RichText({ text, color }: { text: string; color: string }) {
  let position = 0;
  const nodes = text.split(/(\{[@#][^}]+\}|\*\*[^*]+\*\*)/g).map((part) => {
    const key = position;
    position += part.length;
    if (part.startsWith("**")) {
      return (
        <strong key={key} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("{@")) {
      return (
        <RoleChip
          key={key}
          color={part === "{@r/IGCSE Bot}" ? BOT_COLOR : color}
        >
          @{part.slice(2, -1)}
        </RoleChip>
      );
    }
    if (part.startsWith("{#")) {
      return <ChannelChip key={key}>#{part.slice(2, -1)}</ChannelChip>;
    }
    return part;
  });
  return <>{nodes}</>;
}

function ApplyAction({ apply, title }: { apply: Apply; title: string }) {
  switch (apply.type) {
    case "link":
      return (
        <a
          href={apply.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Apply for ${title}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "shrink-0 font-semibold",
          )}
        >
          Apply
          <ArrowSquareOutIcon aria-hidden="true" data-icon="inline-end" />
        </a>
      );
    case "command":
      return (
        <Badge variant="outline" className="shrink-0 text-sm pt-2 pb-2">
          Apply on the Discord{" "}
        </Badge>
      );
    case "closed":
      return (
        <Badge variant="secondary" className="shrink-0 text-sm">
          Closed
        </Badge>
      );
    case "none":
      return (
        <Badge variant="secondary" className="shrink-0 text-sm">
          No application needed
        </Badge>
      );
  }
}

/** Styled like the Discord embeds: coloured left bar, title, Apply button. */
function RoleCard({ role }: { role: Role }) {
  const headingId = `${role.id}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      style={{ borderLeftColor: role.color }}
      className="rounded-lg border border-l-4 border-border bg-card p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          id={headingId}
          className="text-2xl font-black tracking-tight md:text-3xl"
        >
          {role.title}
        </h3>
        <ApplyAction apply={role.apply} title={role.title} />
      </div>

      <p className="mt-3 leading-relaxed text-muted-foreground">
        <RichText text={role.description} color={role.color} />
      </p>

      {role.requirements && (
        <>
          <p className="mt-5 font-semibold">Requirements:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground">
            {role.requirements.map((requirement) => (
              <li key={requirement} className="pl-1 leading-relaxed">
                <RichText text={requirement} color={role.color} />
              </li>
            ))}
          </ul>
        </>
      )}

      {role.note && (
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {role.note}
        </p>
      )}
    </article>
  );
}

function Mention({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-discord-mention px-1 font-medium text-discord-mention-foreground">
      {children}
    </span>
  );
}

export default function Opportunities() {
  return (
    <main className="page-container pt-12 pb-2 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight underline decoration-primary decoration-3 underline-offset-10 md:text-6xl">
          Opportunities
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          r/IGCSE is run by student volunteers. Whether you want to help answer
          questions, create resources, build things or keep the community
          running smoothly, there&rsquo;s a role for you. Find one that fits
          below, check the requirements and apply. All chats listed below can be found on our discord server.
        </p>
        <a
          href="#certificates"
          className={cn(buttonVariants({ size: "xlg" }), "mt-4 font-bold")}
        >
          Request a certificate
          <ArrowDownIcon aria-hidden="true" data-icon="inline-start" />
        </a>
      </header>

      <div className="mt-14">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <Separator />
            <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
              <div>
                <h2
                  id={`${section.id}-heading`}
                  className="text-2xl font-black tracking-tight md:text-3xl"
                >
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {section.blurb}
                </p>
              </div>
              <div className="max-w-3xl space-y-4">
                {section.roles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </div>
          </section>
        ))}
        <Separator />
      </div>

      {/* Certificates */}
      <section
        id="certificates"
        aria-labelledby="certificates-heading"
        className="mt-20 scroll-mt-24"
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-brand">
            <CertificateIcon
              weight="bold"
              aria-hidden="true"
              className="size-6"
            />
            <span className="text-sm font-bold tracking-widest uppercase">
              Certificates of Appreciation
            </span>
          </div>
          <h2
            id="certificates-heading"
            className="mt-3 text-3xl font-black tracking-tight md:text-5xl"
          >
            Request a certificate
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            We give Certificates of Appreciation only to Subject Helpers,
            Resource Creators, the Community Team, Developers, and Discord or
            Reddit staff. Each certificate is signed by the Community Lead and
            has an issuing date and certificate number.
          </p>
        </div>

        <div className="mt-8 max-w-3xl">
          <Separator />
          <div className="py-8">
            <p className="font-semibold">
              Include the following information in your request:
            </p>
            <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-muted-foreground marker:text-brand">
              {certificateDetails.map((detail) => (
                <li key={detail} className="pl-1 leading-relaxed">
                  {detail}
                </li>
              ))}
            </ul>

            <p className="mt-10 font-semibold">Send your request via:</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col rounded-lg border border-border bg-card p-5">
                <h4 className="flex items-center gap-2 text-lg font-bold">
                  <Discord aria-hidden="true" className="size-5" />
                  Modmail
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Join the Discord server and send a message to{" "}
                  <Mention>@r/IGCSE Bot</Mention> with the details above.
                </p>
                <a
                  href={socials.discord}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-4 font-bold",
                  )}
                >
                  Join the Discord
                <ArrowUpRightIcon aria-hidden="true" data-icon="inline-end" />
                </a>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-card p-5">
                <h4 className="flex items-center gap-2 text-lg font-bold">
                  <EnvelopeSimpleIcon aria-hidden="true" className="size-5" />
                  Email
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Email{" "}
                  <a
                    href={socials.email}
                    className="font-semibold text-foreground underline underline-offset-4"
                  >
                    igcseresources.1@gmail.com
                  </a>{" "}
                  with the details above. You can also get the certificate
                  verified via this email.
                </p>
                <a
                  href={socials.email}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "mt-4 font-bold",
                  )}
                >
                  <EnvelopeSimpleIcon
                    aria-hidden="true"
                    data-icon="inline-start"
                  />
                  Send an email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
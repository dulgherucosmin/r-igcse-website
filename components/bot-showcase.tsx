import type { ReactNode } from "react";
import {
  DiscordChat,
  DiscordMention,
  DiscordMessage,
  DiscordMessageAuthor,
  DiscordMessageAuthorImage,
  DiscordMessageAuthorName,
  DiscordMessageContent,
  DiscordMessageGroup,
} from "@/components/ui/discord/discord-base";
import {
  DiscordEmbed,
  DiscordEmbedDescription,
  DiscordEmbedFields,
  DiscordEmbedFieldWrapper,
  DiscordEmbedTitle,
} from "@/components/ui/discord/discord-embeds";
import { Twemoji } from "@/components/ui/discord/twemoji";
import { cn } from "@/lib/utils";

/** A role icon: either an uploaded image (`src`) or a unicode emoji. */
type RoleIcon = { name: string } & (
  | { src: string; emoji?: never }
  | { emoji: string; src?: never }
);

/**
 * A server (clan) tag, the small badge next to a name such as "♥ CHKN".
 * Either `badge`, one of Discord's 41 tag icons numbered as in
 * mezotv/discord-badges (`public/discord/server-tags/<badge>.svg`), or `src`,
 * the server's own badge image (saved under `public/discord/clan-badges/`).
 */
type ServerTag = { text: string } & (
  | { badge: ServerTagBadgeId; src?: never }
  | { src: string; badge?: never }
);

type ServerTagBadgeId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41;

type Author = {
  name: string;
  avatar: string;
  color?: string;
  bot?: boolean;
  /** Verified app: shows the checkmark on the APP badge. Needs `bot`. */
  verified?: boolean;
  roleIcon?: RoleIcon;
  tag?: ServerTag;
};

const bot: Author = {
  name: "r/IGCSE Bot",
  avatar: "/discord/avatars/r-igcse-bot.webp",
  color: "#00a8fc",
  bot: true,
  verified: true,
};

const users = {
  mockingbird: {
    name: "mockingbird",
    avatar: "/discord/avatars/mockingbird.webp",
    color: "#00a8fc",
    roleIcon: {
      name: "Staff",
      src: "/discord/role-icons/mockingbird.webp",
    },
    tag: { src: "/discord/clan-badges/chkn.png", text: "CHKN" },
  },
  zizi: {
    name: "zizi ✿🎀",
    avatar: "/discord/avatars/zizi.webp",
    color: "#b6dca9",
    roleIcon: { name: "Chat Moderator", src: "/discord/role-icons/zizi.webp" },
    tag: { src: "/discord/clan-badges/oe.png", text: "˖ ꪮꫀ" },
  },
  cosmo: {
    name: "cosmo 💜",
    avatar: "/discord/avatars/cosmo.webp",
    color: "#a78bfa",
    tag: {
      src: "/discord/clan-badges/r-ig.png",
      text: "r/ig",
    },
  },
  ayyan: {
    name: "ayyan",
    avatar: "/discord/avatars/ayyan.webp",
    color: "#f4a9c4",
    roleIcon: {
      name: "100+ Rep Club",
      src: "/discord/role-icons/ayyan.webp",
    },
  },
} satisfies Record<string, Author>;

// Fixed times so the mockups render the same on every request.
const at = (hours: number, minutes: number) =>
  new Date(2026, 0, 1, hours, minutes);

/**
 * Discord's hover tooltip: a dark bubble with an arrow, centred above the
 * trigger. CSS-only so the mockups stay server components. Uses `hidden`
 * (not opacity) while closed so it never widens the page on small screens.
 */
function Tooltip({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "group/tooltip relative ml-1 inline-flex cursor-pointer",
        className ?? "align-[-0.3em]",
      )}
    >
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded-md bg-[#111214] px-3 py-2 text-sm leading-none font-semibold whitespace-nowrap text-[#dbdee1] shadow-lg group-hover/tooltip:block after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-[#111214]"
      >
        {label}
      </span>
    </span>
  );
}

/** Discord's APP badge (mezotv/discord-badges), with a check when verified. */
function AppTag({ verified = false }: { verified?: boolean }) {
  return (
    <Tooltip
      label={verified ? "Verified App" : "App"}
      className="align-[-0.1em]"
    >
      {/* biome-ignore lint/performance/noImgElement: tiny static badge */}
      <img
        src={
          verified
            ? "/discord/badges/verified-app.svg"
            : "/discord/badges/app.svg"
        }
        alt={verified ? "Verified App" : "App"}
        className="h-[0.95rem] w-auto"
      />
    </Tooltip>
  );
}

function RoleIconBadge({ icon }: { icon: RoleIcon }) {
  return (
    <Tooltip label={icon.name}>
      {icon.emoji !== undefined ? (
        <Twemoji emoji={icon.emoji} label={icon.name} className="size-5" />
      ) : (
        // biome-ignore lint/performance/noImgElement: tiny role icon
        <img src={icon.src} alt={icon.name} className="size-5" />
      )}
    </Tooltip>
  );
}

function ServerTagBadge({ tag }: { tag: ServerTag }) {
  return (
    <span className="ml-1 inline-flex h-[1.125rem] cursor-pointer shrink-0 items-center gap-0.5 rounded-[4px] bg-discord-foreground/10 px-1 align-[0.1em] text-[0.75rem] leading-none font-semibold text-discord-header">
      {/* biome-ignore lint/performance/noImgElement: tiny server tag badge */}
      <img
        src={tag.src ?? `/discord/server-tags/${tag.badge}.svg`}
        alt=""
        className="size-3.5 [image-rendering:pixelated]"
      />
      {tag.text}
    </span>
  );
}

/** Name plus server tag, role icon and APP badge, in Discord's order. */
function AuthorBadges({ author }: { author: Author }) {
  return (
    <>
      {author.tag && <ServerTagBadge tag={author.tag} />}
      {author.roleIcon && <RoleIconBadge icon={author.roleIcon} />}
      {author.bot && <AppTag verified={author.verified} />}
    </>
  );
}

/** The small line above a message showing what it replies to. */
function ReplyContext({
  author,
  children,
}: {
  author: Author;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-w-0 items-center gap-1 pr-2 pl-14 text-[0.8125rem] sm:pr-4 text-discord-foreground/70 before:absolute before:top-1/2 before:left-[1.75rem] before:h-2.5 before:w-[1.85rem] before:rounded-tl-md before:border-t-2 before:border-l-2 before:border-discord-foreground/25">
      {/* biome-ignore lint/performance/noImgElement: tiny decorative avatar */}
      <img src={author.avatar} alt="" className="size-4 rounded-full" />
      <span className="shrink-0 font-medium" style={{ color: author.color }}>
        {author.name}
      </span>
      {author.tag && <ServerTagBadge tag={author.tag} />}
      <span className="truncate">{children}</span>
    </div>
  );
}

function Message({
  author,
  time,
  reply,
  children,
}: {
  author: Author;
  time: Date;
  reply?: ReactNode;
  children: ReactNode;
}) {
  return (
    <DiscordMessageGroup>
      {reply}
      <DiscordMessageContent className="pr-2 sm:pr-4">
        <DiscordMessageAuthor>
          <DiscordMessageAuthorImage
            src={author.avatar}
            alt=""
            fallback={author.name.slice(0, 2).toUpperCase()}
          />
          <DiscordMessageAuthorName
            timestamp={time}
            hr24
            style={{ color: author.color }}
          >
            {author.name}
            <AuthorBadges author={author} />
          </DiscordMessageAuthorName>
        </DiscordMessageAuthor>
        <DiscordMessage>{children}</DiscordMessage>
      </DiscordMessageContent>
    </DiscordMessageGroup>
  );
}

function Chat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <DiscordChat
      aria-label={label}
      role="group"
      className="w-full rounded-xl border border-border pt-0 text-left"
    >
      {children}
    </DiscordChat>
  );
}

export function RepShowcase() {
  return (
    <Chat label="Discord chat where the r/IGCSE Bot gives a member reputation for answering a question">
      <Message author={users.mockingbird} time={at(12, 51)}>
        guys what are the types of polymerisation in the syll
      </Message>
      <Message
        author={users.zizi}
        time={at(12, 51)}
        reply={
          <ReplyContext author={users.mockingbird}>
            guys what are the types of polymerisation in the syll
          </ReplyContext>
        }
      >
        addition and condensation
      </Message>
      <Message
        author={users.mockingbird}
        time={at(12, 51)}
        reply={
          <ReplyContext author={users.zizi}>
            addition and condensation
          </ReplyContext>
        }
      >
        ohh thanks
      </Message>
      <Message author={bot} time={at(12, 51)}>
        Gave +1 Rep to{" "}
        <DiscordMention type="user">{users.zizi.name}</DiscordMention> (1596)
      </Message>
    </Chat>
  );
}

export function InfractionShowcase() {
  return (
    <Chat label="Discord chat where a moderator warns a member using the r/IGCSE Bot">
      <Message
        author={bot}
        time={at(14, 3)}
        reply={
          <ReplyContext author={users.cosmo}>
            used <DiscordMention type="command">warn</DiscordMention>
          </ReplyContext>
        }
      >
        <DiscordEmbed color="#5865f2" className="mt-1">
          <DiscordEmbedTitle>Infraction Points</DiscordEmbedTitle>
          <DiscordEmbedDescription>
            <DiscordMention type="user">{users.cosmo.name}</DiscordMention> is
            now at 1 points.
          </DiscordEmbedDescription>
        </DiscordEmbed>
        <p className="mt-1 text-[0.75rem] text-discord-foreground/60">
          Only you can see this •{" "}
          <span className="cursor-pointer text-discord-link hover:underline">
            Dismiss message
          </span>
        </p>
      </Message>
      <Message author={bot} time={at(14, 3)}>
        <Twemoji emoji="🔨" /> c_osmo has been warned for Rule 2 - Improper use
        of text channels &amp; message spam. (Case #22371)
      </Message>
    </Chat>
  );
}

const topChannels = [
  ["as-al-psychology", 94],
  ["ig-ict", 18],
  ["ig-chemistry", 16],
  ["ig-computer-science", 14],
  ["as-al-physics", 14],
] as const;

export function StatsShowcase() {
  return (
    <Chat label="Discord chat showing the r/IGCSE Bot's reputation statistics for a member">
      <Message
        author={bot}
        time={at(14, 16)}
        reply={
          <ReplyContext author={users.ayyan}>
            used <DiscordMention type="command">rep user</DiscordMention>
          </ReplyContext>
        }
      >
        <DiscordEmbed color="#5865f2" className="mt-1">
          <DiscordEmbedTitle>
            <Twemoji emoji="⭐" /> Reputation Statistics
          </DiscordEmbedTitle>
          <DiscordEmbedDescription>
            <DiscordMention type="user">ayyan</DiscordMention> has{" "}
            <strong>308</strong> reputation.
            <br />
            <span className="text-discord-foreground/70">
              Ranked <strong>#524</strong>/62,826 on the leaderboard.
            </span>
          </DiscordEmbedDescription>
          <DiscordEmbedTitle>
            <Twemoji emoji="📋" /> Top Channels
          </DiscordEmbedTitle>
          <div className="col-[1/1] mt-2 text-[.875rem]/[1.125rem] text-discord-foreground">
            <ol className="list-inside list-decimal space-y-1">
              {topChannels.map(([channel, rep]) => (
                <li key={channel}>
                  <DiscordMention type="channel">{channel}</DiscordMention>:{" "}
                  {rep}
                </li>
              ))}
            </ol>
          </div>
          <DiscordEmbedFieldWrapper>
            <DiscordEmbedFields
              fields={[
                { name: "Last 24h", value: "3", inline: true },
                { name: "Last 7d", value: "8", inline: true },
                { name: "Last 30d", value: "27", inline: true },
              ]}
            />
          </DiscordEmbedFieldWrapper>
        </DiscordEmbed>
        <span className="mt-2 inline-flex h-8 cursor-pointer items-center rounded-lg bg-[#4e5058] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6d6f78]">
          More Statistics
        </span>
      </Message>
      <Message author={users.ayyan} time={at(14, 16)}>
        Woah that&apos;s peak!!
      </Message>
    </Chat>
  );
}

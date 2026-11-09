import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { socials } from "@/data/footer";
import { type TeamMember, teamRoles } from "@/data/team";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/team");

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length > 1 ? [parts[0], parts[parts.length - 1]] : [parts[0]];
  return initials
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function MemberAvatar({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  return (
    <Avatar className={cn("ring-1 ring-border", className)}>
      {member.avatar && <AvatarImage src={member.avatar} alt="" />}
      <AvatarFallback className="bg-secondary font-bold text-foreground">
        {getInitials(member.name)}
      </AvatarFallback>
    </Avatar>
  );
}

const [leadRole, ...teams] = teamRoles;
const volunteerCount = teamRoles.reduce(
  (total, role) => total + role.members.length,
  0,
);

export default function Team() {
  return (
    <main className="page-container pt-12 pb-24 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight md:text-6xl">
          The people behind r/IGCSE
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          r/IGCSE is run entirely by student volunteers who moderate the
          community, build the website and bots, and write the resources you
          study from.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-sm">
            {volunteerCount} volunteers
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {teamRoles.length} teams
          </Badge>
        </div>
      </header>

      {leadRole && (
        <section
          aria-labelledby="lead-heading"
          className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center"
        >
          {leadRole.members.map((member) => (
            <MemberAvatar
              key={member.name}
              member={member}
              className="size-24 text-2xl ring-2 ring-primary"
            />
          ))}
          <div className="max-w-2xl">
            <h2 id="lead-heading" className="text-2xl font-bold">
              {leadRole.members.map((member) => member.name).join(", ")}
            </h2>
            <p className="text-muted-foreground">{leadRole.role}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {leadRole.description}
            </p>
          </div>
        </section>
      )}

      <div className="mt-14">
        {teams.map((group) => (
          <section key={group.role} aria-labelledby={`${group.role}-heading`}>
            <Separator />
            <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
              <div>
                <h2
                  id={`${group.role}-heading`}
                  className="text-2xl font-bold tracking-tight"
                >
                  {group.role}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
                <Badge variant="outline" className="mt-3">
                  {group.members.length}{" "}
                  {group.members.length === 1 ? "member" : "members"}
                </Badge>
              </div>
              <ul className="grid grid-cols-2 content-start gap-x-2 gap-y-1 xl:grid-cols-3">
                {group.members.map((member) => (
                  <Item
                    key={member.name}
                    size="sm"
                    className="px-2"
                    render={<li />}
                  >
                    <ItemMedia>
                      <MemberAvatar
                        member={member}
                        className="size-9 sm:size-11"
                      />
                    </ItemMedia>
                    <ItemContent className="min-w-0 gap-0">
                      <ItemTitle className="w-full truncate text-sm font-semibold sm:text-base">
                        {member.name}
                      </ItemTitle>
                      <ItemDescription className="truncate text-xs sm:text-sm">
                        {member.title}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <Separator />
      </div>

      <section
        aria-labelledby="join-heading"
        className="mt-16 flex flex-col items-center gap-6 py-6 text-center"
      >
        <div className="max-w-xl">
          <h2 id="join-heading" className="text-2xl font-bold tracking-tight">
            Want to help?
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            We're always looking for helpers, moderators, developers and
            resource writers.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/opportunities"
            className={cn(buttonVariants({ size: "lg" }), "font-bold")}
          >
            See opportunities
            <ArrowRightIcon />
          </Link>
          <a
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "font-bold",
            )}
          >
            <Discord aria-hidden="true" className="size-4" />
            Ask on Discord
          </a>
        </div>
      </section>
    </main>
  );
}

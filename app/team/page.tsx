import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { type TeamMember, teamRoles } from "@/data/team";
import { pageMetadata } from "@/lib/metadata";

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

function MemberCard({ name, title, avatar }: TeamMember) {
  return (
    <Item className="w-28 flex-col p-0 text-center sm:w-32">
      <ItemMedia>
        <Avatar className="size-20 ring-2 ring-primary sm:size-24">
          {avatar && <AvatarImage src={avatar} alt="" />}
          <AvatarFallback className="text-lg font-bold sm:text-xl">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="items-center gap-0">
        <ItemTitle className="text-sm font-semibold sm:text-base">
          {name}
        </ItemTitle>
        <ItemDescription className="text-xs sm:text-sm">
          {title}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

export default function Team() {
  return (
    <main className="page-container min-h-screen pt-8 pb-20">
      <h1 className="mb-12 text-center text-3xl font-bold underline decoration-primary decoration-2 underline-offset-8">
        The Team Behind r/IGCSE
      </h1>

      <div className="flex flex-col gap-8">
        {teamRoles.map((group) => (
          <Card key={group.role} aria-label={group.role}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{group.role}</CardTitle>
              <CardDescription className="mx-auto max-w-xl italic">
                {group.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-8">
              {group.members.map((member) => (
                <MemberCard key={`${group.role}-${member.name}`} {...member} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

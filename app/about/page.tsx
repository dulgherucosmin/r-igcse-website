import { HandshakeIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
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
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Discord } from "@/components/ui/svgs/discord";
import { Reddit } from "@/components/ui/svgs/reddit";
import { timeline } from "@/data/timeline";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/about");

const sections: {
  title: string;
  icon: string;
  body: ReactNode;
}[] = [
  {
    title: "Our Mission",
    icon: "/flag.png",
    body: (
      <>
        <p>
          r/IGCSE caters to students around the globe, providing both IGCSE &
          AS/A Level notes, subject guides, study sessions, and more. Our{" "}
          <TextLink href="https://discord.gg/igcse">Discord Server</TextLink> is
          focused on providing subject-specific channels in which you or other
          students may ask our verified Subject Helpers for assistance.
        </p>
        <p>
          We are completely student-run, and all resources displayed have been
          created by other IGCSE & AS/A Level students. r/IGCSE is free and will
          always remain free.
        </p>
      </>
    ),
  },
  {
    title: "Resource Repository",
    icon: "/book1.png",
    body: (
      <>
        <p>
          r/IGCSE has over 40+ resources published by our wonderful server
          members. These resources are free to view on our{" "}
          <TextLink href="/resources">resource repository</TextLink>.
        </p>
        <p>
          If you find any mistakes within official r/IGCSE published resources,
          please do not hesitate to contact us through
          igcseresources.1@gmail.com.
        </p>
      </>
    ),
  },
  {
    title: "Opportunities",
    icon: "/team1.png",
    body: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus neque corrupti ratione rem eius ipsam sapiente
          cupiditate vel facere magnam dolorem, id molestiae velit aperiam
          voluptas pariatur omnis illo harum.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, porro?
          Minus vero magnam vitae laudantium facere, officia voluptatem enim,
          nesciunt voluptatum repudiandae ipsa velit animi corporis ad adipisci
          expedita iste.
        </p>
      </>
    ),
  },
];

const timelineIcons = {
  reddit: Reddit,
  discord: Discord,
  handshake: HandshakeIcon,
  users: UsersThreeIcon,
};

export default function About() {
  return (
    <main className="page-container min-h-screen pt-8 pb-20">
      <h1 className="mb-10 text-center text-3xl font-bold underline decoration-primary decoration-2 underline-offset-8">
        About r/IGCSE
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader className="flex items-center gap-2">
                <Image
                  src={section.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="size-16"
                />
                <CardTitle className="text-2xl font-bold">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="space-y-4 text-base leading-relaxed text-foreground">
                  {section.body}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <ItemGroup
          role="list"
          aria-label="r/IGCSE timeline"
          className="gap-6 border-s-2 border-primary ps-4"
        >
          {timeline.map((event) => {
            const TimelineIcon = timelineIcons[event.icon];
            return (
              <Item
                key={event.title}
                role="listitem"
                className="items-start p-0"
              >
                <ItemMedia
                  variant="icon"
                  className="size-9 rounded-full bg-secondary text-primary"
                >
                  <TimelineIcon className="size-5" />
                </ItemMedia>
                <ItemContent>
                  <Badge variant="secondary" className="text-sm">
                    {event.date}
                  </Badge>
                  <ItemTitle className="mt-1 text-lg font-semibold">
                    {event.title}
                  </ItemTitle>
                  <ItemDescription className="line-clamp-none text-sm">
                    {event.body}
                  </ItemDescription>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>
      </div>
    </main>
  );
}

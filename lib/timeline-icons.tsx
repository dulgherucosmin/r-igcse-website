import {
  BooksIcon,
  CalendarStarIcon,
  ConfettiIcon,
  HandshakeIcon,
  MegaphoneIcon,
  RocketLaunchIcon,
  SparkleIcon,
  TrophyIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import type { ComponentType, SVGProps } from "react";
import { Discord } from "@/components/ui/svgs/discord";
import { Reddit } from "@/components/ui/svgs/reddit";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const timelineIcons = {
  reddit: Reddit,
  discord: Discord,
  handshake: HandshakeIcon,
  users: UsersThreeIcon,
  trophy: TrophyIcon,
  books: BooksIcon,
  rocket: RocketLaunchIcon,
  megaphone: MegaphoneIcon,
  calendar: CalendarStarIcon,
  confetti: ConfettiIcon,
  sparkle: SparkleIcon,
} satisfies Record<string, IconComponent>;

export type TimelineIconName = keyof typeof timelineIcons;

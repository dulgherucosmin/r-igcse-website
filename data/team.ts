export type TeamMember = {
  name: string;
  title: string;
  /** Optional photo path from /public. Falls back to initials when omitted. */
  avatar?: string;
};

export type TeamRole = {
  role: string;
  members: TeamMember[];
  description: string;
};

// Edit this list to update the Team page. Roles are displayed in this order,
// and each role should keep at least 5 members so the row of circles looks
// consistent. Names/titles below are placeholders - replace with the real team.
export const teamRoles: TeamRole[] = [
  {
    role: "Community Lead",
    members: [
      { name: "Alex Morgan", title: "Community Lead" },
    ],
    description: "Staff Members are responsible for managing and moderating the Discord server, including all resource creation & applications for various positions in the server.",
  },
  {
    role: "Community Managers",
    members: [
      { name: "Jordan Lee", title: "Community Manager" },
      { name: "Morgan Blake", title: "Community Manager" },
      { name: "Casey Adams", title: "Community Manager" },
      { name: "Riley Scott", title: "Community Manager" },
      { name: "Avery Hunt", title: "Community Manager" },
    ],
    description: "Community Managers are responsible for day-to-day team management, growth analysis, reviewing emails, policy changes, and more.",
  },
  {
    role: "Senior Moderators",
    members: [
      { name: "Drew Kelly", title: "Senior Moderator" },
      { name: "Harper Reed", title: "Senior Moderator" },
      { name: "Rowan Diaz", title: "Senior Moderator" },
      { name: "Skylar James", title: "Senior Moderator" },
      { name: "Emerson Cole", title: "Senior Moderator" },
    ],
    description: "Senior Staff Members ........",
  },
  {
    role: "Moderators",
    members: [
      { name: "Quinn Foster", title: "Moderator" },
      { name: "Reese Morgan", title: "Moderator" },
      { name: "Finley Ward", title: "Moderator" },
      { name: "Charlie Bennett", title: "Moderator" },
      { name: "Dakota Price", title: "Moderator" },
    ],
    description: "Moderation, .........",
  },
  {
    role: "Developers",
    members: [
      { name: "Cameron Ellis", title: "Developer" },
      { name: "Logan Pierce", title: "Developer" },
      { name: "Peyton Grant", title: "Developer" },
      { name: "Sawyer Holt", title: "Developer" },
      { name: "Blake Sutton", title: "Developer" },
    ],
    description: "Bot & Website Development",
  },
  {
    role: "Reddit Team",
    members: [
      { name: "Micah Turner", title: "Reddit Moderator" },
      { name: "Nico Alvarez", title: "Reddit Moderator" },
      { name: "Sasha Reyes", title: "Reddit Moderator" },
      { name: "Elliot Marsh", title: "Reddit Moderator" },
      { name: "Robin Casey", title: "Reddit Moderator" },
    ],
    description: "r/igcse and r/alevels reddit mods",
  },
];